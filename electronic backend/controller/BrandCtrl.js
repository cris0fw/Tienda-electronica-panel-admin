import Brand from "../models/brandModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";

const createBrand = asyncHandler(async (req, res) => {
  try {
    const createBrand = new Brand(req.body);
    const saveBrand = await createBrand.save();

    return res.json({
      message: "Se ha creado una nueva marca",
      status: 201,
      success: true,
      data: saveBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({
      message: "Se ha actualizado la marca",
      status: 200,
      success: true,
      data: updateBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const deleteBrand = await Brand.findByIdAndDelete(id);

    return res.json({
      message: "Se ha eliminado la marca",
      status: 200,
      success: true,
      data: deleteBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const todosBrand = asyncHandler(async (req, res) => {
  try {
    const allsBrand = await Brand.find();

    return res.json(allsBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const obtenerBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const getBrand = await Brand.findById(id);

    return res.json(getBrand);
  } catch (error) {
    throw new Error(error);
  }
});

export { createBrand, updateBrand, deleteBrand, todosBrand, obtenerBrand };
