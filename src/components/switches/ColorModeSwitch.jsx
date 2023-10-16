import {
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ColorModeSwitch({ small, ...props }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isHover, setIsHover] = useState(false);

  const performColorSwitching = () => {
    toggleColorMode();
    const styleEl = document.createElement("style");
    const cssText = document.createTextNode(
      "html * { transition: color, background-color 350ms ease-out!important }"
    );
    styleEl.appendChild(cssText);
    document.head.appendChild(styleEl);
    setTimeout(() => {
      document.head.removeChild(styleEl);
    }, 350);
  };

  const buttonVariants = {
    light: {
      x: small ? "10px" : "13px",
      transition: {
        duration: 0.25,
      },
    },
    dark: {
      x: small ? "-10px" : "-13px",
      transition: {
        duration: 0.25,
      },
    },
  };

  const sunVariants = {
    hovered: {
      scale: 1,
      rotate: 45,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
    notHovered: { scale: 1 },
  };

  const moonVariants = {
    hovered: {
      scale: 1.2,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5,
      },
    },
    notHovered: {
      scale: 1,
    },
  };

  return (
    <Button
      as={motion.button}
      whileHover={{
        scale: 1.1,
      }}
      onClick={() => performColorSwitching()}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      rounded="full"
      size={small ? "xs" : "md"}
      w={small ? 7 : 12}
      h={small ? 4 : 6}
      alignItems="center"
      m={0}
      tabIndex="-1"
      _focus={{ outline: "none" }}
      _hover={{
        bg: useColorModeValue("brand.900", "yellow.400"),
      }}
      bg={useColorModeValue("brand.900", "yellow.400")}
      shadow="2xl"
      my={"auto"}
      {...props}
    >
      <Flex
        as={motion.div}
        initial={useColorModeValue("light", "dark")}
        animate={useColorModeValue("light", "dark")}
        variants={buttonVariants}
        w={small ? 4 : 6}
        h={small ? 4 : 6}
        position="absolute"
        p={1}
        bg={useColorModeValue("yellow.400", "brand.900")}
        rounded="full"
        transform="auto"
        alignItems="center"
        justifyContent="center"
        color="white"
        shadow="revert"
      >
        {useColorModeValue(
          <motion.div
            key="sunBtn"
            animate={isHover ? "hovered" : "notHovered"}
            transition={
              isHover
                ? {
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }
                : {}
            }
            variants={sunVariants}
          >
            <FiSun />
          </motion.div>,
          <motion.div
            key="moonBtn"
            animate={isHover ? "hovered" : "notHovered"}
            variants={moonVariants}
          >
            <FiMoon />
          </motion.div>
        )}
      </Flex>
    </Button>
  );
}
