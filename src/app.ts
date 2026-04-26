import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import { PaymentController } from "./modules/payment/payment.controller";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL as string, "http://localhost:3000"],
    credentials: true,
  }),
);

app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.handleStripeWebhook,
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("FoodHub Server is Running! 🚀");
});

app.use(globalErrorHandler);

export default app;
