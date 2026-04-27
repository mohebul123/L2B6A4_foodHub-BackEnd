import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PaymentController } from "./modules/payment/payment.controller";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import routes from "./routes";

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
app.use(cookieParser());
app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("FoodHub Server is Running! 🚀");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
