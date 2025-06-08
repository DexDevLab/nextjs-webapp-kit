import { Divider, Flex, Heading } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

export default function SearchbarResultBox({
  scrollBgColor,
  hoverBgColor,
  dividerBorderColor,
  searchResults,
  resultSelectFn,
  ...props
}) {
  return (
    <AnimatePresence>
      <Flex
        as={motion.div}
        initial={{
          opacity: 0,
          transition: { ease: "anticipate", duration: 0.5 },
        }}
        animate={{
          opacity: 1,
          transition: { ease: "anticipate", duration: 0.5 },
        }}
        exit={{
          opacity: 0,
        }}
        flexDirection={"column"}
        overflowY={"auto"}
        maxHeight={"50vh"}
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
            background: scrollBgColor,
          },
          "&::-webkit-scrollbar-track": {
            width: "8px",
            background: scrollBgColor,
          },
          "&::-webkit-scrollbar-thumb": {
            background: scrollBgColor,
            borderRadius: "24px",
          },
        }}
        {...props}
      >
        {Array.from(searchResults).map((result, idx) => {
          return (
            <>
              <Flex
                key={result.id + "-" + idx}
                flexDirection={"column"}
                borderRadius={"5px"}
                _hover={{
                  cursor: "pointer",
                  backgroundColor: hoverBgColor,
                }}
                onClick={() => resultSelectFn(result)}
              >
                <Flex
                  pb={result.username && result.email ? 3 : undefined}
                  py={!result.username && !result.email ? 2 : undefined}
                  justifyContent={"flex-start"}
                >
                  <Heading as={"h6"} mx={"auto"} fontSize={"md"}>
                    {result.name}
                  </Heading>
                </Flex>
                {result.username && result.email && (
                  <Flex flexDirection={"column"} gap={2}>
                    <Heading
                      px={1}
                      as={"h6"}
                      fontWeight={"normal"}
                      fontSize={"sm"}
                    >
                      Username: {result.username}
                    </Heading>
                    <Heading
                      px={1}
                      as={"h6"}
                      fontWeight={"normal"}
                      fontSize={"sm"}
                    >
                      Email: {result.email}
                    </Heading>
                  </Flex>
                )}
              </Flex>
              {idx + 1 !== searchResults.length && (
                <Divider my={2} borderColor={dividerBorderColor} />
              )}
            </>
          );
        })}
      </Flex>
    </AnimatePresence>
  );
}
