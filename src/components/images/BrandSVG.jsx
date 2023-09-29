/**
 * Componente da composição do Logotipo.
 *  @module Logo
 */

import { config } from "@/utils/webappconfig";
import { Box, chakra, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

/**
 * Monta o Componente de Logo.
 * @method Logo
 * @memberof module:Logo
 * @param {Object} props propriedades do arquivo que compõe o logo.
 * @returns {Component} componente que monta o logo.
 */

export default function BrandSVG({ ...props }) {
  const { brand } = config.theming.customIcons;
  const router = useRouter();
  return (
    <Box
      my={"auto"}
      onClick={() => router.push("../")}
      _hover={{
        cursor: "pointer",
      }}
    >
      <chakra.svg
        as={motion.svg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={brand.viewBox}
        {...props}
        fill={useColorModeValue("brand.900", "brand.50")}
      >
        {brand.path}
      </chakra.svg>
    </Box>
  );
}
