/**
 * Componente da composição do Logotipo.
 *  @module Logo
 */

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Icon,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import ChakraMenuIcon from "../icons/ChakraMenuIcon";
import Hyperlink from "../navigation/Hyperlink";
import NavbarMenu from "./NavbarMenu";

/**
 * Monta o Componente de Logo.
 * @method Logo
 * @memberof module:Logo
 * @param {Object} props propriedades do arquivo que compõe o logo.
 * @returns {Component} componente que monta o logo.
 */

export default function NavbarMenuItems({
  config,
  menu,
  navigation,
  ...props
}) {
  const accordionFontColor = useColorModeValue(
    config.theming.lightModeFontColor,
    config.theming.darkModeFontColor
  );

  const hoverColor = useColorModeValue(
    config.theming.lightModeHoverColor,
    config.theming.darkModeHoverColor
  );

  const menuItemVariants = {
    open: {
      opacity: 1,
      transition: {
        stiffness: 100,
        type: "spring",
      },
    },
    closed: {
      opacity: 0,
    },
  };

  const offset = () => {
    switch (navigation) {
      case "tablet":
        return [0, 19];
      case "mobile":
        return [50, 0];
      default:
        return [0, 19];
    }
  };

  return (
    <>
      {menu.map((menuItem, idx) => {
        if (menuItem.items.length > 0) {
          return (
            <NavbarMenu
              hoverColor={hoverColor}
              menuBehavior={config.ux.menu}
              initial={navigation == "mobile" && "closed"}
              animate={navigation == "mobile" && "open"}
              variants={navigation == "mobile" && menuItemVariants}
              as={navigation == "mobile" && motion.li}
              menuPlacement={navigation == "mobile" ? "right" : "bottom"}
              offset={offset()}
              rotateIcon={navigation == "mobile" && "-90"}
              menuIcon={
                config.ux.menu.useIconsForNavbarMenu && (
                  <ChakraMenuIcon icon={menuItem.icon} />
                )
              }
              p={0}
              key={menuItem.label + "-" + idx}
              label={menuItem.label}
              menuItems={menuItem.items}
            />
          );
        } else {
          return (
            <Hyperlink
              m={navigation != "mobile" && "auto"}
              px={1}
              pr={navigation != "mobile" && 2}
              color={accordionFontColor}
              onClick={menuItem.action}
              key={menuItem.label + "-" + idx}
            >
              <Flex>
                {config.ux.menu.useIconsForNavbarMenu && (
                  <Flex my={"auto"} mr={2}>
                    <ChakraMenuIcon icon={menuItem.icon} />
                  </Flex>
                )}
                <Heading as={"h6"} size={"sm"} mr={2}>
                  {menuItem.label}
                </Heading>
                <Flex my={"auto"}>
                  <Icon
                    as={ChevronDownIcon}
                    transform={"auto"}
                    rotate={navigation == "mobile" && "-90"}
                    sx={{
                      opacity: 0,
                    }}
                  />
                </Flex>
              </Flex>
            </Hyperlink>
          );
        }
      })}
    </>
  );
}
