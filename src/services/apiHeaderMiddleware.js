import { config } from "@/utils/webappconfig";
import _ from "lodash";
import { getToken } from "next-auth/jwt";

/**
 * Utilitário para dar override sobre erro do CORS com direcionamentos HTTPS.
 * Atualmente sem uso. Consta aqui apenas como referência.
 *
 * @param {Function} fn função contendo a requisição ou o objeto da rota.
 *
 * @returns função com rota já trabalhada com os headers de segurança
 */
export const apiHeaderMiddleware = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // INCLUIR SE NECESSÁRIO:
  //res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const route = req.headers["x-invoke-path"];
  
  const token = await getToken({
    req: req,
    secret: process.env.SECRET,
  });
  
  const authRoutes = config.auth.authenticatedRoutes;

  const found = () => {
    return authRoutes.find((item) => {
      if (item.toString().includes("/*")) {
        const strItem = item.substring(0, item.indexOf("/*"));
        const strRoute = route.substring(0, route.lastIndexOf("/") + 1);
        return item.toString().includes("api/") ? route.localeCompare(`/${strItem}`) === 0 : strRoute.localeCompare(`/${strItem}`);
      }
      return item.toString().includes("api/") ? route.localeCompare(`/${item}`) === 0 : route.localeCompare(`/api/${item}`) === 0;
    });
  };

  if (!_.isUndefined(found()) && !token) {
    //res.status(403).end();
    //return;
    return res.status(302).redirect("/auth/signin");
  }
  return await fn(req, res);
};
