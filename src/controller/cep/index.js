import { axiosAPI } from "@/services/apiService";
import { exceptionHandler } from "@/utils/exceptionHandler";

export async function getCep(cep) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_CEP}`;
    const { data } = await axiosAPI.get(`${url}/${cep}`);
    return data;
  } catch (e) {
    throw exceptionHandler(e);
  }
}