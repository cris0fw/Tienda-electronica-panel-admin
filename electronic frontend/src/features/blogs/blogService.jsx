import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";
// importo la base de la api http://localhost:4000/api

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/alls-blogs`);

  if (response.data) {
    return response.data;
  }
};

const getBlogId = async (id) => {
  const response = await axios.get(`${base_url}blog/single-blog/${id}`);

  if (response.data) {
    return response.data;
  }
};

const giveAlike = async (data) => {
  const response = await axios.put(`${base_url}blog/like-blog`, data, config);

  if (response.data) {
    return response.data;
  }
};

const giveAdislike = async (data) => {
  const response = await axios.put(
    `${base_url}blog/dislike-blog`,
    data,
    config
  );

  if (response.data) {
    return response.data;
  }
};

export const blogService = {
  getBlogs,
  getBlogId,
  giveAlike,
  giveAdislike,
};
