import axios from "axios";
import { base_url } from "../../utils/base_url.js";
import config from "../../utils/config.js";

// Se realiza la funcion login para realizar la autenticacion del usuario
const getEnquiry = async () => {
  const response = await axios.get(`${base_url}equiry/all-equirys`);

  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(
    `${base_url}equiry/delete-equiry/${id}`,
    config
  );

  return response.data;
};

const getOneEnquiry = async (id) => {
  const response = await axios.get(`${base_url}equiry/get-equiry/${id}`);

  return response.data;
};

const updatedEnquiry = async (enq) => {
  const response = await axios.put(
    `${base_url}equiry/update-equiry/${enq.id}`,
    {
      status: enq.enqData,
    },
    config
  );

  return response.data;
};

const enquiryService = {
  getEnquiry,
  deleteEnquiry,
  getOneEnquiry,
  updatedEnquiry,
};

export default enquiryService;
