import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import useDimensions from "../hooks/useDimensions";
import BrandSVG from "../images/BrandSVG";
// import Searchbar from "../navigation/Searchbar";
import Searchbar from "../navigation/Searchbar";
import ColorModeSwitch from "../switches/ColorModeSwitch";
import NavigationOptions from "./NavigationOptions";
import ProfileMenuOptions from "./ProfileMenuOptions";

export default function DesktopNavbar({ config, session, children, ...props }) {
  const hover = useColorModeValue(
    config.theming.lightModeHoverColor,
    config.theming.darkModeHoverColor
  );

  const { height, width } = useDimensions();
  const [isReduced, setReduced] = useState(false);

  useEffect(() => {
    if (width < 1200) {
      setReduced(true);
    } else {
      setReduced(false);
    }
  }, [isReduced, width]);

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
        justifyContent={"flex-start"}
        gap={"5"}
      >
        <Flex
          gap={"2"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          height={"fit-content"}
          my="auto"
          mr={"md"}
        >
          <BrandSVG width={"24"} alignSelf={"flex-start"} />
          <Spacer />
          <Heading
            _hover={{
              cursor: "default",
            }}
            as={"h6"}
            p="0"
            px={2}
            my={"auto"}
            size={"sm"}
            textAlign={"center"}
            lineHeight={"4"}
          >
            {config.meta.title}
          </Heading>
        </Flex>
        <Flex
          flexDirection={"row"}
          justifyContent={"center"}
          height={"fit-content"}
          //mr={isReduced && "0"}
          //width={isReduced && "auto"}
          my={"auto"}
        >
          <NavigationOptions config={config} />
        </Flex>
        {/* <Spacer /> */}
        <Flex gap={4} ml={"auto"} height={"fit-content"} my="auto">
          <Searchbar config={config} />
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
