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
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Review from "../Review/ReviewButton";

export default function MisCompras() {
  let [select, setSelect] = useState("Nombre");
  let [compra, setCompra] = useState();
<<<<<<< Updated upstream
=======

  let productos = JSON.parse(localStorage.getItem("productos_carrito"));

>>>>>>> Stashed changes
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
        console.log(compra, compra.items);
      });
    }
  }, []);

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
        w="1100px"
        ml="20px"
        alignItems="center"
        justifyItems="center"
      >
        {compra?.length > 0 ? (
          compra.map((e) =>
            e.items?.map((product) => {
              return (
                <Box bg="blackAlpha.20" borderRadius="5px">
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
                      src={product.picture_url}
                    />

                    <Center fontWeight="black" w="300px" margin="20px">
                      {product.title}
                    </Center>
                    <Grid
                      templateColumns="repeat(2, 1fr)"
                      gap={0}
                      alignContent={"space-evenly"}
                    >
                      {product.quantity > 1 && (
                        <Box fontWeight="black" mt="0px">
                          {` ${product.quantity} uds`}
                        </Box>
                      )}
                      <Box fontWeight="black" mt="0px">
                        ${product.unit_price}
                      </Box>
                      {product.quantity > 1 && (
                        <Box fontWeight="black" margin="0px">
                          {"Total :"}
                        </Box>
                      )}
                      {product.quantity > 1 && (
                        <Box fontWeight="black" margin="0px">
                          ${product.quantity * product.unit_price}
                        </Box>
                      )}
                    </Grid>
                    <Center fontWeight="black" w="100px" ml="30px">
                      {`Fecha de compra: ${e.createdAt.slice(0, 10)}`}
                    </Center>

                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyItems="center"
                      mt="10px"
                      ml="40px"
                      mr="15px"
                      w="20px"
                    >
                      <Link to={`/detail/${product.id}`}>
                        <Center mt="15px">
                          <Review id={product.id} />
                        </Center>
                        <Center>
                          <Button
                            mt="10px"
                            bg="#242525"
                            color="#ECEDEC"
                            _hover={{ bg: "#242525", color: "#ECEDEC" }}
                            fontSize="small"
                          >
                            Volver a comprar
                          </Button>
                        </Center>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              );
            })
          )
        ) : (
          <Box>Vaya parece que aun no has hecho compras :C...</Box>
        )}
      </SimpleGrid>
    </Box>
  );
}
