import express from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.route";
import routes from "./routes";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

//applications Rotes
app.use("/api/", routes);
export default app;
