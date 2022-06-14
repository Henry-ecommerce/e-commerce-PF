import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import HeaderAdmin from "../Admin/HeaderAdmin";

const Users = () => {
  return (
    <Flex>
      <HeaderAdmin />
      <Box w='60%' m='auto'>Users</Box>
    </Flex>
  );
};

export default Users;
