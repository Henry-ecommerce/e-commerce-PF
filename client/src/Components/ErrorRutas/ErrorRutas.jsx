import React from "react";
import { Link } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Heading, Flex } from "@chakra-ui/react";
const ErrorRutas = () => {
  return (
    <>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <>
          <Box textAlign="center" py={10} px={6} my={"150px"}>
            <Box display="inline-block">
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bg={"red.500"}
                rounded={"50px"}
                w={"55px"}
                h={"55px"}
                textAlign="center"
              >
                <CloseIcon boxSize={"20px"} color={"white"} />
              </Flex>
            </Box>
            <Heading as="h2" size="xl" mt={6} mb={2}>
              Ruta no valida
            </Heading>
            <Link to="/" style={{ color: "black" }}>
              Regresa al
              <span style={{ color: "#659DF6", fontWeight: "bolder" }}>
                {" "}
                inicio para continuar
              </span>
            </Link>
          </Box>
        </>
      </div>
    </>
  );
};

export default ErrorRutas;
