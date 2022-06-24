import React, { useState, useEffect } from "react";
import {
  Box,
  Menu,
  MenuItem,
  MenuList,
  Flex,
  MenuButton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Product from "../Product/Product";
import { useSelector, useDispatch } from "react-redux";
import { get_user_favorites } from "../../Redux/Actions";

function WishList() {
  let [select, setSelect] = useState("");
  let {favorites} = useSelector(state => state)
  const dispatch = useDispatch();
  const [mayor500w] = useMediaQuery('(min-width: 500px)');
	let user = JSON.parse(localStorage.getItem("info_user"));


  if(select) {
    if(select === "Nombre" && favorites?.length > 0){
      favorites?.sort((a,b)=> a.nombre > b.nombre ? +1 : -1);
    }
    if(select === "Precio" && favorites?.length > 0){
      favorites?.sort((a,b)=> a.precio?.PesosArg - b.precio?.PesosArg);
    }
    if(select === "Fecha" && favorites?.length > 0){
      favorites?.sort((a,b)=> a.id - b.id);
    }
  }

  useEffect(() => {
    dispatch(get_user_favorites(user.id))
  }, [dispatch, user.id]);

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
          <MenuList position="relative" zIndex="2000">
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
          display={mayor500w ? null : "none" }
          position="absolute"
          left="50%"
          right="50"
          color="white"
          fontWeight="bold"
        >
          Favoritos
        </Box>
      </Flex>
      <Flex width={"80vw"} maxW="1440" minW={"350px"} ml="auto" mr="auto" justifyContent={"center"} wrap="wrap" flexDirection={"row"} position="relative" boxSizing="border-box" >
        {favorites?.length > 0 ? (
          favorites?.map((product) => {
            return (
              <Box m="10px" display={"inline-block"} width="fit-content"><Product key={product.id} {...product} origin={"wishlist"} /></Box>
            );
          })
        ) : (
          <Box>Vaya parece que aun no tienes nada en favoritos :C...</Box>
        )}
    </Flex>
    </Box>
  );
}

export default WishList;
