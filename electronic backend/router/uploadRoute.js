import express from "express";
import { subirImagenes, eliminarImagenes } from "../controller/uploadCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/AuthMiddleware.js";
import { productImgResize, uploads } from "../middleware/uploadImages.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/upload-image",
  authMiddleware,
  isAdmin,
  uploads.array("image", 10),
  productImgResize,
  subirImagenes
);

uploadRouter.delete(
  "/delete-img/:id",
  authMiddleware,
  isAdmin,
  eliminarImagenes
);

export default uploadRouter;
