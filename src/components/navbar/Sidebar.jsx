import useDimensions from "@/components/hooks/useDimensions";
import BrandSVG from "@/components/images/BrandSVG";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { RiMenuUnfoldLine } from "react-icons/ri";
import Searchbar from "../navigation/Searchbar";
import NavigationOptions from "./NavigationOptions";
import ProfileMenuOptions from "./ProfileMenuOptions";

export default function Sidebar({ config, session, children, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { height, width } = useDimensions();

  const bgColor = useColorModeValue(
    "rgba(255,255, 255, 0.75)",
    "rgba(45, 55, 72, 0.85)"
  );

  const hover = useColorModeValue(
    config.theming.lightModeHoverColor,
    config.theming.darkModeHoverColor
  );

  return (
    <>
      <Flex
        //width={"100%"}
        //minW={width}
        //background={"transparent"}
        //backgroundColor={"transparent"}
        flexDirection={"row"}
        justifyContent={"flex-start"}
        //boxShadow="lg"
        //backdropFilter="saturate(180%) blur(15px)"
      >
        <AnimatePresence>
          {!isOpen && (
            <Flex
              as={motion.div}
              initial={{
                x: -40,
                transition: { type: "spring", duration: 0.5, bounce: 0.35 },
              }}
              animate={{
                x: 0,
                transition: { type: "spring", duration: 1, bounce: 0.1 },
              }}
              exit={{
                x: -40,
                transition: { type: "spring", duration: 0.5, bounce: 0.35 },
              }}
              backgroundColor={bgColor}
              boxShadow="lg"
              backdropFilter="saturate(180%) blur(15px)"
              position={"fixed"}
              w={"10"}
              justifyContent={"center"}
              py={1}
              flexDirection={"column"}
              mb={1}
              height={height}
              zIndex={"docked"}
            >
              <Flex
                //backgroundColor={bgColor}
                //boxShadow="lg"
                //backdropFilter="saturate(180%) blur(15px)"
                //w={"10"}
                //h={"10"}
                m={"auto"}
                flexDirection={"row"}
                //rounded={"full"}
                justifyContent={"flex-start"}
                onClick={onOpen}
                _hover={{
                  cursor: "pointer",
                }}
              >
                <Icon color={hover} boxSize={"8"} as={RiMenuUnfoldLine} />
              </Flex>
            </Flex>
          )}
        </AnimatePresence>
        <Box>{children}</Box>
      </Flex>

      <Drawer
        closeOnEsc
        variant="alwaysOpen"
        {...props}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        trapFocus={false}
        closeOnOverlayClick={true}
        blockScrollOnMount={true}
      >
        <DrawerOverlay />
        <DrawerContent
          backgroundColor={bgColor}
          boxShadow="lg"
          backdropFilter="saturate(150%) blur(5px)"
          minW={"60"}
          maxW={"fit-content"}
        >
          <DrawerHeader p={0}>
            <Flex
              gap={"2"}
              flexDirection={"row"}
              justifyContent={"center"}
              height={"fit-content"}
              m={"auto"}
              p={6}
            >
              <BrandSVG width={"32"} alignSelf={"center"} />
            </Flex>
          </DrawerHeader>
          <DrawerBody p={0}>
            <Flex
              flexDirection={"column"}
              justifyContent={"space-around"}
              m={0}
              p={0}
            >
              {config.ux.useSearchBar && <Searchbar isModal config={config} />}
              <NavigationOptions config={config} navigation={"sidebar"} />
            </Flex>
          </DrawerBody>
          {/* <Divider borderColor={hover} /> */}
          <DrawerFooter height={config.profile.enableProfile ? "20" : 10} p={0}>
            {config.profile.enableProfile ? (
              <ProfileMenuOptions
                sidebar
                profileOptions={{ session, ...config }}
              />
            ) : (
              config.auth.hasAuth && (
                <Flex width={"100%"} justifyContent={"center"}>
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
                    fontWeight={"bold"}
                    px={1}
                    pb={1}
                    fontSize={"md"}
                    tabIndex="-1"
                    colorScheme=""
                    variant="link"
                    size={"sm"}
                    onClick={() => {
                      session?.user.name
                        ? signOut()
                        : router.push("/auth/signin");
                    }}
                  >
                    {session?.user.name ? "Sair" : "Login"}
                  </Button>
                </Flex>
              )
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
