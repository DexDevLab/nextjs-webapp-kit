import axiosClient from "axios";

/**
 * Conexão padrão com o Backend pelo Axios.
 * @method axios
 * @memberof module:services
 * @returns {Function} Instância Axios.
 */
export const axiosAPI = axiosClient.create({
  baseURL: "/",
  timeout: 10000,
});
