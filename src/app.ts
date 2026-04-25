import express from "express";
import { Response, Request } from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.route";
import routes from "./routes";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";

const PORT = 5000;

const app = express();

app.use(express.json());

//web Hook
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    console.log("Webhook recieved ", req.body);
    res.status(200).json({ recived: true });
  },
);
app.use(cors());

//applications Rotes
app.use("/api/", routes);

app.use(globalErrorHandler);
app.use(notFound);
export default app;
