import { config } from "@/utils/webappconfig";
import { useBreakpointValue, useColorMode } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

export default function CustomToastContainer({ transition, ...pageProps }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const position = useBreakpointValue({
    base: "bottom-center",
    sm: "top-right",
  });
  const { useColorModeAsTheme, limit } = config.toasts;

  return (
    <ToastContainer
      limit={limit}
      theme={useColorModeAsTheme ? colorMode : "colored"}
      position={position}
    />
  );
}
