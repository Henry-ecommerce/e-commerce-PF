import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import HeaderOwner from "../OwnerHeaderFotert/HeaderOwner";

const OrdenesOwner = () => {
  return (
    <Flex>
      <HeaderOwner />
      <Box w="60%" m="auto">
        Ordenes
      </Box>
    </Flex>
  );
};

export default OrdenesOwner;
