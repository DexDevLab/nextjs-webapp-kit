import LoginForm from "@/components/forms/LoginForm";
import RecoveryForm from "@/components/forms/RecoveryForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { useCustomForm } from "@/components/hooks/useCustomForm";
import BrandSVG from "@/components/images/BrandSVG";
import BackgroundLayout from "@/components/layouts/BackgroundLayout";
import Hyperlink from "@/components/navigation/Hyperlink";
import ColorModeSwitch from "@/components/switches/ColorModeSwitch";
import { customToastEmitter } from "@/components/toasts/customToastEmitter";
import { exceptionHandler } from "@/utils/exceptionHandler";
import {
  Box,
  Flex,
  Heading,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";

export default function Signin({ config, csrfToken, ...pageProps }) {
  const [session, setSession] = useState({});
  const [recover, setRecover] = useState(false);
  const [register, setRegister] = useState(false);
  const [animate, setAnimate] = useState(false);
  const router = useRouter();
  const signInForm = useCustomForm();
  const recoveryForm = useCustomForm();
  const registerForm = useCustomForm();

  const color = useColorModeValue("whiteAlpha.800", "blackAlpha.800");

  const submitFn = async (formData, e) => {
    e.preventDefault();
    signInForm.setLoading();
    formData.redirect = false;
    signIn("appCredentials", formData)
      .then(async ({ status, error, ...data }) => {
        if (status === 401) {
          const exception = exceptionHandler({
            status,
            error,
            message: data,
          });
          exception.title = "Falha no login";
          exception.description = "Nome de usuário ou senha incorretos";
          exception.autoClose = 3000;
          exception.closeButton = true;
          exception.transition = "fadeInForward";
          setTimeout(() => {
            customToastEmitter(exception);
          }, 500);
        }
        if (status === 200) {
          const session = await getSession();
          setSession(session);
          setTimeout(() => {
            customToastEmitter({
              title: `Olá, ${session.user.name}`,
              description: "Autenticação efetuada com sucesso",
              status: "success",
              autoClose: 1000,
              closeButton: false,
              onClose: setTimeout(() => {
                router.push("../");
              }, 1500),
            });
          }, 500);
        }
      })
      .catch((error) => {
        customToastEmitter(exceptionHandler(error));
      })
      .finally(
        setTimeout(() => {
          signInForm.setLoaded();
        }, 500)
      );
  };

  const recoverySubmitFn = async (formData, e) => {
    e.preventDefault();
    setAnimate(true);
    recoveryForm.setLoading();
    formData.redirect = false;

    // SUBMIT LOGIC GOES HERE

    setTimeout(() => {
      recoveryForm.setLoaded();
    }, 1000);

    setTimeout(() => {
      customToastEmitter({
        title: `Conta criada com sucesso!`,
        description: "",
        status: "success",
        autoClose: 1000,
        closeButton: false,
        onClose: setTimeout(() => {
          setAnimate(false);
        }, 2000),
      });
    }, 1000);
  };

  const registerSubmitFn = async (formData, e) => {
    e.preventDefault();
    setAnimate(true);
    registerForm.setLoading();
    formData.redirect = false;

    // SUBMIT LOGIC GOES HERE

    setTimeout(() => {
      registerForm.setLoaded();
    }, 1000);

    setTimeout(() => {
      customToastEmitter({
        title: `Conta criada com sucesso!`,
        description: "",
        status: "success",
        autoClose: 1000,
        closeButton: false,
        onClose: setTimeout(() => {
          setAnimate(false);
        }, 2000),
      });
    }, 1000);
  };

  useEffect(() => {
    if (recover || register) {
      recoveryForm.closeOverlay();
      signInForm.closeOverlay();
      registerForm.closeOverlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recover, register]);

  return (
    <BackgroundLayout imgSrc={"/background3.jpg"}>
      <Flex
        position={"absolute"}
        right={"0"}
        w="16"
        ml="auto"
        h="auto"
        flexDir={"row"}
      >
        <ColorModeSwitch />
      </Flex>
      <Flex
        zIndex={"modal"}
        h={"maxVh"}
        position={["unset", "unset", "unset", "fixed"]}
        justifyContent={["center", "center", "center", "flex-start"]}
      >
        {!recover && !register && (
          <VStack
            as={motion.div}
            key={"login"}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                ease: "easeIn",
                duration: 0.3,
                delay: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                ease: "easeOut",
                duration: 0.3,
              },
            }}
            borderRadius={"3xl"}
            bg={color}
            m="10"
            p="10"
            //h="100%"
            w={"fit-content"}
          >
            <Box
              alignSelf={"flex-start"}
              as={motion.div}
              exit={{
                opacity: 0,
                //display: "none",
                transition: {
                  ease: "easeOut",
                  duration: 0.3,
                },
              }}
            >
              <BrandSVG width={"24"} alignSelf={"flex-start"} />
            </Box>
            <VStack
              key={"loginDiv"}
              h="100%"
              pt="24"
              as={motion.div}
              exit={{
                opacity: 0,
                //display: "none",
                transition: {
                  ease: "easeOut",
                  duration: 0.3,
                },
              }}
            >
              <Heading as={"h2"} pb="2" size={"lg"}>
                {config.meta.title}
              </Heading>
              <Heading as={"h5"} pb="2" size={"sm"}>
                Faça o Login para continuar
              </Heading>
              <Flex
                flexDir={"column"}
                justifyContent={"space-between"}
                h="100%"
              >
                <LoginForm
                  formHook={signInForm}
                  submitFn={submitFn}
                  isDisabled={session.user}
                  animateFormButton={session.user}
                  formButtonLabel={
                    session.user ? <FiCheck size={32} /> : "Login"
                  }
                />
                <VStack>
                  <Heading as={"h5"} alignSelf={"flex-start"} fontSize={"10"}>
                    Esqueceu a senha?{" "}
                    <Hyperlink onClick={() => setRecover(!recover)}>
                      Recuperar credenciais
                    </Hyperlink>
                  </Heading>
                  <Heading as={"h5"} alignSelf={"flex-start"} fontSize={"10"}>
                    Não é usuário?{" "}
                    <Hyperlink onClick={() => setRegister(!register)}>
                      Cadastre-se
                    </Hyperlink>
                  </Heading>
                </VStack>
              </Flex>
            </VStack>
          </VStack>
        )}
        {recover && (
          <VStack
            as={motion.div}
            key={"recover"}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                ease: "easeIn",
                duration: 0.5,
                delay: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                ease: "easeOut",
                duration: 0.3,
              },
            }}
            borderRadius={"3xl"}
            bg={color}
            m="10"
            p="10"
            //h="100%"
            w={"fit-content"}
          >
            <Box
              alignSelf={"flex-start"}
              as={motion.div}
              exit={{
                opacity: 0,
                //display: "none",
                transition: {
                  ease: "easeOut",
                  duration: 0.3,
                },
              }}
            >
              <BrandSVG width={"24"} alignSelf={"flex-start"} />
            </Box>
            <VStack
              h="100%"
              pt={["10", "24", "24", "24"]}
              as={motion.div}
              key={"recoverDiv"}
              exit={{
                opacity: 0,
                //display: "none",
                transition: {
                  ease: "easeOut",
                  duration: 0.3,
                },
              }}
            >
              <Heading as={"h2"} size={"lg"} pb={["20", "20", "20", "20"]}>
                Recuperação de Credenciais
              </Heading>
              <Heading as={"h5"} pb="8" size={"md"}>
                Digite o email vinculado ao seu perfil
              </Heading>
              <Heading
                as={"h6"}
                pb="4"
                size={"xs"}
                width={["100%", "100%", "50%", "50%"]}
              >
                Você receberá uma mensagem com instruções para redefinição de
                senha
              </Heading>
              <Flex
                flexDir={"column"}
                justifyContent={"space-between"}
                h="100%"
                width={"100%"}
              >
                <RecoveryForm
                  formHook={recoveryForm}
                  submitFn={recoverySubmitFn}
                  animateFormButton={animate}
                  formButtonLabel={animate ? <FiCheck size={32} /> : "Enviar"}
                />
                <Heading as={"h5"} alignSelf={"flex-start"} fontSize={"10"}>
                  Voltar para o{" "}
                  <Hyperlink onClick={() => setRecover(!recover)}>
                    Login
                  </Hyperlink>
                </Heading>
              </Flex>
            </VStack>
          </VStack>
        )}
        {register && (
          <VStack
            as={motion.div}
            key={"register"}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                ease: "easeIn",
                duration: 0.5,
                delay: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                ease: "easeOut",
                duration: 0.3,
              },
            }}
            borderRadius={"3xl"}
            bg={color}
            m="10"
            p={["4", "10", "10", "10"]}
            //h="100%"
            w={"fit-content"}
          >
            <Box
              alignSelf={"flex-start"}
              as={motion.div}
              exit={{
                opacity: 0,
                //display: "none",
                transition: {
                  ease: "easeOut",
                  duration: 0.3,
                },
              }}
            >
              <BrandSVG w={["0", "24", "24", "24"]} alignSelf={"flex-start"} />
            </Box>
            <VStack
              h="100%"
              pt={["0", "10", "10", "10"]}
              as={motion.div}
              key={"registerDiv"}
              exit={{
                opacity: 0,
                //display: "none",
                transition: {
                  ease: "easeOut",
                  duration: 0.3,
                },
              }}
            >
              <Heading as={"h2"} size={"lg"} pb={["0", "10", "10", "10"]}>
                Cadastro
              </Heading>
              <Heading as={"h5"} pb={["0", "8", "8", "8"]} size={"sm"}>
                Crie sua conta para acessar a plataforma
              </Heading>
              <Flex
                flexDir={"column"}
                justifyContent={"space-between"}
                h="100%"
                width={"100%"}
              >
                <RegisterForm
                  formHook={registerForm}
                  submitFn={registerSubmitFn}
                  animateFormButton={animate}
                  formButtonLabel={
                    animate ? <FiCheck size={32} /> : "Criar conta"
                  }
                />
                <VStack pb={["4", "0", "0", "0"]}>
                  <Heading as={"h5"} alignSelf={"flex-start"} fontSize={"10"}>
                    Esqueceu a senha?{" "}
                    <Hyperlink
                      onClick={() => {
                        setRegister(!register);
                        setRecover(!recover);
                      }}
                    >
                      Recuperar credenciais
                    </Hyperlink>
                  </Heading>
                  <Heading as={"h5"} alignSelf={"flex-start"} fontSize={"10"}>
                    Já possui cadastro? Voltar para o{" "}
                    <Hyperlink onClick={() => setRegister(!register)} />
                    Login
                  </Heading>
                </VStack>
              </Flex>
            </VStack>
          </VStack>
        )}
      </Flex>
    </BackgroundLayout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      cookies: context.req.headers.cookie ?? "",
      pageTitle: "Login",
      csrfToken: await getCsrfToken(context),
    },
  };
}
