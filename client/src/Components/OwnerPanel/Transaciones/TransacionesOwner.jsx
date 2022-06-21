import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import HeaderOwner from "../OwnerHeaderFotert/HeaderOwner";

const TransacionesOwner = () => {
  return (
    <Flex>
      <HeaderOwner />
      <Box w="60%" m="auto">
        Transacciones
      </Box>
    </Flex>
  );
};

export default TransacionesOwner;
