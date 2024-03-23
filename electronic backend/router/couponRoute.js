import express from "express";
import {
  actualizarCupon,
  createCoupon,
  eliminarCupon,
  getCoupon,
  obtenerCupones,
} from "../controller/couponCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/AuthMiddleware.js";
const couponRoute = express.Router();

couponRoute.get("/all-coupons", authMiddleware, isAdmin, obtenerCupones);
couponRoute.get("/get-coupon/:id", authMiddleware, isAdmin, getCoupon);
couponRoute.post("/create-coupon", authMiddleware, isAdmin, createCoupon);
couponRoute.put("/update-coupon/:id", authMiddleware, isAdmin, actualizarCupon);
couponRoute.delete(
  "/delete-coupon/:id",
  authMiddleware,
  isAdmin,
  eliminarCupon
);

export default couponRoute;
