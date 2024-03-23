import axios from "axios";
import { base_url } from "../../utils/base_url.js";
import config from "../../utils/config.js";

// Se realiza la funcion login para realizar la autenticacion del usuario
const getProducts = async () => {
  const response = await axios.get(`${base_url}product/todos-productos`);

  return response.data;
};

const createProduct = async (data) => {
  const response = await axios.post(
    `${base_url}product/create-product`,
    data,
    config
  );

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${base_url}product/eliminar-producto/${id}`,
    config
  );

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
};

export default productService;
