import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import HeaderOwner from "../OwnerHeaderFotert/HeaderOwner";

const VentasOwner = () => {
  return (
    <Flex>
      <HeaderOwner />
      <Box w="60%" m="auto">
        Ventas
      </Box>
    </Flex>
  );
};

export default VentasOwner;
