import axios from "axios";
import { base_url } from "../../utils/base_url.js";
const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : { token: null };

const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
    Accept: "application/json",
    "Cache-Control": "no-cache",
  },
};

// Se realiza la funcion login para realizar la autenticacion del usuario
const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }

  return response.data.data;
};

// Se realiza la funcion login para realizar la autenticacion del usuario
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/get-alls-orders`, config);

  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getOrderByUser/${id}`,
    "",
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
