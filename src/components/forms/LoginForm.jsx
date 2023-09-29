import { Flex, VStack } from "@chakra-ui/react";
import { getCsrfToken } from "next-auth/react";
import CustomAnimatedPresence from "../layouts/DefaultAnimatedPresence";
import { InputBox } from "./InputBox";
import { PasswordInputBox } from "./PasswordInputBox";
import SubmitBtn from "./SubmitBtn";

export default function LoginForm({
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
      <VStack {...props}>
        <CustomAnimatedPresence variant={animationVariants}>
          <InputBox
            showHelperTextBtn
            required="Obrigatório"
            id="username"
            label="Usuário"
            helperText="O nome de usuário deve haver 3 caracteres ou mais."
            formControl={formHook.control}
          />
          <PasswordInputBox
            showHelperTextBtn
            required="Obrigatório"
            label="Senha"
            id="password"
            helperText="A senha deve possuir de 3 a 12 caracteres."
            formControl={formHook.control}
          />
          <Flex p={6} flexDirection={"row"} justifyContent={"center"}>
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
      </VStack>
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
