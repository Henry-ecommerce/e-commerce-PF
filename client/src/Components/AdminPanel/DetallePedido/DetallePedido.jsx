import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  MenuItem,
  MenuList,
  Flex,
  MenuButton,
  TableContainer,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  Thead,
  Menu,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../Admin/HeaderAdmin";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router-dom";

const DetallePedido = () => {
  let { id } = useParams();

  const [pedidos, setPedidos] = useState("");
  const [estado, setEstado] = useState(pedidos?.estado_envio);

  useEffect(() => {
    axios.get(`/admin/envios/${id}`).then((result) => setPedidos(result.data));
  }, []);

  function changeState(estado) {
    setEstado(estado);
    const datos = {
      estado: estado,
    };
    axios.put(`/admin/envios/${id}`, datos);
  }

  return (
    <Flex>
      <HeaderAdmin />
      {pedidos ? (
        <Box w="83%" m="auto" mt="30px">
          <Box h="500px" overflowY={"scroll"} borderRadius="10px" mt="30px">
            <TableContainer>
              <Table size={"md"} variant="striped" bg="#BFBFBF">
                <Thead bg="#242525" padding={"2px"}>
                  <Tr>
                    <Th color="#FFFF" textAlign={"center"}>
                      Productos comprados por el usuario
                    </Th>
                    <Th color="#FFFF" textAlign={"center"}>
                      <Flex justifyContent="center">
                        <Menu isLazy textAlign={"center"} autoSelect={false}>
                          <MenuButton
                            fontWeight={"extrabold"}
                            textAlign="center"
                          >
                            <Flex align={"center"}>
                              ASIGNA ESTADO AL PEDIDO
                              <Box mx="3px">
                                <IoIosArrowDown />
                              </Box>
                            </Flex>
                          </MenuButton>
                          <MenuList p={0} color={"#242525"}>
                            <MenuItem
                              onClick={() => changeState("Procesando")}
                              bg={"#242525"}
                              color={"#FFFF"}
                              _hover={{
                                bg: "gray",
                                color: "#FFFF",
                              }}
                            >
                              Procesando
                            </MenuItem>
                            <MenuItem
                              onClick={() => changeState("Cancelado")}
                              bg={"#242525"}
                              color={"#FFFF"}
                              _hover={{
                                bg: "gray",
                                color: "#FFFF",
                              }}
                            >
                              Cancelado
                            </MenuItem>
                            <MenuItem
                              onClick={() => changeState("Completado")}
                              bg={"#242525"}
                              color={"#FFFF"}
                              _hover={{
                                bg: "gray",
                                color: "#FFFF",
                              }}
                            >
                              Completado
                            </MenuItem>
                            <MenuItem
                              onClick={() => changeState("Creado")}
                              bg={"#242525"}
                              color={"#FFFF"}
                              _hover={{
                                bg: "gray",
                                color: "#FFFF",
                              }}
                            >
                              Creado
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                    </Th>
                    <Th color="#FFFF" isNumeric>
                      <Flex justifyContent="center">
                        <Menu isLazy textAlign={"center"} autoSelect={false}>
                          <Box fontWeight={"extrabold"} textAlign="center">
                            <Flex align={"center"}>TOTAl</Flex>
                          </Box>
                        </Menu>
                      </Flex>
                    </Th>
                    <Th color="#FFFF" textAlign={"center"}>
                      Usuario
                    </Th>
                    <Th color="#FFFF" textAlign={"center"}>
                      Direccion de envio
                    </Th>
                  </Tr>
                </Thead>
                <Tbody textAlign={"center"} bg="#FFFF">
                  {pedidos && (
                    <Tr key={pedidos.id}>
                      <Td
                        padding={"0px"}
                        fontWeight="black"
                        textAlign={"center"}
                      >
                        {pedidos?.items.map((elem) => {
                          return (
                            <Tr>
                              <Link to={`/detail/${elem.id}`}>
                                <Td fontWeight="normal">Nombre {elem.title}</Td>
                              </Link>
                              <Td fontWeight="normal">uds {elem.quantity}</Td>
                              <Td fontWeight="normal">$ {elem.unit_price}</Td>
                            </Tr>
                          );
                        })}
                      </Td>
                      <Td fontSize={"20px"} fontWeight={"black"}>
                        {estado}
                      </Td>
                      <Td>$ {pedidos.payments[0].total_paid_amount}</Td>
                      <Td>{pedidos.payer.email}</Td>
                      <Td>{`${pedidos.shipments?.street_name} ${pedidos.shipments?.street_number} ${pedidos.shipments?.city_name}`}</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      ) : (
        <Box w="80%" m="auto">
          <h2>No hay Pedidos</h2>
          <p>
            Espera a tener nuevos pedidos{" "}
            <span> y apareceran en este lugar</span>
          </p>
        </Box>
      )}
    </Flex>
  );
};

export default DetallePedido;
