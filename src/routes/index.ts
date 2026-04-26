import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { mealRouter } from "../modules/meal/meal.route";
import { providerRouter } from "../modules/providerProfile/provider.route";
import auth, { UserRole } from "../middleware/auth";
import { categoryRouter } from "../modules/category/category.route";
import { orderRouter } from "../modules/order/order.route";
import { adminRouter } from "../modules/admin/admin.route";
import { reviewRouter } from "../modules/review/review.route";
import { userRouter } from "../modules/user/user.route";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/category", categoryRouter);
routes.use("/meals", mealRouter);
routes.use("/providers", providerRouter);
routes.use("/orders", orderRouter);
routes.use("/admin", adminRouter);
routes.use("/reviews", reviewRouter);
routes.use("/users", userRouter);

export default routes;
