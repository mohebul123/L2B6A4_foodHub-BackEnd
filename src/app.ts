import express from "express";
import { Response, Request } from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.route";
import routes from "./routes";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import { PaymentRoutes } from "./modules/payment/payment.route";

const PORT = 5000;

const app = express();

//web Hook
app.post("/webhook", express.raw({ type: "application/json" }), PaymentRoutes);
app.use(express.json());
app.use(cors());

//applications Rotes
app.use("/api/", routes);

app.use(globalErrorHandler);
app.use(notFound);
export default app;
