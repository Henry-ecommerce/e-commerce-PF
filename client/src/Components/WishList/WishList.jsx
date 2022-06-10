import React, { useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  MenuList,
  Flex,
  MenuButton,
  Text,
} from "@chakra-ui/react";
import Product from "../Product/Product";

function WishList() {
  let [select, setSelect] = useState("Nombre");

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
        <Box position="absolute" left='50%' right='50' color="white" fontWeight="bold">
          Favoritos
        </Box>
      </Flex>
      <Box m={23}>
        {/* aqui se debe realizar el map a los productos que cada usuario tenga en favoritos desde la base de datos */}
        <Product
          nombre={"juan"}
          marca={"logitec"}
          origin={"wishlist"}
          precio={{ PesosArg: 333 }}
          imagen0={
            "https://www.zdnet.com/a/img/resize/ee751a0011802c17a7f6b05a415476009437e148/2017/06/15/01748d48-6a7b-40c6-ace6-26c13e96f4b2/macbook-13-2017-header.jpg?auto=webp&width=768"
          }
        />
      </Box>
    </Box>
  );
}

export default WishList;