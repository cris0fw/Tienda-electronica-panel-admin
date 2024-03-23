import axios from "axios";
import { base_url } from "../../utils/base_url.js";
import config from "../../utils/config.js";

// Se realiza la funcion login para realizar la autenticacion del usuario
const getCategoryBlog = async () => {
  const response = await axios.get(
    `${base_url}categoryBlog/alls-category-blog`
  );

  return response.data;
};

const createCategoryBlog = async (data) => {
  const response = await axios.post(
    `${base_url}categoryBlog/create-category-blog`,
    data,
    config
  );

  return response.data;
};

const getBlogCategory = async (id) => {
  const response = await axios.get(
    `${base_url}categoryBlog/find-category-blog/${id}`,
    config
  );

  return response.data;
};

const updatedBlogCategory = async (data) => {
  const response = await axios.put(
    `${base_url}categoryBlog/update-category-blog/${data.id}`,
    { title: data.blogCategory.title },
    config
  );

  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}categoryBlog/delete-category-blog/${id}`,
    config
  );

  return response.data;
};

const categoryBlogService = {
  getCategoryBlog,
  createCategoryBlog,
  getBlogCategory,
  updatedBlogCategory,
  deleteBlogCategory,
};

export default categoryBlogService;
