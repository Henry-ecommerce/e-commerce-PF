/* eslint-disable array-callback-return */
import { useState, useEffect, useLayoutEffect } from "react";
import {
  TableContainer,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  Thead,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Img,
  Box,
  Input,
  Button,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import useAuthAd from "../../../hooks/useAuthAd";
import HeaderAdmin from "../Admin/HeaderAdmin";
import { IoIosArrowDown } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import EditProductos from "../EditProductos/EditProductos";
import axios from "axios";

const ObtenerProductosAdmin = () => {

  const [formEdit, setFormEdit] = useState(false);
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);

  const [pedidos, setPedidos] = useState("");



  function handleSubmit(e) {}

  useLayoutEffect(() => {
    axios
      .get("/admin/envios")
      .then((res) => res.data)
      .then((data) => setPedidos(data));
  }, []);

 
  return (
    <Flex>
      <HeaderAdmin />
      {pedidos.length > 0 ? (
        <Box w="83%" m="auto" mt="30px">
          
          <Box h="500px" overflowY={"scroll"} borderRadius="10px" mt="30px">
            <TableContainer>
              <Table size={"md"} variant="striped" bg="#BFBFBF">
                <Thead bg="#242525" padding={"2px"}>
                  <Tr>
                    <Th color="#FFFF" textAlign={"center"}>
                      Detalle de Productos
                    </Th>
                    <Th color="#FFFF" textAlign={"center"}>
                      <Flex justifyContent="center">
                        <Menu isLazy textAlign={"center"} autoSelect={false}>
                          <MenuButton
                            fontWeight={"extrabold"}
                            textAlign="center"
                          >
                            <Flex align={"center"}>
                              ESTADO
                              <Box mx="3px">
                                <IoIosArrowDown />
                              </Box>
                            </Flex>
                          </MenuButton>
                          <MenuList p={0} color={"#242525"}>
                            <MenuItem
                              bg={"#242525"}
                              color={"#FFFF"}
                              _hover={{
                                bg: "gray",
                                color: "#FFFF",
                              }}
                            >
                              Creado
                            </MenuItem>
                            <MenuItem
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
                              bg={"#242525"}
                              color={"#FFFF"}
                              _hover={{
                                bg: "gray",
                                color: "#FFFF",
                              }}
                            >
                              Completado
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
                      Direccion
                    </Th>
                  </Tr>
                </Thead>
                <Tbody textAlign={"center"} bg="#FFFF">
                  {pedidos.length > 0 &&
                    pedidos.map((elem) => {
                      return (
                        <Tr key={elem.id}>
                          <Td padding={"0px"}>
                            <Link to="#" w="100%">
                              <Td>Pedido: {elem.id}</Td>
                            </Link>
                          </Td>
                          <Td>{elem.estado_envio}</Td>
                          <Td>$ {elem.payments[0].total_paid_amount}</Td>
                          <Td>{elem.payer.email}</Td>
                          <Td>{`${elem.shipments?.street_name} ${elem.shipments?.street_number} ${elem.shipments?.city_name}`}</Td>
                        </Tr>
                      );
                    })}
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

export default ObtenerProductosAdmin;
