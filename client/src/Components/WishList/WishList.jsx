import React, { useState, useEffect } from "react";
import {
  Box,
  Menu,
  MenuItem,
  MenuList,
  Flex,
  MenuButton,
  Text,
  SimpleGrid
} from "@chakra-ui/react";
import Product from "../Product/Product";
import { useSelector, useDispatch } from "react-redux";
import { get_user_favorites } from "../../Redux/Actions";

function WishList() {
  let [select, setSelect] = useState("Nombre");
  let {favorites} = useSelector(state => state)
  const dispatch = useDispatch();
	let user = JSON.parse(localStorage.getItem("info_user"));


  useEffect(() => {
    dispatch(get_user_favorites(user.id))
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
      <SimpleGrid
			columns={[1, 1, 1, 2, 3]}
			spacing="20px"
			m="auto"
			maxW={"80%"}
			my="50px"
		>
        {favorites?.length > 0 ? (
          favorites?.map((product) => {
            return (
              <Product key={product.id} {...product} origin={"wishlist"} />
            );
          })
        ) : (
          <Box>Vaya parece que aun no tienes nada en favoritos :C...</Box>
        )}
    </SimpleGrid>
    </Box>
  );
}

export default WishList;
