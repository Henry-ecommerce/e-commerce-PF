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
  GridItem,
  Image,
  Button,
  Grid,
  Center,
  useMediaQuery,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";
import Review from "../Review/ReviewButton";

export default function MisCompras() {
  let [select, setSelect] = useState("");
  let [compra, setCompra] = useState([]);
  const [mayor500w] = useMediaQuery("(min-width: 500px)");

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
        setCompra(result.data);
        console.log(result.data);
      });
    }
  }, []);

  if (select) {
    if (select === "Nombre" && compra[0].items?.length > 0) {
      compra[0].items.sort((a, b) => (a.title > b.title ? +1 : -1));
    }
    if (select === "Precio" && compra[0].items?.length > 0) {
      compra[0].items.sort((a, b) => a.unit_price - b.unit_price);
    }
    if (select === "Fecha" && compra[0].items?.length > 0) {
      compra[0].items.sort((a, b) => a.id - b.id);
    }
  }

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
          {mayor500w ? "Mis Compras" : null}
        </Box>
      </Flex>
      <Flex
        w="70vw"
        wrap="wrap"
        ml="auto"
        mr="auto"
        maxW={"1440px"}
        minW="350px"
        mt="20px"
      >
        {compra?.length > 0 ? (
          compra.map((e) =>
            e.items?.map((product) => {
              return (
                <Box
                  bg="white"
                  borderRadius="10px"
                  shadow="md"
                  p="5px"
                  m="5px"
                  textAlign={"center"}
                >
                  <Box
                    h="fit-content"
                    display="flex"
                    flexDirection="row"
                    alignItems={"center"}
                    justifyContent="space-around"
                    w="70vw"
                    maxW={"1440px"}
                    minW="330px"
                    flexWrap={"wrap"}
                    bg="white"
                    borderRadius="10px"
                  >
                    <Image
                      m="10px"
                      w="100px"
                      h="100px"
                      borderRadius={"10px"}
                      border="1px solid grey"
                      src={product.picture_url}
                    />

                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyItems="center"
                      fontWeight="black"
                      w="120px"
                    >
                      {e.estado_envio === "Creado" ? (
                        <Box>
                          {" "}
                          Estado de tu envio : <br />
                          En proceso
                        </Box>
                      ) : (
                        <Box>
                          {" "}
                          Estado de tu envio : <br />
                          {e.estado_envio}{" "}
                        </Box>
                      )}
                    </Box>

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
                    <Center fontWeight="black" w="100px">
                      {`Fecha de compra: ${e.createdAt.slice(0, 10)}`}
                    </Center>

                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyItems="center"
                      m="10px"
                    >
                      <Link to={`/detail/${product.id}`}>
                        <Center m="5px">
                          <Review id={product.id} />
                        </Center>
                        <Center>
                          <Button
                            m="5px"
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
          <Stack py={"150px"} px={6} justify={"center"} align={"center"}>
            <Box display="inline-block">
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bg={"red.500"}
                rounded={"50px"}
                w={"55px"}
                h={"55px"}
                textAlign="center"
              >
                <CloseIcon boxSize={"20px"} color={"white"} />
              </Flex>
            </Box>
            <Heading as="h2" size="xl" mt={6} mb={2}>
              No tienes compras
            </Heading>
            <Link to="/">
              {" "}
              <Text color={"gray.500"}>
                Click para ir a buscar{" "}
                <span style={{ color: "blue" }}>productos</span>
              </Text>
            </Link>
          </Stack>
        )}
      </Flex>
    </Box>
  );
}
