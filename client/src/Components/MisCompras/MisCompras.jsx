import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Menu,
  MenuItem,
  MenuList,
  Flex,
  MenuButton,
  Text,
  SimpleGrid,
  Image,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Review from "../Review/ReviewButton";

export default function MisCompras() {
  let [select, setSelect] = useState("Nombre");
  let [compra, setCompra] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("info_user"));

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (headers) {
      axios.get(`/user/pedido/${user.id}`, headers).then((result) => {
        console.log(result.data);
        setCompra(result.data);
      });
    }
  }, []);

  let productos = result.data;
  // items: id, title, quantity, unit_price, picture_url
  // payments: status, status_detail
  // createdAt: fecha

  return (
    <Box>
      <Flex bg="black" p="10px">
        <Menu>
          <MenuButton color="white" mr="10" ml="10">
            Ordenar Por:{" "}
            <Text as="span" fontWeight="bold">
              {select + " ▼"}
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                setSelect("Nombre");
              }}
            >
              Nombre
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelect("Precio");
              }}
            >
              Precio
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelect("Fecha");
              }}
            >
              Fecha
            </MenuItem>
          </MenuList>
        </Menu>
        <Box
          position="absolute"
          left="50%"
          right="50"
          color="white"
          fontWeight="bold"
        >
          Mis Compras
        </Box>
      </Flex>
      <SimpleGrid
        column={[1]}
        spacing={7}
        w="1300px"
        ml="200px"
        alignItems="center"
        justifyItems="center"
      >
        {productos?.length > 0 ? (
          productos?.map((product) => {
            return (
              <Box bg="blackAlpha.200" borderRadius="5px">
                <Box
                  h="140px"
                  display="flex"
                  flexDirection="row"
                  w="1000px"
                  m="5px"
                  bg="blackAlpha.300"
                  borderRadius="5px"
                  justifyItems="center"
                >
                  <Image
                    m="10px"
                    mt="15px"
                    w="100px"
                    h="100px"
                    border="1px solid grey"
                    src={product.imagen0}
                  />

                  <Box fontWeight="black" w="300px" margin="20px">
                    {product.nombre}
                  </Box>

                  <Box fontWeight="black" margin="20px">
                    ${product.precio.PesosArg}
                  </Box>

                  <Box fontWeight="black" w="100px" m="10px">
                    Fecha de compra: 12/12/2012
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyItems="center"
                    mt="10px"
                    ml="40px"
                    mr="15px"
                    w="200px"
                  >
                    <Link to={`/detail/${product.id}`}>
                      <Button
                        mb="10px"
                        bg="#242525"
                        color="#ECEDEC"
                        _hover={{ bg: "#242525", color: "#ECEDEC" }}
                        fontSize="small"
                      >
                        Volver a comprar
                      </Button>
                      <Review id={product.id} />
                    </Link>
                  </Box>
                </Box>
              </Box>
            );
          })
        ) : (
          <Box>Vaya parece que aun no has hecho compras :C...</Box>
        )}
      </SimpleGrid>
    </Box>
  );
}
