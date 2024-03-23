import Coupon from "../models/couponModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const createCoupon = new Coupon(req.body);
    const saveSoupon = await createCoupon.save();

    return res.json({
      message: "El cupon ha sido creado",
      status: 201,
      success: true,
      data: saveSoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const getId = await Coupon.findById(id);

    return res.json(getId);
  } catch (error) {
    throw new Error(error);
  }
});

const obtenerCupones = asyncHandler(async (req, res) => {
  try {
    const allCuupons = await Coupon.find();

    res.json(allCuupons);
  } catch (error) {
    throw new Error(error);
  }
});

const actualizarCupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const updateCuopon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      message: "El cupon se ha actualizado",
      status: 200,
      success: true,
      data: updateCuopon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const eliminarCupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const deleteCoupon = await Coupon.findByIdAndDelete(id);

    res.json({
      message: "Cupon eliminado correctamente",
      status: 200,
      success: true,
      data: deleteCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export {
  createCoupon,
  obtenerCupones,
  getCoupon,
  actualizarCupon,
  eliminarCupon,
};
