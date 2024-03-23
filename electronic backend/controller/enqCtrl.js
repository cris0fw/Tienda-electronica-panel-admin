import Enquiry from "../models/enqModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";

const obtenerLasConsultas = asyncHandler(async (req, res) => {
  try {
    const allEnquiry = await Enquiry.find();

    return res.json(allEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const obtenerConsulta = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const findEnquiry = await Enquiry.findById(id);
    return res.json(findEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const crearConsulta = asyncHandler(async (req, res) => {
  try {
    const createEnquiry = new Enquiry(req.body);
    const saveEnquiry = await createEnquiry.save();

    return res.json(saveEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const eliminarCOnsulta = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteEquiry = await Enquiry.findByIdAndDelete(id);

    return res.json({
      message: "Se ha eliminado el color",
      status: 200,
      success: true,
      data: deleteEquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const actualizarConsulta = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updateEquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({
      message: "Se ha actualizado correctamente",
      status: 200,
      success: true,
      data: updateEquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export {
  obtenerLasConsultas,
  obtenerConsulta,
  crearConsulta,
  eliminarCOnsulta,
  actualizarConsulta,
};
