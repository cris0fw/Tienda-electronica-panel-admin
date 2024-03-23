import axios from "axios";
import { base_url } from "../../utils/base_url.js";
import config from "../../utils/config.js";

// Se realiza la funcion login para realizar la autenticacion del usuario
const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/all-coupons`, config);

  return response.data;
};

const createdCoupon = async (data) => {
  const response = await axios.post(
    `${base_url}coupon/create-coupon`,
    data,
    config
  );

  return response.data;
};

const getCoupon = async (id) => {
  const response = await axios.get(
    `${base_url}coupon/get-coupon/${id}`,
    config
  );

  return response.data;
};

const updatedCoupon = async (data) => {
  const response = await axios.put(
    `${base_url}coupon/update-coupon/${data.id}`,
    {
      name: data.couponData.name,
      expiry: data.couponData.expiry,
      discount: data.couponData.discount,
    },
    config
  );

  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(
    `${base_url}coupon/delete-coupon/${id}`,
    config
  );

  return response.data;
};

const couponService = {
  getCoupons,
  createdCoupon,
  getCoupon,
  updatedCoupon,
  deleteCoupon,
};

export default couponService;
