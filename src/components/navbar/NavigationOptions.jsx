import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowDropdown, IoIosPie } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import MobileAccordionMenuItems from "../menus/MobileAccordionMenuItems";
import NavbarMenuItems from "../menus/NavbarMenuItems";
import SidebarMenuItems from "../menus/SidebarMenuItems";

export default function NavigationOptions({
  config,
  navigation = "navbar",
  ...props
}) {
  const menuVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 2, delayChildren: 0 },
    },
    closed: {
      opacity: 0,
    },
  };

  const menus = [
    {
      label: "Menu1",
      icon: AiOutlineHome,
      action: () => {},
      items: [
        {
          label: "Link with left Icon",
          leftIcon: ArrowForwardIcon,
          rightIcon: "",
          action: () => {},
        },
        {
          label: "Link2",
          leftIcon: "",
          rightIcon: "",
          action: () => {},
        },
        {
          label: "Link3",
          leftIcon: "",
          rightIcon: "",
          action: () => {},
        },
      ],
    },
    {
      label: "Menu2",
      icon: MdOutlineDashboard,
      action: () => {},
      items: [],
    },
    {
      label: "Menu3",
      icon: IoIosArrowDropdown,
      action: () => {},
      items: [
        {
          label: "Link1",
          leftIcon: "",
          rightIcon: "",
          action: () => {},
        },
        {
          label: "Link w/ 2 icons",
          leftIcon: ArrowForwardIcon,
          rightIcon: ArrowForwardIcon,
          action: () => {},
        },
        {
          label: "Link3",
          leftIcon: "",
          rightIcon: "",
          action: () => {},
        },
        {
          label: "Link4",
          leftIcon: "",
          rightIcon: "",
          action: () => {},
        },
      ],
    },
    {
      label: "Menu4",
      icon: IoIosPie,
      action: () => {},
      items: [
        {
          label: "Link1",
          leftIcon: ArrowForwardIcon,
          rightIcon: ArrowForwardIcon,
          action: () => {},
        },
        {
          label: "Link2",
          leftIcon: "",
          rightIcon: ArrowForwardIcon,
          action: () => {},
        },
        {
          label: "Link3",
          leftIcon: "",
          rightIcon: "",
          action: () => {},
        },
        {
          label: "Link with a long text",
          leftIcon: "",
          rightIcon: ArrowForwardIcon,
          action: () => {},
        },
      ],
    },
  ];

  return (
    <AnimatePresence>
      <Flex
        // mx={navigation == "mobile" || navigation == "sidebar" ? "0" : "auto"}
        gap={2}
        flexDirection={
          (navigation == "mobile" || navigation == "sidebar") && "column"
        }
        as={navigation == "mobile" && motion.ul}
        layout={navigation == "mobile" ? true : null}
        variants={navigation == "mobile" && menuVariants}
        initial={navigation == "mobile" && "closed"}
        animate={navigation == "mobile" && "open"}
        width={
          navigation == "sidebar" ||
          (config.ux.menu.useAccordionOnMobile && navigation == "mobile")
            ? "100%"
            : "fit-content"
        }
      >
        <AnimatePresence>
          {config.ux.menu.useAccordionOnMobile && navigation == "mobile" ? (
            <MobileAccordionMenuItems config={config} menu={menus} />
          ) : navigation == "sidebar" ? (
            <SidebarMenuItems config={config} menu={menus} />
          ) : (
            <NavbarMenuItems
              navigation={navigation}
              config={config}
              menu={menus}
            />
          )}
        </AnimatePresence>
      </Flex>
    </AnimatePresence>
  );
}
