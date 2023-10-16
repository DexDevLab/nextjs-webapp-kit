import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, Spinner } from "@chakra-ui/react";

export default function SearchbarInputBox({
  width,
  inputPaddingR,
  inputContentEditable,
  inputBorderColor,
  inputHoverBorderColor,
  inputPaddingY,
  inputBorderRadius,
  inputBorder,
  inputH,
  inputOnChange,
  inputOnClick,
  isLoading,
  iconColor,
  value,
  type = "text",
  placeholder = "Procurar...",
  ...props
}) {
  return (
    <InputGroup {...props} borderRadius={5} width={width}>
      <InputLeftElement pointerEvents="none">
        {isLoading ? (
          <Spinner color={iconColor} size={"sm"} />
        ) : (
          <Search2Icon color={iconColor} />
        )}
      </InputLeftElement>
      <Input value={value} type={type} placeholder={placeholder}
        pr={inputPaddingR}
        contentEditable={inputContentEditable}
        borderColor={inputBorderColor}
        _hover={{
          borderColor: inputHoverBorderColor
        }}
        py={inputPaddingY}
        borderRadius={inputBorderRadius}
        border={inputBorder}
        height={inputH}
        onChange={inputOnChange}
        onClick={inputOnClick}
      />
    </InputGroup>
  );
}
