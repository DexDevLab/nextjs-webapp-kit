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

export default function SidebarMenuItems({ config, menu, ...props }) {
  
  const accordionFontColor = useColorModeValue(
    config.theming.lightModeFontColor,
    config.theming.darkModeFontColor
  );

  const hoverColor = useColorModeValue(
    config.theming.lightModeHoverColor,
    config.theming.darkModeHoverColor
  );

  return (
    <Accordion height={"100%"} allowToggle>
      <Flex
        pt={5}
        gap={5}
        //height={"100%"}
        //bgColor={"red"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
      >
        {menu.map((menuItem, idx) => {
          return (
            <AccordionItem
              key={menuItem.label + "-" + idx}
              border={"none"}
              alignSelf={"left"}
              px={2}
            >
              <AccordionButton
                pl={3}
                borderRadius={"10px"}
                borderBottomRadius={0}
                _hover={{
                  bgColor: "none",
                  color: hoverColor,
                }}
                _expanded={{
                  bgColor: hoverColor,
                  color: accordionFontColor,
                }}
              >
                <Box
                  m={"0"}
                  mr={3}
                  //width={"100%"}
                  textAlign="left"
                  fontWeight={"bold"}
                >
                  {menuItem.items.length > 0 ? (
                    <Flex justifyContent={"center"} alignContent={"center"}>
                      {config.ux.menu.useIconsForNavbarMenu && (
                        <Flex my={"auto"} mr={2}>
                          <ChakraMenuIcon icon={menuItem.icon} size={6} />
                        </Flex>
                      )}
                      <Heading as={"h6"} size={"md"}>
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
                            <ChakraMenuIcon icon={menuItem.icon} size={6} />
                          </Flex>
                        )}
                        <Heading as={"h6"} size={"md"}>
                          {menuItem.label}
                        </Heading>
                      </Flex>
                    </Hyperlink>
                  )}
                </Box>
                <AccordionIcon
                  // _hover={{
                  //   bgColor: "none",
                  //   color: hoverColor,
                  // }}
                  sx={{
                    opacity: menuItem.items.length > 0 ? "unset" : 0,
                  }}
                />
              </AccordionButton>
              {menuItem.items.length > 0 && (
                <AccordionPanel
                  pb={4}
                  borderRadius={"10px"}
                  bgColor={hoverColor}
                  color={accordionFontColor}
                  borderTopRadius={0}
                >
                  <List spacing={3}>
                    {Array.from(menuItem.items).map((item, idx2) => {
                      return (
                        <ListItem
                          ml={1}
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
                            sidebar
                            color={accordionFontColor}
                            onClick={item.action}
                          >
                            <Flex
                              alignItems={"center"}
                              justifyContent={"flex-start"}
                              flexDirection={"row"}
                              gap={1.5}
                            >
                              <ChakraMenuIcon
                                icon={item.leftIcon}
                                invertHoverColor
                              />

                              {item.label}
                              <ChakraMenuIcon
                                icon={item.rightIcon}
                                invertHoverColor
                              />
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
      </Flex>
    </Accordion>
  );
}
