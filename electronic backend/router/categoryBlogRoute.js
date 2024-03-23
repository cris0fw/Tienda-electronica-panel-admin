import express from "express";
import { authMiddleware, isAdmin } from "../middleware/AuthMiddleware.js";
import {
  actualizarCategoriaBlog,
  buscarCategoriaBlog,
  createCategoryBlog,
  eliminarCategoriaBlog,
  todasCategoriasBlog,
} from "../controller/blogCategoryCtrl.js";
const categoryBlogRoute = express.Router();

categoryBlogRoute.get("/alls-category-blog", todasCategoriasBlog);

categoryBlogRoute.get("/find-category-blog/:id", buscarCategoriaBlog);

categoryBlogRoute.post(
  "/create-category-blog",
  authMiddleware,
  isAdmin,
  createCategoryBlog
);

categoryBlogRoute.put(
  "/update-category-blog/:id",
  authMiddleware,
  isAdmin,
  actualizarCategoriaBlog
);

categoryBlogRoute.delete(
  "/delete-category-blog/:id",
  authMiddleware,
  isAdmin,
  eliminarCategoriaBlog
);

export default categoryBlogRoute;
