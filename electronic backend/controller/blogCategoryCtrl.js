import BlogCategory from "../models/categoryBlogModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";

const createCategoryBlog = asyncHandler(async (req, res) => {
  try {
    const createCategoryBlog = new BlogCategory(req.body);
    const saveCategoryBlog = await createCategoryBlog.save();

    return res.json({
      message: "La categoria del blog fue creada",
      status: 201,
      success: true,
      data: saveCategoryBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const actualizarCategoriaBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const updateCategoryBlog = await BlogCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    return res.json({
      message: "Se ha actualizado la categoria del blog",
      status: 200,
      success: true,
      data: updateCategoryBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const eliminarCategoriaBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const deleteCategoryBlog = await BlogCategory.findByIdAndDelete(id);

    return res.json({
      message: "Se ha eliminado la categoria del blog",
      status: 200,
      success: true,
      data: deleteCategoryBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const todasCategoriasBlog = asyncHandler(async (req, res) => {
  try {
    const misCategoriasBlog = await BlogCategory.find();

    return res.json(misCategoriasBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const buscarCategoriaBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const findCategoryBlog = await BlogCategory.findById(id);

    return res.json(findCategoryBlog);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  createCategoryBlog,
  actualizarCategoriaBlog,
  eliminarCategoriaBlog,
  todasCategoriasBlog,
  buscarCategoriaBlog,
};
