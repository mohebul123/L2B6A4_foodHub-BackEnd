import { Router } from "express";
import app from "../app";
import { authRouter } from "../modules/auth/auth.route";

const routes = Router();

routes.use("/auth", authRouter);
// routes.use("/users/", authRouter);
// routes.use("/meals/", authRouter);
// routes.use("/orders/", authRouter);

export default routes;
