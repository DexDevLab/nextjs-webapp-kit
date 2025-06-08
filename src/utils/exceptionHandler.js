import _ from "lodash";

export function exceptionHandler(exception) {
  if (_.isUndefined(exception) || _.isNull(exception)) {
    const error = new Error();
    error.code = 405;
    error.message = "Method not Allowed";
    console.log("Exception Handler: Stack Trace - ", error);
    return error;
  }
  console.log("Exception Handler: Stack Trace - ", exception);
  const error = new Error(exception.message);
  error.code = exception.response?.status || exception.code || 500;
  switch (error.code) {
    case error.code.toString().includes("ENOTFOUND"):
      error.code = 404;
      break;
    case error.code.toString().includes("Network Error"):
      error.code = 500;
      error.name =
        "Erro de comunicação com a rede. Favor entrar em contato com o Suporte.";
      break;
    default:
      break;
  }
  const toast = {
    title: `Falha na Aplicação`,
    description: `(HTTP ${error.code})`,
    status: "error",
    autoClose: 9000,
    closeButton: false,
    code: error.code,
  };
  return toast;
}
