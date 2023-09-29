import { theme } from "@/styles/themes/theme";
import { ColorModeScript } from "@chakra-ui/react";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>{/* PROVIDE CUSTOM CSS HERE */}</Head>
      <body>
        <ColorModeScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
