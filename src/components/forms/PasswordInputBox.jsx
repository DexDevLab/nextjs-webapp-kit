import { config } from "@/utils/webappconfig";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  useColorModeValue,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { forwardRef, useEffect, useRef, useState } from "react";
import { AiFillBulb } from "react-icons/ai";
import { HiEye, HiEyeOff } from "react-icons/hi";

/**
 * Cria uma Inpux Box de senha.
 * @method PasswordInputBox
 * @memberof module:Inputs
 * @param {String} id id do formulário
 * @param {Function} errors manipula as mensagens de erro
 * @param {Object} register define parâmetros de register
 * @param {*} required marca a Box como um campo obrigatório (true)
 * ou opcional (false) (padrão: "Obrigatório" - força o campo como
 * obrigatório, com o texto "Obrigatório")
 * @param {Object} validate validação
 * @param {Function} onChange transmite um callback após a validação
 * do campo
 * @returns {Component} componente estilizado com máscara
 */
export const PasswordInputBox = forwardRef(
  (
    {
      id,
      formControl: {
        clearErrors,
        trigger,
        formState: { errors },
        register,
        setValue,
      },
      w = "xxs",
      h,
      label,
      required = false,
      validate,
      isLoaded = true,
      onChange,
      shadow = "md",
      colorScheme = "brand",
      helperText = required,
      showHelperTextBtn,
      ...props
    },
    ref
  ) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef(null);
    const mergeRef = useMergeRefs(inputRef, ref);
    const [helperTextToggled, setHelperTextToggled] = useState(false);
    const [helperTextHovered, setHelperTextHovered] = useState(false);
    const [eyeIconHovered, setEyeIconHovered] = useState(false);
    const { lightModeFontColor, darkModeFontColor } = config.theming;

    const iconVariants = {
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
        transition: {
          repeat: 0,
          repeatType: "reverse",
          duration: 0.5,
        },
      },
      notToggled: {
        opacity: 0,
      },
    };

    const onClickReveal = () => {
      onToggle();

      if (inputRef.current) {
        inputRef.current.focus({
          preventScroll: true,
        });
      }
    };

    useEffect(() => {
      if (!_.isUndefined(errors[id])) {
        setHelperTextToggled(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors, id, errors[id]]);

    return (
      <Box px={0.5} py={3} w={w} h={h}>
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
                  variants={iconVariants}
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
            <motion.div key="inputs" layout>
              <InputGroup>
                <InputRightElement>
                  <motion.div
                    layout
                    key="icon"
                    animate={eyeIconHovered ? "hovered" : "notHovered"}
                    variants={iconVariants}
                  >
                    <IconButton
                      tabIndex="-1"
                      key="icon-eye"
                      onMouseOver={() => setEyeIconHovered(true)}
                      onMouseLeave={() => setEyeIconHovered(false)}
                      variant="link"
                      aria-label={isOpen ? "Mask password" : "Reveal password"}
                      color={useColorModeValue(
                        lightModeFontColor,
                        darkModeFontColor
                      )}
                      icon={isOpen ? <HiEyeOff /> : <HiEye />}
                      onClick={onClickReveal}
                      _focus={{ background: "transparent" }}
                    />
                  </motion.div>
                </InputRightElement>
                <Input
                  ref={mergeRef}
                  type={isOpen ? "text" : "password"}
                  autoComplete="current-password"
                  {...register(id, {
                    required: required,
                    validate: validate,
                    onChange: onChange,
                  })}
                  shadow={shadow}
                  onMouseEnter={() => clearErrors(id)}
                  onMouseLeave={() => clearErrors(id)}
                  {...props}
                />
              </InputGroup>
            </motion.div>
          </Skeleton>
          <Box pl="2" pr="1" pt="0" w="64">
            {helperTextToggled ? (
              <motion.div
                key="textBox"
                initial={{ opacity: 0 }}
                animate={helperTextToggled ? "toggled" : "notToggled"}
                variants={iconVariants}
              >
                <FormHelperText fontSize="12px">{helperText}</FormHelperText>
              </motion.div>
            ) : (
              <motion.div
                key="errorBox"
                initial={{ opacity: 0 }}
                animate={"toggled"}
                variants={iconVariants}
              >
                <FormErrorMessage fontSize="12px">
                  {errors[id]?.message}
                </FormErrorMessage>
              </motion.div>
            )}
          </Box>
        </FormControl>
      </Box>
    );
  }
);
PasswordInputBox.displayName = "PasswordField";
