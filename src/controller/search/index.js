import { axiosAPI } from "@/services/apiService";
import { exceptionHandler } from "@/utils/exceptionHandler";

export async function getSearch(search) {
  try {
    const url = `https://jsonplaceholder.typicode.com/users`;
    const data = (await axiosAPI.get(url)).data;
    const results = Array.from(data).filter((item) => {
      return (
        item.name
          .toString()
          .toLowerCase()
          .includes(search.toString().toLowerCase() || "") ||
        item.username
          .toString()
          .toLowerCase()
          .includes(search.toString().toLowerCase() || "") ||
        item.email
          .toString()
          .toLowerCase()
          .includes(search.toString().toLowerCase() || "")
      );
    });
    return results;
  } catch (e) {
    throw exceptionHandler(e, 0);
  }
}
