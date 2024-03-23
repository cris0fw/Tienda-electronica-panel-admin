import express from "express";
import {
  createBrand,
  deleteBrand,
  obtenerBrand,
  todosBrand,
  updateBrand,
} from "../controller/BrandCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/AuthMiddleware.js";
const brandRoute = express.Router();

brandRoute.get("/todos-brand", todosBrand);
brandRoute.get("/obtener-brand/:id", obtenerBrand);
brandRoute.post("/create-brand", authMiddleware, isAdmin, createBrand);
brandRoute.delete("/delete-brand/:id", authMiddleware, isAdmin, deleteBrand);
brandRoute.put("/update-brand/:id", authMiddleware, isAdmin, updateBrand);

export default brandRoute;
