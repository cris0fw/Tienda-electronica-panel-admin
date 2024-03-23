import express from "express";
import { authMiddleware, isAdmin } from "../middleware/AuthMiddleware.js";
import {
  actualizarColor,
  crearColor,
  eliminarColor,
  obtenerColor,
  obtenerLosColores,
} from "../controller/colorCtrl.js";
const colorRoute = express.Router();

colorRoute.get("/all-colors", obtenerLosColores);
colorRoute.get("/get-color/:id", authMiddleware, isAdmin, obtenerColor);
colorRoute.post("/create-color", authMiddleware, isAdmin, crearColor);
colorRoute.delete("/delete-color/:id", authMiddleware, isAdmin, eliminarColor);
colorRoute.put("/update-color/:id", authMiddleware, isAdmin, actualizarColor);

export default colorRoute;
