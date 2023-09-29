import { config } from "@/utils/webappconfig";
import { Flex, Icon, Text } from "@chakra-ui/react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillInfoCircle,
  AiFillWarning,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { customToastTransition } from "./customToastTransition";

export function customToastEmitter(toastData) {
  const { title, status, description, code, transition, ...toastProps } =
    toastData;
  const { errorCodesAsIcons } = config.toasts;

  const toastOptions = {
    toastId: title,
    ...config.toasts,
    ...toastProps,
    transition: customToastTransition(transition),
    icon: false,
  };

  const iconComponent = () => {
    if (errorCodesAsIcons && code.toString().length > 0) {
      return (
        <Flex ml="auto" pt="0" w="6">
          <Text fontSize={"xs"} as="b">
            {code}
          </Text>
        </Flex>
      );
    } else {
      switch (status) {
        case "info":
          return <Icon boxSize="5" as={AiFillInfoCircle} />;
        case "success":
          return <Icon boxSize="5" as={AiFillCheckCircle} />;
        case "warning":
          return <Icon boxSize="5" as={AiFillWarning} />;
        case "error":
          return <Icon boxSize="5" as={AiFillCloseCircle} />;
        default:
          return <Icon boxSize="5" as={AiFillInfoCircle} />;
      }
    }
  };

  const toastComponent = () => {
    return (
      <>
        <Flex
          p="2"
          m={0}
          flexDirection={"row"}
          gap="2"
          justifyContent="flex-start"
        >
          <Flex flexDirection={"column"} justifyContent="center">
            {iconComponent()}
          </Flex>
          <Flex p={0} flexDirection={"column"}>
            <Text as="b">{title}</Text>
            {description && (
              <Text pb="1" fontSize={"sm"}>
                {description}
              </Text>
            )}
          </Flex>
        </Flex>
      </>
    );
  };

  return status
    ? toast[status](toastComponent(), toastOptions)
    : toast(toastComponent(), { ...toastOptions, theme: "colored" });
}
