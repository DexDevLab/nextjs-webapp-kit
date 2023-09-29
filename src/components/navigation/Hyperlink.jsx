import { config } from "@/utils/webappconfig";
import { Link } from "@chakra-ui/next-js";
import { useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Hyperlink({ children, href = "", onClick, ...props }) {
  const { theming } = config;
  
  const fontColor = useColorModeValue(
    theming.lightModeLinkColor,
    theming.darkModeLinkColor
  );
  
  const hoverColor = useColorModeValue(
    theming.lightModeHoverColor,
    theming.darkModeHoverColor
  );

  return (
    <Link
      as={NextLink}
      href={onClick ? "#" : href}
      color={fontColor}
      _hover={{
        textDecoration: "none",
        color: hoverColor,
        fontWeight: "bold",
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
}
