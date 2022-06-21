import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import HeaderOwner from "../OwnerHeaderFotert/HeaderOwner";

const UserOwner = () => {
  return (
    <Flex>
      <HeaderOwner />
      <Box w="60%" m="auto">
        Users
      </Box>
    </Flex>
  );
};

export default UserOwner;
