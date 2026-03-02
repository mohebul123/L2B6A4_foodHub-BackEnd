import { Router } from "express";
import app from "../app";
import { authRouter } from "../modules/auth/auth.route";
import { mealRouter } from "../modules/meal/meal.route";
import { providerRouter } from "../modules/providerProfile/provider.route";
import auth, { UserRole } from "../middleware/auth";
import { categoryRouter } from "../modules/category/category.route";
import { orderRouter } from "../modules/order/order.route";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/category", categoryRouter);
routes.use("/meals", mealRouter);
routes.use("/providers", providerRouter);
routes.use("/orders", orderRouter);

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
    email:customer1234
    token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwNWViODY3LWFkMzItNDcxZS05YWYzLTJmMzE3ZTJmZTg3OCIsIm5hbWUiOiJjdXN0b21lciBtb2hlYiIsImVtYWlsIjoiY3VzdG9tZXJtb2hlYkBnbWFpbC5jb20iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE3NzI0NTYwODcsImV4cCI6MTc3MzA2MDg4N30.U9IQ6mX2lIxvIB08RVgnPc3j-EpSYtkWAz8jpbH3zco

   **************** provider:
    name:proMoheb
    email:moheb@provider.com
    token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZjM3YzgzLTc1NTItNDYzNS04ZjdmLWM4OTkxNzNkNjJmMiIsIm5hbWUiOiJwcm9Nb2hlYiIsImVtYWlsIjoibW9oZWJAcHJvdmlkZXIuY29tIiwicm9sZSI6IlBST1ZJREVSIiwiaWF0IjoxNzcyMzcwODUwLCJleHAiOjE3NzI5NzU2NTB9.uk6nLc7t2RoEgXPOW81bnoRAdczwVs2RQ8v3_YztztI
*/
