import config from "../../config";
import { srtripe } from "../../config/stripe.config";
import { Order } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type CreateOrderPayload = {
  deliveryAddress: string;
  orderItems: {
    mealId: string;
    quantity: number;
  }[];
};

export const createOrder = async (userId: string, payload: any) => {
  const { deliveryAddress, orderItems, paymentMethod } = payload;

  if (!orderItems || orderItems.length === 0)
    throw new Error("Items Not Found");

  // 1. Meal details fetch kora amount calculate korar jonno
  const mealIds = orderItems.map((m: any) => m.mealId);
  const mealsFromDb = await prisma.meal.findMany({
    where: { id: { in: mealIds } },
  });

  let totalPrice = 0;
  const lineItems: any[] = [];

  const orderItemsData = orderItems.map((item: any) => {
    const meal = mealsFromDb.find((m) => m.id === item.mealId);
    if (!meal) throw new Error(`Meal not found`);

    totalPrice += meal.price * item.quantity;

    // Stripe format (Online payment holei lagbe)
    if (paymentMethod === "ONLINE") {
      lineItems.push({
        price_data: {
          currency: "bdt",
          product_data: { name: meal.title },
          unit_amount: Math.round(meal.price * 100), // Taka to Cent
        },
        quantity: item.quantity,
      });
    }
    return { mealId: meal.id, quantity: item.quantity };
  });

  // 2. Database-e Order create koro (Status: PLACED)
  const order = await prisma.order.create({
    data: {
      customerId: userId,
      deliveryAddress,
      totalAmount: totalPrice,
      status: "PLACED",
      paymentStatus: "UNPAID",
      orderItems: { create: orderItemsData },
    },
  });

  let paymentUrl = null;

  // 3. Online payment hole Stripe Session create koro
  if (paymentMethod === "ONLINE") {
    const session = await srtripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${config.client_url}/payment-success`,
      cancel_url: `${config.client_url}/cart`,
      metadata: {
        orderId: order.id, // Webhook eita diyei database update korbe
      },
      line_items: lineItems,
    });
    paymentUrl = session.url;
  }

  return { ...order, paymentUrl };
};

const getOrders = async (customerId: string) => {
  const result = await prisma.order.findMany({
    where: {
      customerId,
    },
    include: {
      // ✅ Eikhane meal-keo include korte hobe jate frontend-e title pawa jay
      orderItems: {
        include: {
          meal: true,
        },
      },
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc", // Latest orders upore thakbe
    },
  });
  return result;
};
const getAllOrders = async (customerId: string) => {
  const result = await prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          meal: true,
        },
      },
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc", // Latest orders upore thakbe
    },
  });
  return result;
};

const getProviderOrdersFromDB = async (userId: string) => {
  // 1. Prothome user-er ProviderProfile ID ber kora
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found!");
  }

  // 2. Oi profile ID diye orders filter kora
  const orders = await prisma.order.findMany({
    where: {
      orderItems: {
        some: {
          meal: {
            providerId: providerProfile.id,
          },
        },
      },
    },
    include: {
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
      orderItems: {
        include: {
          meal: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

const getOrderById = async (orderId: string) => {
  const result = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  return result;
};
export const orderService = {
  createOrder,
  getOrders,
  getAllOrders,
  getProviderOrdersFromDB,
  getOrderById,
};

/*
import { prisma } from "../prisma";

export const createOrder = async (req, res) => {
  const userId = req.user.id; // auth middleware থেকে
  const { deliveryAddress, paymentMethod, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items provided" });
  }

  // 1️⃣ সব meal fetch করি
  const mealIds = items.map(item => item.mealId);

  const meals = await prisma.meal.findMany({
    where: { id: { in: mealIds } }
  });

  // 2️⃣ total price calculate করি
  let totalPrice = 0;

  const orderItemsData = items.map(item => {
    const meal = meals.find(m => m.id === item.mealId);

    if (!meal) {
      throw new Error("Meal not found");
    }

    const itemTotal = meal.price * item.quantity;
    totalPrice += itemTotal;

    return {
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price
    };
  });

  // 3️⃣ Transaction দিয়ে order + orderItems create
  const order = await prisma.order.create({
    data: {
      userId,
      deliveryAddress,
      paymentMethod,
      totalPrice,
      items: {
        create: orderItemsData
      }
    },
    include: {
      items: true
    }
  });

  res.status(201).json(order);
};
*/
