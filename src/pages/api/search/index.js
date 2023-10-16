import { getSearch } from "@/controller/search";
import { apiHeaderMiddleware } from "@/services/apiHeaderMiddleware";
import { exceptionHandler } from "@/utils/exceptionHandler";

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const { search } = req.query;
        const query = await getSearch(search);
        return res.status(200).json(query);
      default:
        return exceptionHandler(null, res);
    }
  } catch (e) {
    return exceptionHandler(e, res);
  }
};

export default apiHeaderMiddleware(handler);
