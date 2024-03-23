import mongoose from "mongoose";

// MODELO DE DESCUENTOS Y CUPONES
const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  // expiracion
  expiry: {
    type: Date,
    required: true,
  },
  // descuento
  discount: {
    type: Number,
    required: true,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
