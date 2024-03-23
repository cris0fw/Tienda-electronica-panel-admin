import axios from "axios";
import { base_url } from "../../utils/base_url.js";
import config from "../../utils/config.js";

// Se realiza la funcion login para realizar la autenticacion del usuario
const getColors = async () => {
  const response = await axios.get(`${base_url}color/all-colors`);

  return response.data;
};

const createProduct = async (data) => {
  const response = await axios.post(
    `${base_url}color/create-color`,
    data,
    config
  );

  return response.data;
};

const getColor = async (id) => {
  const response = await axios.get(`${base_url}color/get-color/${id}`, config);

  return response.data;
};

const updatedColor = async (data) => {
  const response = await axios.put(
    `${base_url}color/update-color/${data.id}`,
    { title: data.colorData.title },
    config
  );

  return response.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(
    `${base_url}color/delete-color/${id}`,
    config
  );

  return response.data;
};

const colorService = {
  getColors,
  createProduct,
  getColor,
  updatedColor,
  deleteColor,
};

export default colorService;
