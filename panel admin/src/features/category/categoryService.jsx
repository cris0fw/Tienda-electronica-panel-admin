import axios from "axios";
import { base_url } from "../../utils/base_url.js";
import config from "../../utils/config.js";

// Se realiza la funcion login para realizar la autenticacion del usuario
const getCategory = async () => {
  const response = await axios.get(`${base_url}category/alls-categorys`);

  return response.data;
};

const createdCategory = async (data) => {
  const response = await axios.post(
    `${base_url}category/create-category`,
    data,
    config
  );

  return response.data;
};

const getCategories = async (id) => {
  const response = await axios.get(
    `${base_url}category/obtener-category/${id}`,
    config
  );

  return response.data;
};

const updatedCategory = async (data) => {
  const response = await axios.put(
    `${base_url}category/update-category/${data.id}`,
    { title: data.categoryData.title },
    config
  );

  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}category/delete-category/${id}`,
    config
  );

  return response.data;
};

const categoryService = {
  getCategory,
  createdCategory,
  getCategories,
  updatedCategory,
  deleteCategory,
};

export default categoryService;
