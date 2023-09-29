import { Box, Container } from "@chakra-ui/react";
import { useEffect } from "react";
import useDimensions from "../hooks/useDimensions";

export default function BackgroundLayout({ children, imgSrc, ...props }) {
  const {height, width} = useDimensions();

  const imgSrcProps = (imgSrc) => {
    if (imgSrc) {
      return {
        pos: "relative",
        opacity: 0.9,
        content: "",
        bgImage: `url(${imgSrc})`,
        bgSize: "cover",
        bgRepeat: "no-repeat",
        bgPos: "center",
        top: 0,
        left: 0,
      };
    }
  };

  return (
    <Box
      //minH={"maxVh"}
      //minW="full"
      minH={height}
      minW={width}
      p="0"
      m="0"
      {...imgSrcProps(imgSrc)}
      {...props}
    >
      {children}
    </Box>
  );
}
