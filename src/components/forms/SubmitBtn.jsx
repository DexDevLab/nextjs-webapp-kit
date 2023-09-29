import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export default function SubmitBtn({
  children,
  type,
  isLoading,
  isDisabled,
  animateOnSuccess,
  ...props
}) {
  return (
    <motion.div key="formLabel" layout>
      <Button
        as={motion.button}
        animate={
          animateOnSuccess
            ? {
                borderRadius: "50%",
                width: "40px",
                transition: {
                  ease: "linear",
                  duration: 0.25,
                },
              }
            : {
                width: "auto",
                transition: {
                  ease: "easeOut",
                  duration: 0.1,
                },
              }
        }
        whileHover={{
          opacity: 0.6,
          transition: {
            ease: "easeInOut",
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
        bgColor={animateOnSuccess && "green.400"}
        type={type}
        isLoading={isLoading}
        isDisabled={isDisabled}
        // spinner={
        //   <PulseLoader
        //   size={10}
        //   color={colorMode == "light" ? "#949494" : "white"}
        // />
        // }
        _hover={{
          bgColor: animateOnSuccess && "green.400",
        }}
        {...props}
      >
        {animateOnSuccess ? (
          <motion.div
            key="successDiv"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.25,
                repeat: 0,
                ease: "linear",
              },
            }}
          >
            <FiCheck size={32} />
          </motion.div>
        ) : (
          <>{children}</>
        )}
      </Button>
    </motion.div>
  );
}
