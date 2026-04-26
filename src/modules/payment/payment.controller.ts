// payment.controller.ts
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

const handleStripeWebhook = async (req: Request, res: Response) => {
  let event = req.body;

  // ⚠️ IMPORTANT: Jodi app.ts-e express.raw use koro, tobe eita Buffer thakbe.
  // Shetake parse kore JSON banate hobe.
  try {
    if (Buffer.isBuffer(req.body)) {
      event = JSON.parse(req.body.toString());
    }
  } catch (err) {
    console.error("❌ Webhook JSON Parse Error:", err);
    return res.status(400).send("Webhook Error");
  }

  console.log("Received Event Type:", event.type); // Terminal-e check koro ki ashe

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session?.metadata?.orderId; // Metadata check koro

    console.log("Attempting to update Order ID:", orderId);

    if (orderId) {
      try {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            paymentStatus: "PAID",
            transactionId: session.payment_intent as string,
          },
        });
        console.log(`✅ Order ${orderId} Updated to PAID!`);
      } catch (error) {
        console.error("❌ DB Update Error:", error);
      }
    } else {
      console.error("❌ No Order ID found in session metadata!");
    }
  }

  res.status(200).json({ received: true });
};

export const PaymentController = {
  handleStripeWebhook,
};
