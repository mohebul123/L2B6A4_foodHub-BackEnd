import { Router } from "express";
import app from "../app";
import { authRouter } from "../modules/auth/auth.route";
import { mealRouter } from "../modules/meal/meal.route";
import { providerRouter } from "../modules/providerProfile/provider.route";
import auth, { UserRole } from "../middleware/auth";
import { categoryRouter } from "../modules/category/category.route";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/category", auth(UserRole.admin), categoryRouter);
routes.use("/meals", mealRouter);
routes.use("/providers", providerRouter);
// routes.use("/meals/", authRouter);
// routes.use("/orders/", authRouter);

export default routes;

/*
 ***********admin:
    name:
    email:
    token:

************* customer:
     name:
    email:
    token:

   **************** provider:
    name:
    email:
    token:
*/
