import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Box,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import React from "react";
import HeaderAdmin from "../Admin/HeaderAdmin";
import useAuthAd from "../../../hooks/useAuthAd";

const Users = () => {
  const { users } = useAuthAd();

  return (
    <Flex>
      <HeaderAdmin />
      <TableContainer w="80%" m="auto" borderRadius="10px" mt="20px">
        <Box h="500px" overflowY={"scroll"} borderRadius="10px">
          <Table variant="striped" bg="#FFFF">
            <Thead bg="#242525">
              <Tr>
                <Th color="#FFFF">Id</Th>
                <Th color="#FFFF">Nombre</Th>
                <Th color="#FFFF">Email</Th>
                <Th color="#FFFF">Perfil</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((usuario) => {
                return (
                  <Tr key={usuario.id}>
                    <Td>{usuario.id}</Td>
                    <Td>{usuario.name}</Td>
                    <Td>{usuario.email}</Td>
                    <Td>
                      <Link to={`perfil/${usuario.id}`}>Perfil</Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
    </Flex>
  );
};

export default Users;
