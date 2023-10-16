import { Box, chakra, useColorModeValue } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const path01Variants = {
  open: { d: "M3.06061 2.99999L21.0606 21" },
  closed: { d: "M0 7L24 7" },
};

const path02Variants = {
  open: { d: "M3.00006 21.0607L21 3.06064" },
  moving: { d: "M0 12L24 12" },
  closed: { d: "M0 12L24 12" },
};

const path03Variants = {
  open: { d: "M3.00006 21.0607L21 3.06064" },
  moving: { d: "M0 17L24 17" },
  closed: { d: "M0 17L24 17" },
};

export default function HamburgerIcon({ setOpen, onClickFn, ...props }) {
  const path01Controls = useAnimation();
  const path02Controls = useAnimation();
  const path03Controls = useAnimation();

  useEffect(() => {
    const performAnimation = async () => {
      if (!setOpen) {
        path02Controls.start(path02Variants.moving);
        path03Controls.start(path03Variants.moving);
        path01Controls.start(path01Variants.open);
        path02Controls.start(path02Variants.open);
        path03Controls.start(path02Variants.open);
      } else {
        path01Controls.start(path01Variants.closed);
        path02Controls.start(path02Variants.moving);
        path03Controls.start(path03Variants.moving);
        path02Controls.start(path02Variants.closed);
        path03Controls.start(path03Variants.closed);
      }
    };
    performAnimation();
  }, [path01Controls, path02Controls, path03Controls, setOpen]);

  return (
    <Box
      height={"0"}
      width={"12"}
      onClick={onClickFn}
      _hover={{
        cursor: "pointer",
      }}
      {...props}
    >
      <chakra.svg
        as={motion.svg}
        mt={2}
        h={10}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke={useColorModeValue("brand.900", "brand.50")}
      >
        <motion.path
          {...path01Variants.closed}
          animate={path01Controls}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          {...path02Variants.closed}
          animate={path02Controls}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          {...path03Variants.closed}
          animate={path03Controls}
          transition={{ duration: 0.2 }}
        />
      </chakra.svg>
    </Box>
  );
};
