import { config } from "@/utils/webappconfig";
import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
const {
  useSystemColorMode,
  initialColorMode,
  colors,
  lightModeFontColor,
  darkModeFontColor,
} = config.theming;

const storedColor = [];

if (typeof window !== "undefined") {
  storedColor.push(window.localStorage.getItem("chakra-ui-color-mode"));
}

const themeOptions = {
  config: {
    initialColorMode: useSystemColorMode
      ? "system"
      : storedColor[0] || initialColorMode,
    useSystemColorMode: useSystemColorMode,
  },
  colors: colors,
  styles: {
    global: (props) => ({
      "*": {
        "&::-webkit-scrollbar": {
          width: "0px",
          height: "8px",
          backgroundColor: "rgb(255,255,255,0.0)",
        },
        "&::-webkit-scrollbar-thumb": {
          height: "8px",
          backgroundColor: "#A0AEC0",
          borderRadius: "10px",
          border: "px solid #F7FAFC",
        },
      },
      body: {
        color: mode(lightModeFontColor, darkModeFontColor)(props),
      },
    }),
  },
  sizes: {
    maxVh: "var(--vh)",
    maxVw: "var(--vw)",
  },
};

export const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: "brand" }),
  themeOptions
);
