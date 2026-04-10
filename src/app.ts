import express from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.route";
import routes from "./routes";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

//applications Rotes
app.use("/api/", routes);

app.use(globalErrorHandler);
app.use(notFound);
export default app;
