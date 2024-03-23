import axios from "axios";
// importo la base de la api http://localhost:4000/api
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);

  if (response.data) {
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);

  if (response.data) {
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
};

const getWishList = async () => {
  const response = await axios.get(`${base_url}user/wishList`, config);

  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const response = await axios.post(
    `${base_url}user/addToCart`,
    cartData,
    config
  );

  if (response.data) {
    return response.data;
  }
};

const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);

  if (response.data) {
    return response.data;
  }
};

const removeProductFromCart = async (cartItemId) => {
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${cartItemId}`,
    config
  );

  if (response.data) {
    return response.data;
  }
};

const updateProductFromCart = async (cartDetail) => {
  const response = await axios.delete(
    `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.newQuantity}`,
    config
  );

  if (response.data) {
    return response.data;
  }
};

const createOrderPayment = async () => {
  const response = await axios.post(
    `${base_url}payment/create-order`,
    "",
    config
  );

  if (response.data) {
    return response.data;
  }
};

const updateUser = async (data) => {
  const response = await axios.put(`${base_url}user/edit-user`, data, config);

  if (response.data) {
    return response.data;
  }
};

const forgetPassword = async (data) => {
  const response = await axios.post(`${base_url}user/olvidar-contrasena`, data);

  if (response.data) {
    return response.data;
  }
};

const resetPassword = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    {
      password: data?.password,
    }
  );

  if (response.data) {
    return response.data;
  }
};

const emptyCart = async () => {
  const response = await axios.delete(
    `${base_url}user/cart/empty-cart`,
    config
  );

  if (response.data) {
    return response.data;
  }
};

export const authService = {
  register,
  login,
  getWishList,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  createOrderPayment,
  updateUser,
  forgetPassword,
  resetPassword,
  emptyCart,
};
