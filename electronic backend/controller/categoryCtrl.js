import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const saveCategory = await newCategory.save();

    return res.json({
      message: "Categoria creada",
      status: 201,
      success: true,
      data: saveCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const actualizarCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({
      message: "Categoria actualizada correctamente",
      status: 200,
      success: true,
      data: updateCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const eliminarCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const deleteCategory = await Category.findByIdAndDelete(id);

    return res.json({
      message: "Categoria eliminada correctamente",
      status: 200,
      success: true,
      data: deleteCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const todasMisCategorias = asyncHandler(async (req, res) => {
  try {
    const misCategorias = await Category.find();

    return res.json(misCategorias);
  } catch (error) {
    throw new Error(error);
  }
});

const obtenerCategoria = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const obtenerCategoria = await Category.findById(id);

    return res.json(obtenerCategoria);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  createCategory,
  actualizarCategory,
  eliminarCategory,
  todasMisCategorias,
  obtenerCategoria,
};
