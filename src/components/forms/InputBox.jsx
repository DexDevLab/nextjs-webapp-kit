import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  Skeleton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import _ from "lodash";
import { useEffect, useState } from "react";
import { AiFillBulb } from "react-icons/ai";

/**
 * Cria uma Inpux Box multiuso.
 * @method InputBox
 * @memberof module:Inputs
 * @param {String} id id do formulário
 * @param {Object} errors manipula as mensagens de erro
 * @param {String} label label do formulário
 * @param {String} type tipo de formulário
 * @param {String} placeholder tipo de placeholder a ser colocado
 * como exemplo
 * @param {Object} register define parâmetros de register
 * @param {*} required marca a Box como um campo obrigatório (true)
 * ou opcional (false) (padrão: "Obrigatório" - força o campo como
 * obrigatório, com o texto "Obrigatório")
 * @param {Object} validate define os critérios da validação do campo
 * @param {Boolean} isLoaded realiza a animação diretamente (true) ou
 * não. Caso seja colocado em false, deve ser transmitido um valor para
 * realizar o carregamento do Skeleton (padrão: true - ativa a animação
 * automaticamente)
 * @param {Function} onChange transmite um callback após a validação
 * do campo
 * @param {Object} value dados do formulário. Pode ser utilizado juntamente
 * com setValue para receber os valores por meio de função
 * @param {Function} setValue provê uma função que entrega dados do
 * formulário, de acordo com seu id.
 * @returns {Component} componente de Input Box
 */
export function InputBox({
  id,
  formControl: {
    clearErrors,
    trigger,
    formState: { errors },
    register,
    setValue,
  },
  label,
  type,
  placeholder,
  w = "xs",
  h,
  mx,
  required = true,
  pattern,
  validate,
  isLoaded = true,
  setMask,
  defaultValue,
  shadow = "md",
  colorScheme = "brand",
  helperText = required,
  showHelperTextBtn,
  ...props
}) {
  const [helperTextToggled, setHelperTextToggled] = useState(false);
  const [helperTextHovered, setHelperTextHovered] = useState(false);

  const helperTextVariants = {
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
    toggled: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    notToggled: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(id, defaultValue);
      trigger(id);
    }
  }, [defaultValue, id, setValue, trigger]);

  useEffect(() => {
    if (!_.isUndefined(errors[id])) {
      setHelperTextToggled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, id, errors[id]]);

  return (
    <Box px={0.5} py={3} 
    w={w}
    h={h} mx={mx}>
      <FormControl id={id} isInvalid={errors[id]}>
        <motion.div key="formLabel" layout>
          <Flex
            justifyContent={"space-between"}
            alignContent={"center"}
            alignItems={"center"}
            flexDirection={"row"}
          >
            <FormLabel>{label}</FormLabel>
            {showHelperTextBtn && (
              <motion.div
                layout
                key="icon-bulb"
                animate={helperTextHovered ? "hovered" : "notHovered"}
                variants={helperTextVariants}
              >
                <Icon
                  onMouseOver={() => setHelperTextHovered(true)}
                  onMouseLeave={() => setHelperTextHovered(false)}
                  cursor="pointer"
                  color={(helperTextToggled || helperTextHovered) && "yellow"}
                  onClick={() => {
                    setHelperTextToggled(!helperTextToggled);
                    clearErrors(id);
                  }}
                  as={AiFillBulb}
                />
              </motion.div>
            )}
          </Flex>
        </motion.div>
        <Skeleton
          isLoaded={isLoaded}
          fadeDuration={0.5}
          rounded="lg"
          shadow={!isLoaded && "inner"}
        >
          {/* <Flex alignItems="center" gap="1"> */}
          <motion.div key="inputs" layout>
            <InputGroup>
              <Input
                //w={w}
                type={type}
                placeholder={placeholder}
                {...register(id, {
                  required: required,
                  pattern: pattern,
                  validate: validate,
                  onChange: (e) =>
                    setValue(
                      id,
                      setMask ? setMask(e.target.value) : e.target.value
                    ),
                })}
                shadow={shadow}
                colorScheme={colorScheme}
                onMouseEnter={() => !pattern && clearErrors(id)}
                onMouseLeave={() => clearErrors(id)}
                {...props}
              />
            </InputGroup>
          </motion.div>
          {/* </Flex> */}
        </Skeleton>
        <Box pl="2" pr="1" pt="0" w="64">
          {helperTextToggled ? (
            <motion.div
              key="textBox"
              initial={{ opacity: 0 }}
              animate={helperTextToggled ? "toggled" : "notToggled"}
              variants={helperTextVariants}
            >
              <FormHelperText fontSize="12px">{helperText}</FormHelperText>
            </motion.div>
          ) : (
            <motion.div
              key="errorBox"
              initial={{ opacity: 0 }}
              animate={
                !helperTextToggled || !showHelperTextBtn
                  ? "toggled"
                  : "notToggled"
              }
              variants={helperTextVariants}
            >
              <FormErrorMessage fontSize="12px">
                {pattern && _.isEmpty(errors[id]?.message)
                  ? "Inválido. Verifique o campo digitado."
                  : errors[id]?.message}
              </FormErrorMessage>
            </motion.div>
          )}
        </Box>
      </FormControl>
    </Box>
  );
}
