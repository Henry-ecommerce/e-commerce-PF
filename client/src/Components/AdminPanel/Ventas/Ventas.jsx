import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import HeaderAdmin from "../Admin/HeaderAdmin";

const Ventas = () => {
  return (
    <Flex>
      <HeaderAdmin />
      <Box w='60%' m='auto'>Ventas</Box>
    </Flex>
  );
};

export default Ventas;
