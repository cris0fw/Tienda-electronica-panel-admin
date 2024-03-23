import express from "express";
import {
  actualizarBlog,
  crearBlog,
  eliminarBlog,
  getAblog,
  meGustaBlog,
  noMeGustaBlog,
  obtenerLosBlogs,
  subirImagenes,
} from "../controller/blogCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/AuthMiddleware.js";
import { blogImgResize, uploads } from "../middleware/uploadImages.js";
const blogRoute = express.Router();

// METODO GET
blogRoute.get("/alls-blogs", obtenerLosBlogs);
blogRoute.get("/single-blog/:id", getAblog);

// METODO POST
blogRoute.post("/crear-blog", authMiddleware, isAdmin, crearBlog);

// METODO DELETE
blogRoute.delete("/delete-blog/:id", eliminarBlog);

// METODO PUT
blogRoute.put("/update-blog/:id", authMiddleware, isAdmin, actualizarBlog);
blogRoute.put("/like-blog", authMiddleware, meGustaBlog);
blogRoute.put("/dislike-blog", authMiddleware, noMeGustaBlog);
blogRoute.put(
  "/upload-image/:id",
  authMiddleware,
  isAdmin,
  uploads.array("image", 10),
  blogImgResize,
  subirImagenes
);

export default blogRoute;
