import { Router } from "express";
import app from "../app";
import { authRouter } from "../modules/auth/auth.route";
import { mealRouter } from "../modules/meal/meal.route";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/meals", mealRouter);
// routes.use("/meals/", authRouter);
// routes.use("/orders/", authRouter);

export default routes;
