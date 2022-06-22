import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart, FiSettings } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { BiShoppingBag, BiStoreAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const EditarPerfil = () => {
  let user = JSON.parse(localStorage.getItem("info_user"));

  return (
    <Flex w="80%" m="auto" mt="50px" justify={"space-between"}>
      <Stack
        bg="#FFFFFF"
        w="23%"
        p="20px"
        borderRadius={"20px"}
        alignItems="center"
      >
        <Box fontSize={"150px"} mb="20px">
          <BiUserCircle />
        </Box>
        <Box w="90%">
          <Flex justify={"space-between"} align="center">
            <Box pb="6px">
              <AiOutlineUser />
            </Box>
            <Flex
              justify={"left"}
              w="80%"
              pb="6px"
              borderBottom={"2px solid #EDEDED"}
            >
              <Text>Informacion</Text>
            </Flex>
          </Flex>
          <Flex justify={"space-between"} align="center">
            <Box pb="6px">
              <GrLocation />
            </Box>
            <Flex
              justify={"left"}
              w="80%"
              pb="6px"
              borderBottom={"2px solid #EDEDED"}
            >
              <Text>Datos de envio</Text>
            </Flex>
          </Flex>
          <Link to="/user/wishList">
            <Flex justify={"space-between"} align="center">
              <Box pb="6px">
                <AiOutlineHeart />
              </Box>
              <Flex
                justify={"left"}
                w="80%"
                pb="6px"
                borderBottom={"2px solid #EDEDED"}
              >
                <Text>Mis favoritos</Text>
              </Flex>
            </Flex>
          </Link>
          <Flex justify={"space-between"} align="center">
            <Box pb="6px">
              <FiShoppingCart />
            </Box>
            <Flex
              justify={"left"}
              w="80%"
              pb="6px"
              borderBottom={"2px solid #EDEDED"}
            >
              <Text>Mi Carrito</Text>
            </Flex>
          </Flex>
          <Flex justify={"space-between"} align="center">
            <Box pb="6px">
              <BiStoreAlt />
            </Box>
            <Flex
              justify={"left"}
              w="80%"
              pb="6px"
              borderBottom={"2px solid #EDEDED"}
            >
              <Text>Mis Pedidos</Text>
            </Flex>
          </Flex>
          <Link to="/user/misCompras">
            <Flex justify={"space-between"} align="center">
              <Box pb="6px">
                <BiShoppingBag />
              </Box>
              <Flex
                justify={"left"}
                w="80%"
                pb="6px"
                borderBottom={"2px solid #EDEDED"}
              >
                <Text>Mis compras</Text>
              </Flex>
            </Flex>
          </Link>
          <Flex justify={"space-between"} align="center">
            <Box pb="6px">
              <FiSettings />
            </Box>
            <Flex
              justify={"left"}
              w="80%"
              pb="6px"
              borderBottom={"2px solid #EDEDED"}
            >
              <Text>Ajustes de cuenta</Text>
            </Flex>
          </Flex>
          <Flex justify={"space-between"} align="center">
            <Box pb="6px">
              <MdLogout />
            </Box>
            <Flex
              justify={"left"}
              w="80%"
              pb="6px"
              borderBottom={"2px solid #EDEDED"}
            >
              <Text>Logout</Text>
            </Flex>
          </Flex>
        </Box>
      </Stack>
      <Box p="20px" borderRadius={"20px"} w="75%" bg="#FFFFFF">
        <Flex fontWeight={"extrabold"}>
          Nombre:{" "}
          <Text mx="10px" fontWeight={"light"}>
            {user.name}
          </Text>
        </Flex>
        <Flex fontWeight={"extrabold"}>
          Apellido:{" "}
          <Text mx="10px" fontWeight={"light"}>
            {user.apellido}
          </Text>
        </Flex>
        <Flex fontWeight={"extrabold"}>
          Email:{" "}
          <Text mx="10px" fontWeight={"light"}>
            {user.email}
          </Text>
        </Flex>
        <Flex fontWeight={"extrabold"}>
          Fecha de nacimiento:{" "}
          <Text mx="10px" fontWeight={"light"}>
            {user.fecha_nacimiento}
          </Text>
        </Flex>
        <Flex fontWeight={"extrabold"}>
          Dirección:{" "}
          <Text mx="10px" fontWeight={"light"}>
            {user.direccion}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default EditarPerfil;
