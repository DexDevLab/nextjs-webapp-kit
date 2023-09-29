import {
  Avatar,
  Button,
  Flex,
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

export default function ProfileMenuOptions({ profileOptions, ...props }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const router = useRouter();
  const { session, profile, ux } = profileOptions;

  const pfp =
    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9";

  return (
    <Flex height={"fit-content"} my="auto" zIndex={"toast"}>
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
            px={2}
            py={6}
            minW={"80px"}
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
            fontSize={"xs"}
            fontWeight={"normal"}
            onClick={() => {
              session?.user.name ? signOut() : router.push("/auth/signin");
            }}
          >
            {session?.user.name ? "Sair" : "Login"}
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
