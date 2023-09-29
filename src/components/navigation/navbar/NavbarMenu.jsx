import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

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
  ...props
}) {
  const { hover } = menuBehavior;
  const [menuOpen, setMenuOpen] = useState(false);
  const { isOpen, onToggle, onClose } = useDisclosure();

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
        {children}
      </MenuList>
    </Menu>
  );
}
