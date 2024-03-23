import axios from "axios";
import { base_url } from "../../utils/base_url";

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

const uploading = async (data) => {
  const response = await axios.post(
    `${base_url}upload/upload-image`,
    data,
    config
  );

  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,
    config
  );

  return response.data;
};

const uploadingService = {
  uploading,
  deleteImg,
};

export default uploadingService;
