import React, { useState, useEffect } from "react";
import {
  Box,
  Menu,
  MenuItem,
  MenuList,
  Flex,
  MenuButton,
  Text,
  SimpleGrid,
  Heading,
  Stack,
} from "@chakra-ui/react";
import Product from "../Product/Product";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { get_user_favorites } from "../../Redux/Actions";
import { CloseIcon } from "@chakra-ui/icons";
function WishList() {
  let [select, setSelect] = useState("Nombre");
  let { favorites } = useSelector((state) => state);
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("info_user"));

  useEffect(() => {
    dispatch(get_user_favorites(user.id));
  }, [dispatch, favorites, user.id]);

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
          Favoritos
        </Box>
      </Flex>

      {favorites?.length > 0 ? (
        <SimpleGrid
          columns={[1, 1, 1, 2, 3]}
          spacing="20px"
          m="auto"
          maxW={"80%"}
          my="50px"
        >
          {favorites?.map((product) => {
            return (
              <Product key={product.id} {...product} origin={"wishlist"} />
            );
          })}
        </SimpleGrid>
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
            Tu lista de favoritos
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
    </Box>
  );
}

export default WishList;
