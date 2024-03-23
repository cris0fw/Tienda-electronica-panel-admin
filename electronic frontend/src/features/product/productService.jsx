import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";
// importo la base de la api http://localhost:4000/api

const getProducts = async (data) => {
  const response = await axios.get(
    `${base_url}product/todos-productos?${
      data?.brand ? `brand=${data?.brand}&&` : ""
    }${data?.tag ? `tags=${data?.tag}&&` : ""}${
      data?.category ? `category=${data?.category}&&` : ""
    }${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${
      data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""
    }${data?.sort ? `sort=${data?.sort}&&` : ""}`
  );
  if (response.data) {
    return response.data;
  }
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/buscar-producto/${id}`);

  if (response.data) {
    return response.data;
  }
};

const addToWishList = async (productId) => {
  const response = await axios.put(
    `${base_url}product/add-list`,
    {
      prodId: productId, // Cambiar productId a prodId
    },
    config
  );

  if (response.data) {
    return response.data;
  }
};

const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, config);

  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getProducts,
  addToWishList,
  getSingleProduct,
  rateProduct,
};
