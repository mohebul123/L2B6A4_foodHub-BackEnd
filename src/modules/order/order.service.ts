import { Order } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type CreateOrderPayload = {
  deliveryAddress: string;
  orderItems: {
    mealId: string;
    quantity: number;
  }[];
};

const createOrder = async (userId: string, payload: CreateOrderPayload) => {
  const { deliveryAddress, orderItems } = payload;

  if (!orderItems || orderItems.length === 0) {
    throw new Error("Items Not Found");
  }

  const mealIds = orderItems.map((m) => m.mealId);

  const mealsDetailsFromDb = await prisma.meal.findMany({
    where: {
      id: { in: mealIds },
    },
  });

  if (mealsDetailsFromDb.length !== mealIds.length) {
    throw new Error("Some meals were not found in the database");
  }

  const providerIds = [...new Set(mealsDetailsFromDb.map((m) => m.providerId))];

  if (providerIds.length > 1) {
    throw new Error(
      "You can only order from one restaurant/provider at a time.",
    );
  }

  let totalPrice = 0;

  const orderItemsData = orderItems.map((item) => {
    const meal = mealsDetailsFromDb.find((m) => m.id === item.mealId);

    if (!meal) {
      throw new Error(`Meal with ID ${item.mealId} not found`);
    }

    const itemTotal = meal.price * item.quantity;
    totalPrice += itemTotal;

    return {
      mealId: meal.id,
      quantity: item.quantity,
    };
  });

  const order = await prisma.order.create({
    data: {
      customerId: userId,
      deliveryAddress,
      totalAmount: totalPrice,
      orderItems: {
        create: orderItemsData,
      },
    },
    include: {
      orderItems: true,
    },
  });

  return order;
};

const getOrders = async (customerId: string) => {
  const result = await prisma.order.findMany({
    where: {
      customerId,
    },
    include: {
      orderItems: true,
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
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
