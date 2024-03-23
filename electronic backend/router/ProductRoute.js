import express from "express";
import {
  actualizarProducto,
  addToWishList,
  buscarProducto,
  buscarTodosProductos,
  createProduct,
  eliminarProducto,
  getProductByCategory,
  rating,
} from "../controller/ProductCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/AuthMiddleware.js";

const productRouter = express.Router();

productRouter.post("/create-product", authMiddleware, isAdmin, createProduct);
productRouter.get("/buscar-producto/:id", buscarProducto);
productRouter.get("/todos-productos", buscarTodosProductos);
productRouter.put(
  "/actualizar-producto/:id",
  authMiddleware,
  isAdmin,
  actualizarProducto
);
productRouter.put("/add-list", authMiddleware, addToWishList);
productRouter.put("/rating", authMiddleware, rating);

productRouter.delete(
  "/eliminar-producto/:id",
  authMiddleware,
  isAdmin,
  eliminarProducto
);

export default productRouter;
