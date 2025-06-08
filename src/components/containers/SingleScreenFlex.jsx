import { Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCustomBreakpointProvider } from "../hooks/useCustomBreakpointProvider";
import useDimensions from "../hooks/useDimensions";

/**
 * Cria uma Inpux Box multiuso.
 * @method InputBox
 * @memberof module:Inputs
 * @param {String} id id do formulÃ¡rio
 * @param {Object} errors manipula as mensagens de erro
 * @param {String} label label do formulÃ¡rio
 * @param {String} type tipo de formulÃ¡rio
 * @param {String} placeholder tipo de placeholder a ser colocado
 * como exemplo
 * @param {Object} register define parÃ¢metros de register
 * @param {*} required marca a Box como um campo obrigatÃ³rio (true)
 * ou opcional (false) (padrÃ£o: "ObrigatÃ³rio" - forÃ§a o campo como
 * obrigatÃ³rio, com o texto "ObrigatÃ³rio")
 * @param {Object} validate define os critÃ©rios da validaÃ§Ã£o do campo
 * @param {Boolean} isLoaded realiza a animaÃ§Ã£o diretamente (true) ou
 * nÃ£o. Caso seja colocado em false, deve ser transmitido um valor para
 * realizar o carregamento do Skeleton (padrÃ£o: true - ativa a animaÃ§Ã£o
 * automaticamente)
 * @param {Function} onChange transmite um callback apÃ³s a validaÃ§Ã£o
 * do campo
 * @param {Object} value dados do formulÃ¡rio. Pode ser utilizado juntamente
 * com setValue para receber os valores por meio de funÃ§Ã£o
 * @param {Function} setValue provÃª uma funÃ§Ã£o que entrega dados do
 * formulÃ¡rio, de acordo com seu id.
 * @returns {Component} componente de Input Box
 */
export function SingleScreenFlex({ children, scrollable, ...props }) {
  const { height, width } = useDimensions();
  const breakpoint = useCustomBreakpointProvider();
  const navbarHeight = "55";
  const flexHeight = Number(height) - Number(navbarHeight);

  const animationVariants = {
    initial: {
      opacity: 0,
    },
    loaded: {
      opacity: 1,
      transition: {
        ease: "anticipate",
        duration: 1.5,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      <Flex
        as={motion.div}
        initial={"initial"}
        animate={"loaded"}
        exit={"exit"}
        variants={animationVariants}
        height={
          breakpoint == "sm" || (breakpoint == "md" && scrollable)
            ? "full"
            : flexHeight
        }
        {...props}
      >
        {children}
      </Flex>
    </AnimatePresence>
  );
}
