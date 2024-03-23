import axios from "axios";
import { base_url } from "../../utils/base_url.js";

// Se realiza la funcion login para realizar la autenticacion del usuario
const getUsers = async () => {
  const response = await axios.get(`${base_url}user/buscar-usuarios`);

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
