import { axiosAPI } from "@/services/apiService";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useEffect, useState } from "react";
import useDimensions from "../hooks/useDimensions";
import ChakraMenuIcon from "../icons/ChakraMenuIcon";
import SearchbarInputBox from "./SearchbarInputBox";
import SearchbarResultBox from "./SearchbarResultBox";

export default function Searchbar({ config, isModal, ...props }) {
  const hover = useColorModeValue(
    config.theming.lightModeHoverColor,
    config.theming.darkModeHoverColor
  );
  const link = useColorModeValue(
    config.theming.lightModeFontColor,
    config.theming.darkModeFontColor
  );
  const [isLoading, setLoading] = useState(false);
  const [currPos, setCurrPos] = useState(0);
  const [bgTransparency, setBgTransparency] = useState(1);
  const bgColor = useColorModeValue(
    `rgba(255,255, 255, ${bgTransparency})`,
    `rgba(45, 55, 72, ${bgTransparency})`
  );
  const [searchResults, setSearchResults] = useState("");
  const [searchBarModal, setSearchBarModal] = useState(false);
  const [value, setValue] = useState("");
  const defaultWidth = "56";
  const { height, width } = useDimensions();
  const [barWidth, setBarWidth] = useState(defaultWidth);
  const [resultboxOpen, setResultboxOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useScrollPosition(({ currPos }) => {
    setCurrPos(currPos.y);
  });

  const onMouseLeave = () => {
    setResultboxOpen(false);
    setSearchResults("");
    setValue("");
  };

  // EXEMPLO DE FUNÇÃO VALUE CHANGE
  // ALTERAR O FUNCIONAMENTO PARA A REQUISIÇÃO CONFORME NECESSÁRIO
  const onValueChange = async (val) => {
    setValue(val);
    if (val.length > 0) {
      setLoading(true);
      // CONSULTA AO BACKEND PARA GERAR AS RESPOSTAS
      const searchRes = await axiosAPI
        .get("/api/search", {
          params: {
            search: val,
          },
        })
        .then((data) => {
          setLoading(false);
          return data;
        });
      if (searchRes.data.length > 0) {
        setSearchResults(searchRes.data);
      }
      setResultboxOpen(searchRes.data.length > 0);
    } else {
      setResultboxOpen(false);
    }
  };

  // EXEMPLO DE FUNÇÃO RESULT SELECT.
  // ALTERAR O FUNCIONAMENTO SUBSTITUINDO A FUNÇÃO CONFORME NECESSÁRIO
  const onResultSelect = (val) => {
    const name = val.name.toString().replaceAll(" ", "+");
    window.open("https://google.com/search?q=" + name, "_blank");
  };

  const onClickSearchBtn = () => {
    onOpen();
  };

  const onCloseModal = () => {
    onClose();
    onMouseLeave();
  };

  useEffect(() => {
    if (currPos !== 0) {
      setBgTransparency(0.75);
      if (resultboxOpen) {
        setResultboxOpen(false);
        setResultboxOpen(true);
      }
    } else {
      setBgTransparency(1);
      if (resultboxOpen) {
        setResultboxOpen(false);
        setResultboxOpen(true);
      }
    }

    switch (width > 0) {
      case width < 850:
        setBarWidth("15");
        setSearchBarModal(true);
        break;
      case width < 1200:
        setSearchBarModal(false);
        setBarWidth("");
        break;
      default:
        setBarWidth(defaultWidth);
        setSearchBarModal(false);
        break;
    }
  }, [currPos, isModal, resultboxOpen, width]);

  return (
    <>
      {searchBarModal && !isModal ? (
        <>
          <Flex
            justifyContent={"center"}
            width={"8"}
            height={"8"}
            borderRadius={"10px"}
            borderColor={hover}
            borderWidth={"thin"}
            _hover={{
              cursor: "pointer",
              backgroundColor: link,
            }}
            onClick={() => onClickSearchBtn()}
            {...props}
          >
            <ChakraMenuIcon m={"auto"} icon={Search2Icon} color={hover} />
          </Flex>

          <Modal isOpen={isOpen} onClose={() => onCloseModal()}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader p={2}>
                <SearchbarInputBox
                  width={barWidth}
                  isLoading={isLoading}
                  iconColor={hover}
                  value={value}
                  inputPaddingR={10}
                  inputContentEditable={false}
                  inputBorderColor={hover}
                  inputHoverBorderColor={hover}
                  inputPaddingY={1.5}
                  inputBorderRadius={"10px"}
                  inputBorder={"1px"}
                  inputH={"auto"}
                  inputOnChange={(e) => onValueChange(e.target.value)}
                />
              </ModalHeader>
              <ModalCloseButton ml={1} mt={1} />

              {resultboxOpen && (
                <ModalBody>
                  <SearchbarResultBox
                    scrollBgColor={hover}
                    hoverBgColor={hover}
                    dividerBorderColor={hover}
                    searchResults={searchResults}
                    resultSelectFn={onResultSelect}
                  />
                </ModalBody>
              )}
            </ModalContent>
          </Modal>
        </>
      ) : (
        <>
          {isModal ? (
            <>
              <SearchbarInputBox
                width={"56"}
                isLoading={isLoading}
                iconColor={hover}
                value={value}
                inputBorderColor={hover}
                inputHoverBorderColor={hover}
                inputBorderRadius={"10px"}
                onClick={onOpen}
                {...props}
              />

              <Modal isOpen={isOpen} onClose={() => onCloseModal()}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader p={2}>
                    <SearchbarInputBox
                      width={"100%"}
                      isLoading={isLoading}
                      iconColor={hover}
                      value={value}
                      inputPaddingR={10}
                      inputContentEditable={false}
                      inputBorderColor={hover}
                      inputHoverBorderColor={hover}
                      inputPaddingY={1.5}
                      inputBorderRadius={"10px"}
                      inputBorder={"1px"}
                      inputH={"auto"}
                      inputOnChange={(e) => onValueChange(e.target.value)}
                    />
                  </ModalHeader>
                  <ModalCloseButton ml={1} mt={1} />

                  {resultboxOpen && (
                    <ModalBody>
                      <SearchbarResultBox
                        scrollBgColor={hover}
                        hoverBgColor={hover}
                        dividerBorderColor={hover}
                        searchResults={searchResults}
                        resultSelectFn={onResultSelect}
                      />
                    </ModalBody>
                  )}
                </ModalContent>
              </Modal>
            </>
          ) : (
            <>
              <SearchbarInputBox
                width={barWidth}
                isLoading={isLoading}
                iconColor={hover}
                value={value}
                inputBorderColor={hover}
                inputHoverBorderColor={hover}
                inputBorderRadius={"10px"}
                inputOnChange={(e) => onValueChange(e.target.value)}
                {...props}
              />

              {resultboxOpen && (
                <SearchbarResultBox
                  scrollBgColor={hover}
                  hoverBgColor={hover}
                  dividerBorderColor={hover}
                  searchResults={searchResults}
                  resultSelectFn={onResultSelect}
                  onMouseOver={() => setResultboxOpen(true)}
                  onMouseLeave={() => onMouseLeave()}
                  position={"absolute"}
                  top={"14"}
                  backgroundColor={bgColor}
                  p={2}
                  mt={0.5}
                  borderRadius={"10px"}
                  boxShadow="lg"
                  backdropFilter="saturate(180%) blur(15px)"
                  minWidth={barWidth}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
