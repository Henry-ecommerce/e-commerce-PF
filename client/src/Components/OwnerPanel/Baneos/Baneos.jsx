import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import HeaderOwner from "../OwnerHeaderFotert/HeaderOwner";

const Baneos = () => {
  return (
    <Flex>
      <HeaderOwner />
      <Box w="60%" m="auto">
        Baneos
      </Box>
    </Flex>
  );
};

export default Baneos;
