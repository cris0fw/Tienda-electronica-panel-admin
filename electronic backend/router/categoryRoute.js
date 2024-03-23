import express from "express";
import {
  actualizarCategory,
  createCategory,
  eliminarCategory,
  obtenerCategoria,
  todasMisCategorias,
} from "../controller/categoryCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/AuthMiddleware.js";
const categoryRoute = express.Router();

categoryRoute.get("/alls-categorys", todasMisCategorias);
categoryRoute.get("/obtener-category/:id", obtenerCategoria);
categoryRoute.post("/create-category", authMiddleware, isAdmin, createCategory);
categoryRoute.put(
  "/update-category/:id",
  authMiddleware,
  isAdmin,
  actualizarCategory
);
categoryRoute.delete(
  "/delete-category/:id",
  authMiddleware,
  isAdmin,
  eliminarCategory
);

export default categoryRoute;
