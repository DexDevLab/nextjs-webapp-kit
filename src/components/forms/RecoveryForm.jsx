import { regex } from "@/utils/regex";
import { Flex, VStack } from "@chakra-ui/react";
import { getCsrfToken } from "next-auth/react";
import CustomAnimatedPresence from "../layouts/DefaultAnimatedPresence";
import { InputBox } from "./InputBox";
import SubmitBtn from "./SubmitBtn";

export default function RecoveryForm({
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
            pattern={regex.email}
            showHelperTextBtn={false}
            required="Obrigatório"
            id="email"
            label="Email"
            placeholder="usuario@email.com"
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
