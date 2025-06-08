import { SingleScreenFlex } from "@/components/containers/SingleScreenFlex";
import { InputBox } from "@/components/forms/InputBox";
import SubmitBtn from "@/components/forms/SubmitBtn";
import { useCustomForm } from "@/components/hooks/useCustomForm";
import ChakraMenuIcon from "@/components/icons/ChakraMenuIcon";
import DefaultAnimatedPresence from "@/components/layouts/DefaultAnimatedPresence";
import { customToastEmitter } from "@/components/toasts/customToastEmitter";
import { axiosAPI } from "@/services/apiService";
import { regex } from "@/utils/regex";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  Heading,
  Spacer,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import _ from "lodash";
import { celularMask, cepMask } from "masks-br";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { TfiSave } from "react-icons/tfi";

export default function Profile({ session, config, lockScroll, ...props }) {
  const [avatarHover, setAvatarHover] = useState(false);
  const [userHover, setUserHover] = useState(false);
  const [usernameHover, setUsernameHover] = useState(false);
  const [profileUnlocked, setProfileUnlocked] = useState(false);
  const [cepData, setCepData] = useState("");
  const {
    isOpen: cepIsLoading,
    onOpen: cepSetLoading,
    onClose: cepSetLoaded,
  } = useDisclosure();

  const profileForm = useCustomForm();
  const router = useRouter();
  const { lightModeFontColor, darkModeFontColor } = config.theming;
  const color = useColorModeValue(lightModeFontColor, darkModeFontColor);
  const flexWidth = useBreakpointValue({
    base: "sm",
    sm: "85vw",
    md: "sm",
    lg: "lg",
    xl: "60vw",
  });

  const animationVariants = {
    initial: {
      opacity: 0,
    },
    loaded: {
      opacity: 1,
      transition: {
        ease: "anticipate",
        duration: 2.5,
        //when: "beforeChildren",
        //staggerChildren: 0.4,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  // IMPLEMENTAR LÓGICA PARA OBTER PFP
  const pfp =
    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9";

  const consultaCep = async () => {
    cepSetLoading();
    const cep = profileForm.control.getValues("cep");
    console.log(cep);
    try {
      const buscaCep = await axiosAPI
        .get("/api/ext/cep", {
          params: {
            cep: cep,
          },
        })
        .then(({ data }) => {
          cepSetLoaded();
          const toast = {};
          if (data.status == 200) {
            toast.title = "Endereço localizado!";
            (toast.status = "success"), (toast.autoClose = 1000);
            toast.code = data.status;
            customToastEmitter(toast);
            return data.data;
          } else if (data.status == 404) {
            setCepData(null);
            profileForm.control.setError("cep");
            toast.title = "Endereço não localizado!";
            (toast.status = "error"),
              (toast.description =
                "Verifique o CEP digitado e tente novamente.");
            toast.autoClose = 1000;
            toast.closeButton = true;
            toast.code = data.status;
            customToastEmitter(toast);
          } else {
            toast.title = "Falha durante a busca";
            (toast.status = "error"),
              (toast.description =
                "Ocorreu um erro na API durante a busca dos dados. Aguarde alguns instantes e tente novamente.");
            toast.autoClose = 4000;
            toast.closeButton = true;
            toast.transition = "fadeInForward";
            toast.code = data.status;
            customToastEmitter(toast);
          }
        });
      if (buscaCep) {
        setCepData({
          uf: buscaCep.state,
          cidade: buscaCep.city,
          bairro: buscaCep.neighborhood,
          endereco: buscaCep.street,
        });
      }
    } catch (error) {
      cepSetLoaded();
      setCepData(null);
    }
  };

  const profileSubmitFn = async (formData, e) => {
    if (profileUnlocked) {
      e.preventDefault();
      //setAnimate(true);
      profileForm.setLoading();
      formData.redirect = false;

      // SUBMIT LOGIC GOES HERE

      setTimeout(() => {
        profileForm.setLoaded();
      }, 1000);

      setTimeout(() => {
        customToastEmitter({
          title: `Perfil atualizado!`,
          description: "",
          status: "success",
          autoClose: 1000,
          closeButton: false,
          onClose: setTimeout(() => {
            setProfileUnlocked(false);
          }, 2000),
        });
      }, 1000);
    } else {
      profileForm.setLoading();
      setProfileUnlocked(true);
      setTimeout(() => {
        profileForm.setLoaded();
      }, 150);
    }
  };

  useEffect(() => {
    // LÓGICA PARA REDIRECIONAR PARA 'HOME' CASO O PROFILE NÃO
    // ESTEJA ATIVADO
    if (!config.profile.enableProfile) {
      router.push("../");
    }

    if (profileForm.control.getValues("cep").toString().length > 9) {
    }

    if (_.isNull(cepData)) {
      profileForm.control.resetField("uf");
      profileForm.control.resetField("cidade");
      profileForm.control.resetField("bairro");
      profileForm.control.resetField("endereco");
    }
  });

  return (
    <>
      {config.profile.enableProfile && (
        <SingleScreenFlex
          scrollable={!lockScroll}
          flexDir={"column"}
          justifyContent={"center"}
        >
          <Flex>
            <Heading p={5} as={"h6"}>
              Perfil
            </Heading>
          </Flex>
          <Flex
            m={5}
            p={2}
            boxShadow={"xl"}
            borderRadius={"10px"}
            borderWidth={"2px"}
            borderColor={"brand.900"}
            flexDirection={["column", "column", "row"]}
            justifyContent={"space-between"}
            width={"maxVw"}
            height={"full"}
          >
            <Flex
              my={"auto"}
              alignSelf={"center"}
              justifyContent={"flex-start"}
              flexDirection={"column"}
              width={["sm", "md", "xl"]}
              pt={2}
            >
              <Flex
                onMouseEnter={() => setAvatarHover(true)}
                onMouseLeave={() => setAvatarHover(false)}
                mx={"auto"}
                width={"fit-content"}
                justifyContent={"center"}
                height={"50%"}
              >
                <Avatar
                  size={"3xl"}
                  icon={<AiOutlineUser color={""} fontSize="2rem" />}
                  src={config.profile.profilePicture && pfp}
                />
                <ChakraMenuIcon
                  _hover={{
                    cursor: "pointer",
                  }}
                  icon={avatarHover && FaRegEdit}
                  size={5}
                />
              </Flex>
              <Flex
                width={"100%"}
                justifyContent={"flex-start"}
                height={"50%"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Flex
                  onMouseEnter={() => setUserHover(true)}
                  onMouseLeave={() => setUserHover(false)}
                  justifyContent={"center"}
                >
                  <Heading p={4} as={"h6"}>
                    {session.user.name}
                  </Heading>
                  <ChakraMenuIcon
                    _hover={{
                      cursor: "pointer",
                    }}
                    icon={userHover && FaRegEdit}
                    size={5}
                  />
                </Flex>
                <Flex
                  onMouseEnter={() => setUsernameHover(true)}
                  onMouseLeave={() => setUsernameHover(false)}
                  justifyContent={"center"}
                >
                  <Heading p={2} as={"h6"}>
                    {session.user.username}
                  </Heading>
                  <ChakraMenuIcon
                    _hover={{
                      cursor: "pointer",
                    }}
                    icon={usernameHover && FaRegEdit}
                    size={5}
                  />
                </Flex>
              </Flex>
            </Flex>

            <Flex my={"auto"} justifyContent={"center"}>
              <form onSubmit={profileForm.handleSubmit(profileSubmitFn)}>
                <DefaultAnimatedPresence variant={animationVariants}>
                  <Flex
                    width={flexWidth}
                    justifyContent={"space-between"}
                    borderBottomColor={"brand.900"}
                    borderBottomWidth={"thin"}
                    mt={1}
                    mb={5}
                  >
                    <Heading pt={1.5} as={"h6"} size={"md"}>
                      Dados Pessoais
                    </Heading>
                    <Flex pb={1}>
                      <SubmitBtn
                        type="submit"
                        isLoading={profileForm.isLoading}
                        bgColor={"transparent"}
                        color={color}
                      >
                        <ChakraMenuIcon
                          _hover={{
                            cursor: "pointer",
                          }}
                          icon={profileUnlocked ? TfiSave : FaRegEdit}
                          size={5}
                          color={color}
                        />
                      </SubmitBtn>
                    </Flex>
                  </Flex>

                  <Flex
                    width={flexWidth}
                    justifyContent={"flex-start"}
                    flexDirection={"column"}
                  >
                    <Flex
                      width={flexWidth}
                      justifyContent={"flex-start"}
                      flexDirection={["column", "column", "column", "row"]}
                      gap={1}
                      flexWrap={"wrap"}
                    >
                      <InputBox
                        id={"profilename"}
                        label={"Nome Completo"}
                        helperText={
                          "O nome de exibição deve haver 3 caracteres ou mais e nÃ£o deve possuir símbolos."
                        }
                        formControl={profileForm.control}
                        required={false}
                        mx={0}
                        w={"80"}
                      />
                      <InputBox
                        id={"email"}
                        label={"Email"}
                        formControl={profileForm.control}
                        required={true}
                        pattern={regex.email}
                        mx={0}
                        w={"80"}
                      />
                      <InputBox
                        id={"telefone"}
                        label={"Telefone"}
                        formControl={profileForm.control}
                        required={false}
                        pattern={regex.celular}
                        setMask={celularMask}
                        mx={0}
                        w={"52"}
                      />
                    </Flex>
                    <Flex
                      width={flexWidth}
                      justifyContent={"flex-start"}
                      flexDirection={["column", "column", "column", "row"]}
                      gap={1}
                    >
                      <Flex flexDirection={"row"} gap={1}>
                        <InputBox
                          id={"cep"}
                          label={"CEP"}
                          formControl={profileForm.control}
                          required={false}
                          mx={0}
                          w={"32"}
                          pattern={regex.cep}
                          setMask={cepMask}
                        />
                        <SubmitBtn
                          mt={"44px"}
                          isLoading={cepIsLoading}
                          onClick={() => consultaCep()}
                        >
                          <ChakraMenuIcon icon={Search2Icon} size={5} />
                        </SubmitBtn>
                      </Flex>

                      <InputBox
                        mx={0}
                        id={"endereco"}
                        label={"Endereço"}
                        w={["sm", "sm", "sm", "md", "2xl"]}
                        formControl={profileForm.control}
                        defaultValue={cepData?.endereco}
                        required={false}
                      />
                    </Flex>
                    <Flex
                      width={flexWidth}
                      justifyContent={"flex-start"}
                      flexDirection={["column", "column", "column", "row"]}
                      gap={1}
                      flexWrap={"wrap"}
                    >
                      <InputBox
                        id={"complemento"}
                        label={"Complemento"}
                        formControl={profileForm.control}
                        required={false}
                        mx={0}
                        w={"36"}
                      />
                      <InputBox
                        mx={0}
                        id={"bairro"}
                        label={"Bairro"}
                        formControl={profileForm.control}
                        defaultValue={cepData?.bairro}
                        required={false}
                        w={"80"}
                      />
                      <InputBox
                        mx={0}
                        id={"cidade"}
                        label={"Cidade"}
                        defaultValue={cepData?.cidade}
                        formControl={profileForm.control}
                        required={false}
                        w={"80"}
                      />
                      <InputBox
                        mx={0}
                        id={"uf"}
                        label={"UF"}
                        defaultValue={cepData?.uf}
                        formControl={profileForm.control}
                        required={false}
                        w={"16"}
                      />
                    </Flex>
                  </Flex>
                </DefaultAnimatedPresence>
              </form>
            </Flex>
          </Flex>

          <Spacer />
          <Spacer />
        </SingleScreenFlex>
      )}
    </>
  );
}

Profile.auth = true;
Profile.guest = false;

export async function getServerSideProps(context) {
  return {
    props: {
      lockScroll: false,
      cookies: context.req.headers.cookie ?? "",
      pageTitle: "Perfil",
    },
  };
}
