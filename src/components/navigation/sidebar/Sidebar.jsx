import useDimensions from "@/components/hooks/useDimensions";
import BrandSVG from "@/components/images/BrandSVG";
import ColorModeSwitch from "@/components/switches/ColorModeSwitch";
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
import { BsBoxArrowRight } from "react-icons/bs";
import NavigationOptions from "../navbar/NavigationOptions";

export default function Sidebar({ config, session, children, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { height, width } = useDimensions();

  const bgColor = useColorModeValue(
    "rgba(255,255, 255, 0.6)",
    "rgba(45, 55, 72, 0.7)"
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
                <Icon color={hover} boxSize={"8"} as={BsBoxArrowRight}></Icon>
              </Flex>
            </Flex>
          )}
        </AnimatePresence>

        <Box>
          {/* <Button onClick={onClose}>Open</Button> */}
          <ColorModeSwitch></ColorModeSwitch>
          {children}
        </Box>
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
        >
          <DrawerHeader>
            <Flex
              //gap={"2"}
              flexDirection={"row"}
              justifyContent={"center"}
              height={"fit-content"}
              m={"auto"}
              p={5}
            >
              <BrandSVG width={"32"} alignSelf={"center"} />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex
              //gap={"2"}
              flexDirection={"row"}
              justifyContent={"center"}
              height={"fit-content"}
              m={"auto"}
              p={5}
              borderColor={hover}
              borderWidth={"thin"}
            >
              <NavigationOptions config={config} navigation={'sidebar'} />
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
