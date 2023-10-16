import { config } from "@/utils/webappconfig";
import { Link } from "@chakra-ui/next-js";
import { useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Hyperlink({ children, href = "", onClick, sidebar, ...props }) {
  const { theming } = config;
  
  const linkColor = useColorModeValue(
    theming.lightModeLinkColor,
    theming.darkModeLinkColor
  );
  
  const hoverColor = useColorModeValue(
    theming.lightModeHoverColor,
    theming.darkModeHoverColor
  );

  const hoverColorInverted= useColorModeValue(
    theming.darkModeFontColor,
    theming.lightModeFontColor
  )

  return (
    <Link
      as={NextLink}
      href={onClick ? "#" : href}
      color={linkColor}
      _hover={{
        textDecoration: "none",
        color: sidebar ? hoverColorInverted  : hoverColor,
        fontWeight: !sidebar && "bold",
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
}
