import config from "../../config";
import { srtripe } from "../../config/stripe.config";
import { Order } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// type CreateOrderPayload = {
//   deliveryAddress: string;
//   orderItems: {
//     mealId: string;
//     quantity: number;
//   }[];
// };

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27" as any,
});

export const createOrder = async (userId: string, payload: any) => {
  const { deliveryAddress, orderItems, paymentMethod } = payload;

  if (!orderItems || orderItems.length === 0)
    throw new Error("Items Not Found");

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

    if (paymentMethod === "ONLINE") {
      lineItems.push({
        price_data: {
          currency: "bdt",
          product_data: {
            name: meal.title,
          },
          unit_amount: Math.round(meal.price * 100),
        },
        quantity: item.quantity,
      });
    }
    return { mealId: meal.id, quantity: item.quantity };
  });

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

  if (paymentMethod === "ONLINE") {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      success_url: `https://foodhub-frontend-red.vercel.app/payment-success?session_id={CHECKOUT_SESSION_ID`,
      cancel_url: `https://foodhub-frontend-red.vercel.app/cart`,
      metadata: {
        orderId: order.id,
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
      createdAt: "desc",
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
      createdAt: "desc",
    },
  });
  return result;
};

const getProviderOrdersFromDB = async (userId: string) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found!");
  }

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
