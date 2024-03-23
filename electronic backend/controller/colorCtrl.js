import Color from "../models/colorModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";

const obtenerLosColores = asyncHandler(async (req, res) => {
  try {
    const allColors = await Color.find();

    return res.json(allColors);
  } catch (error) {
    throw new Error(error);
  }
});

const obtenerColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const findColor = await Color.findById(id);
    return res.json(findColor);
  } catch (error) {
    throw new Error(error);
  }
});

const crearColor = asyncHandler(async (req, res) => {
  try {
    const createColor = new Color(req.body);
    const saveColor = await createColor.save();

    return res.json({
      message: "Se ha creado el color",
      status: 201,
      success: true,
      data: saveColor,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const eliminarColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteColor = await Color.findByIdAndDelete(id);

    return res.json({
      message: "Se ha eliminado el color",
      status: 200,
      success: true,
      data: deleteColor,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const actualizarColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updateColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({
      message: "Se ha actualizado correctamente",
      status: 200,
      success: true,
      data: updateColor,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export {
  obtenerLosColores,
  obtenerColor,
  crearColor,
  eliminarColor,
  actualizarColor,
};
