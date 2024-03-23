import axios from "axios";
import { base_url } from "../../utils/base_url.js";
import config from "../../utils/config.js";

// Se realiza la funcion login para realizar la autenticacion del usuario
const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/todos-brand`);

  return response.data;
};

const createdBrand = async (data) => {
  const response = await axios.post(
    `${base_url}brand/create-brand`,
    data,
    config
  );

  return response.data;
};

const getBrand = async (id) => {
  const response = await axios.get(
    `${base_url}brand/obtener-brand/${id}`,
    config
  );

  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(
    `${base_url}brand/delete-brand/${id}`,
    config
  );

  return response.data;
};

const updatedBrand = async (data) => {
  const response = await axios.put(
    `${base_url}brand/update-brand/${data.id}`,
    { title: data.brandData.title },
    config
  );

  return response.data;
};

const brandService = {
  getBrands,
  createdBrand,
  getBrand,
  updatedBrand,
  deleteBrand,
};

export default brandService;
