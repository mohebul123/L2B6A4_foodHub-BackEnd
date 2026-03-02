import { Router } from "express";
import app from "../app";
import { authRouter } from "../modules/auth/auth.route";
import { mealRouter } from "../modules/meal/meal.route";
import { providerRouter } from "../modules/providerProfile/provider.route";
import auth, { UserRole } from "../middleware/auth";
import { categoryRouter } from "../modules/category/category.route";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/category", categoryRouter);
routes.use("/meals", mealRouter);
routes.use("/providers", providerRouter);
// routes.use("/meals/", authRouter);
// routes.use("/orders/", authRouter);

export default routes;

/*
 ***********admin:
    name:adminMoheb
    email:adminmoheb@gmail.com
    password: admin1234
    token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZjM3YzgzLTc1NTItNDYzNS04ZjdmLWM4OTkxNzNkNjJmMiIsIm5hbWUiOiJwcm9Nb2hlYiIsImVtYWlsIjoibW9oZWJAcHJvdmlkZXIuY29tIiwicm9sZSI6IlBST1ZJREVSIiwiaWF0IjoxNzcyMzcwODUwLCJleHAiOjE3NzI5NzU2NTB9.uk6nLc7t2RoEgXPOW81bnoRAdczwVs2RQ8v3_YztztI

************* customer:
     name:
    email:
    token:

   **************** provider:
    name:proMoheb
    email:moheb@provider.com
    token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZjM3YzgzLTc1NTItNDYzNS04ZjdmLWM4OTkxNzNkNjJmMiIsIm5hbWUiOiJwcm9Nb2hlYiIsImVtYWlsIjoibW9oZWJAcHJvdmlkZXIuY29tIiwicm9sZSI6IlBST1ZJREVSIiwiaWF0IjoxNzcyMzcwODUwLCJleHAiOjE3NzI5NzU2NTB9.uk6nLc7t2RoEgXPOW81bnoRAdczwVs2RQ8v3_YztztI
*/
