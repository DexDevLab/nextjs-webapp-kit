/**
 * Componente da composição do Logotipo.
 *  @module Logo
 */

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import ChakraMenuIcon from "../icons/ChakraMenuIcon";
import Hyperlink from "../navigation/Hyperlink";

/**
 * Monta o Componente de Logo.
 * @method Logo
 * @memberof module:Logo
 * @param {Object} props propriedades do arquivo que compõe o logo.
 * @returns {Component} componente que monta o logo.
 */

export default function MobileAccordionMenuItems({
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

  return (
    <>
      <Accordion width={"100%"} allowToggle>
        {menu.map((menuItem, idx) => {
          return (
            <AccordionItem
              key={menuItem.label + "-" + idx}
              border={"none"}
              bgColor={"none"}
            >
              <AccordionButton
                _hover={{
                  bgColor: "none",
                  color: hoverColor,
                }}
                _expanded={{
                  color: hoverColor,
                }}
              >
                <Box
                  ml={"3"}
                  width={"100%"}
                  textAlign="center"
                  fontWeight={"bold"}
                >
                  {menuItem.items.length > 0 ? (
                    <Flex justifyContent={"center"} alignContent={"center"}>
                      {config.ux.menu.useIconsForNavbarMenu && (
                        <Flex my={"auto"} mr={2}>
                          <ChakraMenuIcon icon={menuItem.icon} />
                        </Flex>
                      )}
                      <Heading as={"h6"} size={"sm"}>
                        {menuItem.label}
                      </Heading>
                    </Flex>
                  ) : (
                    <Hyperlink
                      color={accordionFontColor}
                      onClick={menuItem.action}
                    >
                      <Flex justifyContent={"center"} alignContent={"center"}>
                        {config.ux.menu.useIconsForNavbarMenu && (
                          <Flex my={"auto"} mr={2}>
                            <ChakraMenuIcon icon={menuItem.icon} />
                          </Flex>
                        )}
                        <Heading as={"h6"} size={"sm"}>
                          {menuItem.label}
                        </Heading>
                      </Flex>
                    </Hyperlink>
                  )}
                </Box>
                <AccordionIcon
                  _hover={{
                    color: hoverColor,
                  }}
                  sx={{
                    opacity: menuItem.items.length > 0 ? "unset" : 0,
                  }}
                />
              </AccordionButton>
              {menuItem.items.length > 0 && (
                <AccordionPanel pb={4}>
                  <List spacing={3}>
                    {Array.from(menuItem.items).map((item, idx2) => {
                      return (
                        <ListItem
                          key={
                            menuItem.label +
                            "-" +
                            idx +
                            "-" +
                            item.label +
                            "-" +
                            idx2
                          }
                        >
                          <Hyperlink
                            color={accordionFontColor}
                            onClick={item.action}
                          >
                            <Flex
                              alignItems={"center"}
                              justifyContent={"center"}
                              flexDirection={"row"}
                              gap={2}
                            >
                              <ChakraMenuIcon icon={item.leftIcon} />
                              {item.label}
                              <ChakraMenuIcon icon={item.rightIcon} />
                            </Flex>
                          </Hyperlink>
                        </ListItem>
                      );
                    })}
                  </List>
                </AccordionPanel>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
