import axios from "axios";
import { base_url } from "../../utils/base_url.js";
import config from "../../utils/config.js";

// Se realiza la funcion login para realizar la autenticacion del usuario
const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/alls-blogs`);

  return response.data;
};

const createBlogs = async (data) => {
  const response = await axios.post(`${base_url}blog/crear-blog`, data, config);

  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/single-blog/${id}`);

  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(
    `${base_url}blog/delete-blog/${id}`,
    config
  );

  return response.data;
};

const updateBlog = async (data) => {
  const response = await axios.put(
    `${base_url}blog/update-blog/${data.id}`,
    {
      title: data.blogData.title,
      description: data.blogData.description,
      category: data.blogData.category,
    },
    config
  );

  return response.data;
};

const blogService = {
  getBlogs,
  createBlogs,
  getBlog,
  deleteBrand,
  updateBlog,
};

export default blogService;
