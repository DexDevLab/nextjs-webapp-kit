import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Hyperlink from "../Hyperlink";
import NavbarMenu from "./NavbarMenu";

export default function NavigationOptions({
  config,
  navigation = "navbar",
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

  const menuVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 2, delayChildren: 0 },
    },
    closed: {
      opacity: 0,
    },
  };

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

  const icon = (iconObject, iconName, opacity) => {
    if (iconObject) {
      return iconName;
    } else {
      return (
        <Icon
          as={iconName}
          sx={{
            opacity: iconName ? "unset" : 0,
          }}
        />
      );
    }
  };

  const menus = [
    {
      label: "Menu1",
      icon: ArrowForwardIcon,
      action: "",
      items: [
        {
          label: "Link with left Icon",
          leftIcon: ArrowForwardIcon,
          rightIcon: "",
          action: "",
        },
        {
          label: "Link2",
          leftIcon: "",
          rightIcon: "",
          action: "",
        },
        {
          label: "Link3",
          leftIcon: "",
          rightIcon: "",
          action: "",
        },
      ],
    },
    {
      label: "Menu2",
      icon: ArrowForwardIcon,
      action: "",
      items: [],
    },
    {
      label: "Menu3",
      icon: ArrowForwardIcon,
      action: "",
      items: [
        {
          label: "Link1",
          leftIcon: "",
          rightIcon: "",
          action: "",
        },
        {
          label: "Link w/ 2 icons",
          leftIcon: ArrowForwardIcon,
          rightIcon: ArrowForwardIcon,
          action: "",
        },
        {
          label: "Link3",
          leftIcon: "",
          rightIcon: "",
          action: "",
        },
        {
          label: "Link4",
          leftIcon: "",
          rightIcon: "",
          action: "",
        },
      ],
    },
    {
      label: "Menu4",
      icon: ArrowForwardIcon,
      action: "",
      items: [
        {
          label: "Link1",
          leftIcon: "",
          rightIcon: "",
          action: "",
        },
        {
          label: "Link2",
          leftIcon: "",
          rightIcon: ArrowForwardIcon,
          action: "",
        },
        {
          label: "Link3",
          leftIcon: "",
          rightIcon: "",
          action: "",
        },
        {
          label: "Link with a long text",
          leftIcon: "",
          rightIcon: ArrowForwardIcon,
          action: "",
        },
      ],
    },
  ];

  const NavbarMenuItems = () => {
    const offset = () => {
      switch (navigation) {
        case "tablet":
          return [0, 18];
        case "mobile":
          return [50, 0];
        default:
          return [0, 0];
      }
    };
    return (
      <>
        {menus.map((menuItem, idx) => {
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
                  config.ux.menu.useIconsForNavbarMenu &&
                  icon(false, menuItem.icon)
                }
                p={0}
                key={menuItem.label + "-" + idx}
                label={menuItem.label}
              >
                {Array.from(menuItem.items).map((item, idx2) => {
                  return (
                    <MenuItem
                      _focus={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                      px={2}
                      minW={"80px"}
                      justifyContent={"flex-start"}
                      as={Button}
                      variant={"ghost"}
                      leftIcon={item.leftIcon && icon(false, item.leftIcon)}
                      rightIcon={item.rightIcon && icon(false, item.rightIcon)}
                      key={
                        item.label + "-" + idx + "-" + item.label + "-" + idx2
                      }
                      fontSize={"sm"}
                    >
                      {item.label}
                    </MenuItem>
                  );
                })}
              </NavbarMenu>
            );
          } else {
            return (
              <Hyperlink
                m={navigation != "mobile" && "auto"}
                px={1}
                pr={navigation != "mobile" && 7}
                color={accordionFontColor}
                onClick={menuItem.action}
                key={menuItem.label + "-" + idx}
              >
                <Flex>
                  {config.ux.menu.useIconsForNavbarMenu && (
                    <Flex my={"auto"} mr={2}>
                      {icon(false, menuItem.icon)}
                    </Flex>
                  )}
                  <Heading as={"h6"} size={"sm"}>
                    {menuItem.label}
                  </Heading>
                </Flex>
              </Hyperlink>
            );
          }
        })}
      </>
    );
  };

  const AccordionItems = () => {
    return (
      <>
        <Accordion allowToggle>
          {menus.map((menuItem, idx) => {
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
                            {icon(false, menuItem.icon)}
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
                              {icon(false, menuItem.icon)}
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
                            <Flex
                              alignItems={"center"}
                              justifyContent={"center"}
                              flexDirection={"row"}
                            >
                              {item.leftIcon && <ListIcon as={item.leftIcon} />}
                              <Hyperlink
                                color={accordionFontColor}
                                mr={2}
                                onClick={item.action}
                              >
                                {item.label}
                              </Hyperlink>
                              {item.rightIcon && (
                                <ListIcon as={item.rightIcon} />
                              )}
                            </Flex>
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
  };

  return (
    <AnimatePresence>
      <Flex
        mx={navigation == "mobile" ? "0" : "auto"}
        gap={"5"}
        flexDirection={navigation == "mobile" && "column"}
        as={navigation == "mobile" && motion.ul}
        layout={navigation == "mobile" ? true : null}
        variants={navigation == "mobile" && menuVariants}
        initial={navigation == "mobile" && "closed"}
        animate={navigation == "mobile" && "open"}
        width={
          config.ux.menu.useAccordionOnMobile && navigation == "mobile"
            ? "100%"
            : "fit-content"
        }
      >
        <AnimatePresence>
          {config.ux.menu.useAccordionOnMobile && navigation == "mobile" ? (
            <>{AccordionItems()}</>
          ) : (
            <>{NavbarMenuItems()}</>
          )}
        </AnimatePresence>
      </Flex>
    </AnimatePresence>
  );
}
