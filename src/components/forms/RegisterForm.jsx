import { Flex, VStack } from "@chakra-ui/react";
import { getCsrfToken } from "next-auth/react";
import CustomAnimatedPresence from "../layouts/DefaultAnimatedPresence";
import { InputBox } from "./InputBox";
import { PasswordInputBox } from "./PasswordInputBox";
import SubmitBtn from "./SubmitBtn";

export default function RegisterForm({
  csrfToken,
  formHook,
  submitFn,
  isDisabled,
  animateFormButton,
  formButtonLabel,
  ...props
}) {
  const animationVariants = {
    initial: {
      opacity: 0,
    },
    loaded: {
      opacity: 1,
      transition: {
        ease: "anticipate",
        duration: 1,
        when: "beforeChildren",
        staggerChildren: 0.4,
      },
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <form onSubmit={formHook.handleSubmit(submitFn)}>
      <CustomAnimatedPresence variant={animationVariants}>
        <InputBox
          w={["100%", "50%", "50%", "50%"]}
          showHelperTextBtn
          required="Obrigatório"
          id="profilename"
          label="Nome de Exibição"
          helperText="O nome de exibição deve haver 3 caracteres ou mais e não deve possuir símbolos."
          formControl={formHook.control}
        />
        <VStack
          as={Flex}
          flexDir={["column", "row", "row", "row"]}
          alignContent={"baseline"}
          {...props}
        >
          <InputBox
            w={["100%", "50%", "50%", "50%"]}
            h={["fit-content", "32", "32", "32"]}
            showHelperTextBtn
            required="Obrigatório"
            id="username"
            label="Usuário"
            helperText="O nome de usuário deve haver 3 caracteres ou mais."
            formControl={formHook.control}
          />
          <PasswordInputBox
            h={["fit-content", "32", "32", "32"]}
            showHelperTextBtn
            required="Obrigatório"
            label="Senha"
            id="password"
            helperText="A senha deve possuir de 3 a 12 caracteres."
            formControl={formHook.control}
          />
        </VStack>
        <Flex p={4} flexDirection={"row"} justifyContent={"center"}>
          <SubmitBtn
            type="submit"
            isLoading={formHook.isLoading}
            isDisabled={isDisabled}
            animateOnSuccess={animateFormButton}
          >
            {formButtonLabel}
          </SubmitBtn>
        </Flex>
      </CustomAnimatedPresence>
    </form>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
