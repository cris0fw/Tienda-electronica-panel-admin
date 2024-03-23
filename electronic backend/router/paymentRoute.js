import express from "express";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { createOrderPayment } from "../controller/paymentCtrl.js";
const paymentRoute = express();

paymentRoute.post("/create-order", authMiddleware, createOrderPayment);
paymentRoute.get("/success");

paymentRoute.get("/cancel");

export default paymentRoute;
