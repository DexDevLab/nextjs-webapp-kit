import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import BrandSVG from "../../images/BrandSVG";
import ColorModeSwitch from "../../switches/ColorModeSwitch";
import NavigationOptions from "./NavigationOptions";
import ProfileMenuOptions from "./ProfileMenuOptions";

export default function DesktopNavbar({ config, session, children, ...props }) {
  const hover = useColorModeValue(
    config.theming.lightModeHoverColor,
    config.theming.darkModeHoverColor
  );

  return (
    <>
      <Flex
        zIndex={"docked"}
        as="header"
        position="fixed"
        px="3"
        top="0"
        left={"0"}
        height={"14"}
        width={"100%"}
        boxShadow="lg"
        backgroundColor={useColorModeValue(
          "rgba(255,255, 255, 0.6)",
          "rgba(45, 55, 72, 0.6)"
        )}
        backdropFilter="saturate(180%) blur(15px)"
        flexDirection={"row"}
        justifyContent={"flex-start"}
        gap={"5"}
      >
        <Flex
          gap={"2"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          height={"fit-content"}
          my="auto"
          mr={"16"}
        >
          <BrandSVG width={"24"} alignSelf={"flex-start"} />
          <Spacer />
          <Heading
            _hover={{
              cursor: "default",
            }}
            as={"h6"}
            p="0"
            size={"sm"}
          >
            {config.meta.title}
          </Heading>
        </Flex>
        <NavigationOptions config={config} />
        <Spacer />
        <Flex height={"fit-content"} my="auto">
          <ColorModeSwitch small />
        </Flex>
        {config.profile.enableProfile ? (
          <ProfileMenuOptions profileOptions={{ session, ...config }} />
        ) : (
          config.auth.hasAuth && (
            <Button
              _focus={{
                outline: "none",
                borderColor: "inherit",
                boxShadow: "none",
              }}
              _hover={{
                textDecoration: "none",
                boxShadow: "none",
                color: hover,
              }}
              px={1}
              pb={1}
              fontSize={"md"}
              tabIndex="-1"
              colorScheme=""
              variant="link"
              size={"sm"}
              onClick={() => {
                session?.user.name ? signOut() : router.push("/auth/signin");
              }}
            >
              {session?.user.name ? "Sair" : "Login"}
            </Button>
          )
        )}
      </Flex>
      <Box pt="14">{children}</Box>
    </>
  );
}
