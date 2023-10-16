import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useEffect, useState } from "react";
import ChakraMenuIcon from "../icons/ChakraMenuIcon";

export default function NavbarMenu({
  menuBehavior,
  label,
  children,
  menuPlacement,
  menuIcon,
  rotateIcon,
  offset = [0, -1],
  as,
  initial,
  animate,
  variants,
  layout,
  hoverColor,
  menuItems,
  ...props
}) {
  const { hover } = menuBehavior;
  const [menuOpen, setMenuOpen] = useState(false);
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();
  const [bgTransparency, setBgTransparency] = useState(1);

  const bgColor = useColorModeValue(
    `rgba(255,255, 255, ${bgTransparency})`,
    `rgba(45, 55, 72, ${bgTransparency + 0.2})`
  );

  const bgColor2 = useColorModeValue(
    `rgba(255,255, 255, ${bgTransparency - 0.3})`,
    `rgba(45, 55, 72, ${bgTransparency - 0.4})`
  );

  const [currPos, setCurrPos] = useState(0);

  useScrollPosition(({ currPos }) => {
    setCurrPos(currPos.y);
  });

  useEffect(() => {
    if (currPos !== 0) {
      setBgTransparency(0.6);
      if (isOpen) {
        onClose();
        onOpen();
      }
    } else {
      setBgTransparency(1);
      if (isOpen) {
        onClose();
        onOpen();
      }
    }
  }, [currPos, isOpen, onClose, onOpen]);

  return (
    <Menu
      isOpen={isOpen || menuOpen}
      closeOnBlur
      placement={menuPlacement}
      tabIndex="-1"
      offset={offset}
      as={as}
      layout={layout || null}
      initial={initial}
      animate={animate}
      vaiants={variants}
    >
      <MenuButton
        _focus={{
          outline: "none",
          borderColor: "inherit",
          boxShadow: "none",
        }}
        _active={{
          color: hoverColor,
        }}
        px={1}
        fontSize={"md"}
        tabIndex="-1"
        _hover={{
          textDecoration: "none",
          boxShadow: "none",
          color: hoverColor,
        }}
        onMouseEnter={() => hover && onToggle()}
        onClick={() => onToggle()}
        onMouseLeave={() =>
          hover &&
          setTimeout(() => {
            onClose();
          }, 250)
        }
        colorScheme=""
        variant="link"
        as={Button}
        size={"sm"}
        leftIcon={menuIcon}
        rightIcon={
          <Icon
            as={ChevronDownIcon}
            transform={"auto"}
            rotate={rotateIcon}
            sx={{
              opacity: isOpen || menuOpen ? "unset" : 0,
            }}
          />
        }
        {...props}
      >
        <Heading as={"h6"} size={"sm"}>
          {label}
        </Heading>
      </MenuButton>
      <MenuList
        bgColor={bgColor}
        _focus={{
          outline: "none",
          borderColor: "inherit",
        }}
        p={0}
        minW="0"
        w={"fit-content"}
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        {Array.from(menuItems).map((item, idx2) => {
          return (
            <MenuItem
              bgColor={bgColor2}
              _focus={{
                outline: "none",
                boxShadow: "none",
              }}
              px={1}
              justifyContent={"left"}
              as={Button}
              variant={"ghost"}
              leftIcon={<ChakraMenuIcon icon={item.leftIcon} />}
              rightIcon={<ChakraMenuIcon icon={item.rightIcon} />}
              key={item.label + "-" + item.label + "-" + idx2}
              fontSize={"sm"}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
