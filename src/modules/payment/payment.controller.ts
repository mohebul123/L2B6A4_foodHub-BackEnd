import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

const handleStripeWebhook = async (req: Request, res: Response) => {
  let event = req.body;

  try {
    if (Buffer.isBuffer(req.body)) {
      event = JSON.parse(req.body.toString());
    }
  } catch (err) {
    console.error("❌ Webhook JSON Parse Error:", err);
    return res.status(400).send("Webhook Error");
  }

  console.log("Received Event Type:", event?.type);

  if (event?.type === "checkout.session.completed") {
    const session = event.data.object;
    // Metadata theke Order ID neya
    const orderId = session?.metadata?.orderId;

    if (orderId) {
      try {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            paymentStatus: "PAID",
            transactionId: session.id,
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
