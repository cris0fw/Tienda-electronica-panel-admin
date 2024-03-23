import express from "express";
import { authMiddleware, isAdmin } from "../middleware/AuthMiddleware.js";
import {
  actualizarConsulta,
  crearConsulta,
  eliminarCOnsulta,
  obtenerConsulta,
  obtenerLasConsultas,
} from "../controller/enqCtrl.js";
const equiryRoute = express.Router();

equiryRoute.get("/all-equirys", obtenerLasConsultas);
equiryRoute.get("/get-equiry/:id", obtenerConsulta);
equiryRoute.post("/create-equiry", crearConsulta);
equiryRoute.delete(
  "/delete-equiry/:id",
  authMiddleware,
  isAdmin,
  eliminarCOnsulta
);
equiryRoute.put("/update-equiry/:id", actualizarConsulta);

export default equiryRoute;
