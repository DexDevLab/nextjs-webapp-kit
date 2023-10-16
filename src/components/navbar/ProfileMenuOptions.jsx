import ColorModeSwitch from "@/components/switches/ColorModeSwitch";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import
  {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useDisclosure,
  } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoLogInOutline } from "react-icons/io5";
import ChakraMenuIcon from "../icons/ChakraMenuIcon";

export default function ProfileMenuOptions({
  profileOptions,
  sidebar,
  ...props
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const router = useRouter();
  const { session, profile, ux } = profileOptions;

  const pfp =
    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9";

  const menus = [
    {
      label: "MenuItem 1",
      leftIcon: ArrowForwardIcon,
      rightIcon: "",
      action: () => {},
    },
    {
      label: "MenuItem 2",
      leftIcon: "",
      rightIcon: ArrowForwardIcon,
      action: () => {}
    },
    {
      label: "MenuItem 3",
      leftIcon: "",
      rightIcon: "",
      action: () => {}
    },
    {
      label: "Menu",
      leftIcon: ArrowForwardIcon,
      rightIcon: ArrowForwardIcon,
      action: () => {}
    },
  ];

  const ProfileMenuItems = () => {
    return (
      <>
        {menus.map((menuItem, idx) => {
          return (
            <>
              <MenuItem
                key={menuItem.label + "-" + idx}
                _focus={{
                  outline: "none",
                  boxShadow: "none",
                }}
                height={"fit-content"}
                p={1}
                py={2}
                w={"100%"}
                justifyContent={sidebar ? "left" : "right"}
                as={Button}
                variant={"ghost"}
                fontSize={"xs"}
                fontWeight={"normal"}
                onClick={menuItem.action}
                leftIcon={<ChakraMenuIcon icon={menuItem.leftIcon} size={4} />}
                rightIcon={
                  <ChakraMenuIcon icon={menuItem.rightIcon} size={4} />
                }
              >
                {menuItem.label}
              </MenuItem>
            </>
          );
        })}
      </>
    );
  };

  return (
    <Flex
      px={sidebar && 4}
      width={sidebar && "100%"}
      justifyContent={sidebar && "space-between"}
      height={"fit-content"}
      my="auto"
      zIndex={"toast"}
    >
      {sidebar && (
        <Box w={"150px"} m={"auto"} textAlign={"center"}>
          <Heading my={"auto"} as={"h6"} size={"sm"}>
            {session?.user.name || (profile.allowGuest && "Convidado")}
          </Heading>
        </Box>
      )}
      <Menu
        closeOnBlur
        isOpen={isOpen || menuOpen}
        tabIndex="-1"
        offset={[12, 3]}
      >
        <MenuButton
          _focus={{
            outline: "none",
            borderColor: "inherit",
            boxShadow: "none",
          }}
          px={0}
          fontSize={"md"}
          tabIndex="-1"
          _hover={{
            textDecoration: "none",
            boxShadow: "none",
          }}
          onMouseEnter={() => ux.menu.hover && onToggle()}
          onClick={() => onToggle()}
          onMouseLeave={() =>
            ux.menu.hover &&
            setTimeout(() => {
              onClose();
            }, 250)
          }
          colorScheme=""
          variant="link"
          as={Button}
          size={"sm"}
          rightIcon={null}
        >
          <Avatar
            size={"md"}
            icon={<AiOutlineUser fontSize="2rem" />}
            src={profile.profilePicture && pfp}
          />
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
          {sidebar ? (
            <>
              {ProfileMenuItems()}
              <MenuDivider m="0" />
              <MenuItem
                _focus={{
                  outline: "none",
                  boxShadow: "none",
                }}
                height={"fit-content"}
                p={2}
                w={"100%"}
                justifyContent={"left"}
                as={Button}
                variant={"ghost"}
                fontSize={"xs"}
                fontWeight={"normal"}
                onClick={() => {
                  session?.user.name ? signOut() : router.push("/auth/signin");
                }}
                leftIcon={<ChakraMenuIcon icon={IoLogInOutline} size={4} />}
                rightIcon={<ChakraMenuIcon size={4} />}
              >
                {session?.user.name ? "Sair" : "Login"}
              </MenuItem>
              <MenuDivider m="0" />
              <MenuItem
                _focus={{
                  outline: "none",
                  boxShadow: "none",
                  backgroundColor: "inherit",
                }}
                _hover={{
                  cursor: "unset",
                  backgroundColor: "unset",
                }}
                _active={{
                  backgroundColor: "inherit",
                }}
                m={0}
                height={"fit-content"}
                p={2}
                w={"100%"}
                justifyContent={"left"}
                as={Button}
                variant={"ghost"}
                fontSize={"md"}
                closeOnSelect={false}
              >
                <Flex height={"fit-content"} my="auto">
                  <ColorModeSwitch small />
                </Flex>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                _focus={
                  profile.enableProfile
                    ? {
                        outline: "none",
                        boxShadow: "none",
                      }
                    : {
                        outline: "none",
                        boxShadow: "none",
                        backgroundColor: "inherit",
                      }
                }
                _hover={
                  (!profile.enableProfile || !session?.user.name) && {
                    cursor: "unset",
                  }
                }
                _active={
                  !profile.enableProfile && {
                    backgroundColor: "inherit",
                  }
                }
                height={"fit-content"}
                p={2}
                w={"100%"}
                justifyContent={"center"}
                as={Button}
                variant={"ghost"}
                fontSize={"md"}
                closeOnSelect={false}
                onClick={() => {
                  session?.user.name
                    ? router.push("../profile")
                    : setMenuOpen("profileMenu");
                }}
              >
                {session?.user.name || (profile.allowGuest && "Convidado")}
              </MenuItem>
              <MenuDivider m="0" />
              {ProfileMenuItems()}
              <MenuDivider m="0" />
              <MenuItem
                _focus={{
                  outline: "none",
                  boxShadow: "none",
                }}
                height={"fit-content"}
                w={"100%"}
                justifyContent={"right"}
                as={Button}
                variant={"ghost"}
                fontSize={"xs"}
                fontWeight={"normal"}
                onClick={() => {
                  session?.user.name ? signOut() : router.push("/auth/signin");
                }}
                rightIcon={<ChakraMenuIcon icon={IoLogInOutline} size={4} />}
                leftIcon={<ChakraMenuIcon size={4} />}
              >
                {session?.user.name ? "Sair" : "Login"}
              </MenuItem>
              <MenuDivider m="0" />
            </>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
}
