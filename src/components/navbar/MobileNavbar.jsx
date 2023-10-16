import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import BrandSVG from "../images/BrandSVG";
import ColorModeSwitch from "../switches/ColorModeSwitch";
import HamburgerIcon from "../icons/HamburgerIcon";
import NavigationOptions from "./NavigationOptions";
import ProfileMenuOptions from "./ProfileMenuOptions";
import Searchbar from "../navigation/Searchbar";

export default function MobileNavbar({ config, session, children, ...props }) {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const bgColor1 = useColorModeValue(
    "rgba(255,255, 255, 0.75)",
    "rgba(45, 55, 72, 0.85)"
  );

  const bgColor2 = useColorModeValue(
    "rgba(255,255, 255, 1)",
    "rgba(45, 55, 72, 1)"
  );

  const brandNameFontColor = useColorModeValue(
    config.theming.lightModeFontColor,
    config.theming.darkModeFontColor
  );

  const hover = useColorModeValue(
    config.theming.lightModeHoverColor,
    config.theming.darkModeHoverColor
  );

  const menuVariants = {
    open: {
      y: 8,
      opacity: 1,
      transition: { ease: "linear", staggerChildren: 10, delayChildren: 10 },
    },
    closed: {
      opacity: 0,
      y: -180,
      transition: { ease: "linear", staggerChildren: 10, delayChildren: 10 },
    },
    initial: {
      opacity: 0,
      y: -180,
      transition: { ease: "linear", staggerChildren: 10, delayChildren: 10 },
    },
  };

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
        backgroundColor={bgColor1}
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
        >
          <HamburgerIcon setOpen={!isOpen} onClickFn={() => setOpen(!isOpen)} />
        </Flex>

        <AnimatePresence>
          {!isOpen ? (
            <AnimatePresence>
              <Flex
                as={motion.div}
                initial={{
                  opacity: 0,
                  transition: { ease: "anticipate", duration: 0.75 },
                }}
                animate={{
                  opacity: 1,
                  transition: { ease: "anticipate", duration: 0.75 },
                }}
                exit={{
                  opacity: 0,
                }}
                gap={"2"}
                flexDirection={"row"}
                justifyContent={"center"}
                height={"fit-content"}
                m={"auto"}
                //mr={"16"}
              >
                <BrandSVG width={"24"} alignSelf={"flex-start"} />
              </Flex>
            </AnimatePresence>
          ) : (
            <Flex
              as={motion.div}
              initial={{
                opacity: 0,
                transition: { ease: "anticipate", duration: 0.75 },
              }}
              animate={{
                opacity: 1,
                transition: { ease: "anticipate", duration: 0.75 },
              }}
              exit={{
                opacity: 0,
              }}
              gap={"2"}
              flexDirection={"row"}
              justifyContent={"center"}
              height={"fit-content"}
              m={"auto"}
            >
              <Heading
                color={brandNameFontColor}
                as={"h6"}
                p="0"
                pl={1}
                size={"sm"}
                _hover={{
                  cursor: "default",
                }}
              >
                {config.meta.title}
              </Heading>
            </Flex>
          )}
        </AnimatePresence>

        <Flex
          width={"auto"}
          flexDirection={"row"}
          height={"fit-content"}
          alignContent={"center"}
          justifyContent={"flex-end"}
          //ml={"auto"}
          my={"auto"}
          gap={4}
        >
           <Searchbar my={"auto"} config={config} />
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
      </Flex>

      <AnimatePresence>
        {isOpen && (
          <Flex
            as={motion.div}
            variants={menuVariants}
            initial={"initial"}
            animate={"open"}
            exit={"closed"}
            zIndex={"1"}
            position="fixed"
            px="3"
            top="12"
            left={"0"}
            height={"fit-content"}
            width={"100%"}
            boxShadow="lg"
            backgroundColor={bgColor2}
            backdropFilter="saturate(180%) blur(15px)"
            flexDirection={"column"}
            justifyContent={"space-between"}
            //gap={"5"}
          >
            <Flex
              flexDirection={
                config.ux.menu.useAccordionOnMobile ? "column" : "column"
              }
              justifyContent={"center"}
              py={6}
              //w={"100%"}
              gap={3}
            >
              <Flex mb={"auto"} justifyContent={"space-between"}>
                <Flex
                  flexDirection={"row"}
                  height={"fit-content"}
                  my={"auto"}
                  ml={1}
                >
                  <ColorModeSwitch small />
                </Flex>
                <Spacer />
                <Flex
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  height={"fit-content"}
                  alignContent={"center"}
                  ml={1}
                >
                  <BrandSVG width={"24"} alignSelf={"flex-start"} />
                </Flex>
                <Spacer mr={10} />
              </Flex>
              <NavigationOptions config={config} navigation={"mobile"} />
            </Flex>
          </Flex>
        )}
      </AnimatePresence>

      <Box pt="14">{children}</Box>
    </>
  );
}
