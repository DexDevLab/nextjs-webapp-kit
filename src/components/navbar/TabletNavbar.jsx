import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import BrandSVG from "../images/BrandSVG";
import Searchbar from "../navigation/Searchbar";
import ColorModeSwitch from "../switches/ColorModeSwitch";
import NavigationOptions from "./NavigationOptions";
import ProfileMenuOptions from "./ProfileMenuOptions";

export default function TabletNavbar({ config, session, children, ...props }) {
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
          "rgba(255,255, 255, 0.75)",
          "rgba(45, 55, 72, 0.85)"
        )}
        backdropFilter="saturate(180%) blur(15px)"
        flexDirection={"row"}
        justifyContent={"space-between"}
        gap={"5"}
      >
        <Flex
          gap={"2"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          height={"fit-content"}
          my={"auto"}
          mr={"sm"}
        >
          <BrandSVG width={"24"} alignSelf={"flex-start"} />
        </Flex>
        <Flex
          flexDirection={"row"}
          justifyContent={"center"}
          height={"fit-content"}
          m={"auto"}
          width={!config.ux.useSearchBar && "100%"}
        >
          <NavigationOptions config={config} navigation={"tablet"} />
        </Flex>
        <Flex
          width={"auto"}
          flexDirection={"row"}
          height={"fit-content"}
          alignContent={"center"}
          justifyContent={"flex-end"}
          ml={"auto"}
          my={"auto"}
          gap={3}
        >
          <Flex gap={4} my={"auto"}>
            {config.ux.useSearchBar && <Searchbar config={config} />}
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
                  session?.user.name
                    ? signOut({ redirect: false }).then(() => {
                        router.push("/auth/signin");
                      })
                    : router.push("/auth/signin");
                }}
              >
                {session?.user.name ? "Sair" : "Login"}
              </Button>
            )
          )}
        </Flex>
      </Flex>
      <Box pt="14">{children}</Box>
    </>
  );
}
