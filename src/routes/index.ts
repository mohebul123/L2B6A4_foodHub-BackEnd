import { Router } from "express";
import app from "../app";
import { authRouter } from "../modules/auth/auth.route";
import { mealRouter } from "../modules/meal/meal.route";
import { providerRouter } from "../modules/providerProfile/provider.route";
import auth, { UserRole } from "../middleware/auth";
import { categoryRouter } from "../modules/category/category.route";
import { orderRouter } from "../modules/order/order.route";
import { adminRouter } from "../modules/admin/admin.route";
import { reviewRouter } from "../modules/review/review.route";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/category", categoryRouter);
routes.use("/meals", mealRouter);
routes.use("/providers", providerRouter);
routes.use("/orders", orderRouter);
routes.use("/admin", adminRouter);
routes.use("/reviews", reviewRouter);

// routes.use("/meals/", authRouter);
// routes.use("/orders/", authRouter);

export default routes;

/*
 ***********admin:
    name:adminMoheb
    email:adminmoheb@gmail.com
    password: admin1234
    token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5MTdlZmIxLWIwYmQtNGM0NC1hZTFlLTZkNmEyMjQ3YjA1ZiIsIm5hbWUiOiJhZG1pbk1vaGViIiwiZW1haWwiOiJhZG1pbm1vaGViQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc3NTkwODg4MCwiZXhwIjoxNzc2NTEzNjgwfQ.Jzl3pYU4Ov8RJz9C6IZk-jBO0AFRpi9cQmhwG7LD7Cg

************* customer:
     NAME :Maria akter
    EMAIL:maria@customer.com
    pass: pass1234
    token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhNGM4YTYxLTUxYjQtNDQ5NS1iN2MxLTI2MDA3Yzc1MDk2NSIsIm5hbWUiOiJNYXJpYSBha3RlciIsImVtYWlsIjoibWFyaWFAY3VzdG9tZXIuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzc1OTEwNDExLCJleHAiOjE3NzY1MTUyMTF9.sBHQWHFK8ctALITjARuWCF6YcaFs-0WVzVakzaYzgj0
   **************** provider:
    name:proMoheb
    email:moheb@provider.com
    token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZjM3YzgzLTc1NTItNDYzNS04ZjdmLWM4OTkxNzNkNjJmMiIsIm5hbWUiOiJwcm9Nb2hlYiIsImVtYWlsIjoibW9oZWJAcHJvdmlkZXIuY29tIiwicm9sZSI6IlBST1ZJREVSIiwiaWF0IjoxNzc1OTExNTg5LCJleHAiOjE3NzY1MTYzODl9.tF4Q1i_hIZ8Z5DH71uFZP6dXHracuwSXm1Gtzmixgq0

    ************* Provicer 2

    name: Jawad
    email:jawad@provider.com
    token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxNmNiYmM1LTRhYjItNGRhYS04ZTM2LTdmMDg2MzM3Y2UxMSIsIm5hbWUiOiJKYXdhZCBob3NzYWluIiwiZW1haWwiOiJqYXdhZEBwcm92aWRlci5jb20iLCJyb2xlIjoiUFJPVklERVIiLCJpYXQiOjE3NzYwNzQwODAsImV4cCI6MTc3NjY3ODg4MH0.uMT78lrVXVQL8lmJ3gzNSxa2jR_e4NJrH4_wUWRZ4Ws
*/
