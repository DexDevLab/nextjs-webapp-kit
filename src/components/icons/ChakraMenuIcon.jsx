/**
 * Componente da composiÃ§Ã£o do Logotipo.
 *  @module Logo
 */

import { config } from "@/utils/webappconfig";
import { Icon, useColorModeValue } from "@chakra-ui/react";

/**
 * Monta o Componente de Logo.
 * @method Logo
 * @memberof module:Logo
 * @param {Object} props propriedades do arquivo que compÃµe o logo.
 * @returns {Component} componente que monta o logo.
 */

export default function ChakraMenuIcon({
  icon,
  size,
  invertHoverColor,
  ...props
}) {
  const hoverColorInverted = useColorModeValue(
    config.theming.darkModeFontColor,
    config.theming.lightModeFontColor
  );

  return (
    <Icon
      as={icon}
      _hover={{
        color: invertHoverColor && hoverColorInverted,
        //cursor: "help",
      }}
      sx={{
        opacity: icon ? "unset" : 0,
      }}
      boxSize={size}
      {...props}
    />
  );
}
