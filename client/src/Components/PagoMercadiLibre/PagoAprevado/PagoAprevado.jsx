import React from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Heading, Flex } from "@chakra-ui/react";
const PagoConfirmado = () => {
  return (
    <>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <>
          <Box textAlign="center" py={10} px={6} my={"150px"}>
            <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
              Gracias por su compra, pago aprobado correctamente
            </Heading>
            <Link to="/">
              Regresa al
              <span style={{ color: "#659DF6", fontWeight: "bolder" }}>
                {" "}
                inicio para continuar 🙌
              </span>{" "}
            </Link>
          </Box>
        </>
      </div>
    </>
  );
};

export default PagoConfirmado;
