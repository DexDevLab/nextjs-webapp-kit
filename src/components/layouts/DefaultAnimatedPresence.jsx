import { AnimatePresence, motion } from "framer-motion";

export default function DefaultAnimatedPresence({
  children,
  variant,
  ...props
}) {
  const animationVariants = {
    initial: {
      opacity: 0.15,
    },
    loaded: {
      opacity: 1,
      transition: {
        ease: "anticipate",
        duration: 0.45,
      },
    },
    exit: {
      opacity: 0.15,
      transition: {
        ease: "anticipate",
        duration: 0.45,
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={"initial"}
        animate={"loaded"}
        exit={"exit"}
        variants={variant || animationVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
