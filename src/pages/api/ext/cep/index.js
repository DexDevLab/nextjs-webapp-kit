import { getCep } from "@/controller/cep";
import { apiHeaderMiddleware } from "@/services/apiHeaderMiddleware";
import { exceptionHandler } from "@/utils/exceptionHandler";

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const { cep } = req.query;
        const query = await getCep(cep);
        return res.json({ status: 200, data: query });
      default:
        const error = exceptionHandler();
        return res.json({ status: error.code, data: error.message });
    }
  } catch (e) {
    const error = exceptionHandler(e);
    return res.json({ status: error.code, data: error });
  }
};

export default apiHeaderMiddleware(handler);