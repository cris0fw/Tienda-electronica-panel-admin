import axios from "axios";
import { base_url } from "../../utils/axiosConfig";
// importo la base de la api http://localhost:4000/api

const postQuery = async (contactData) => {
  const response = await axios.post(
    `${base_url}equiry/create-equiry`,
    contactData
  );

  if (response.data) {
    return response.data;
  }
};

export const contactService = {
  postQuery,
};
