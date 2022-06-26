import { Box, Flex, Stack, Text, Image, Input, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart, FiSettings } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { BiShoppingBag, BiStoreAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../../helper/Alerta";

import useAuth from "../../hooks/useAuth";
const EditarPerfil = () => {
  const navegation = useNavigate();
  let user = JSON.parse(localStorage.getItem("info_user"));
  const [usuario, setUsuario] = useState({
    id: user.id,
    name: user.name,
    apellido: user.apellido,
    email: user.email,
    fecha_nacimiento: user.fecha_nacimiento || "",
    direccion: user.direccion || "",
    img: user.img,
  });

  const [alerta, setAlerta] = useState({});
  const { actualizarPerfil, setAuth, cerrarSesion } = useAuth();
  const handelSubmit = (e) => {
    e.preventDefault();
    const { name, apellido, email } = usuario;
    if ([name, apellido, email].includes("")) {
      setAlerta({
        msg: "Nombre, apellido y email son campos requeridos",
        error: true,
      });
    } else {
      if (email !== user.email) {
        setAlerta({
          msg: "Informacios actualizada se va a cerrar la sescion para ver los cambios",
          error: false,
        });

        setTimeout(() => {
          navegation("/");
          actualizarPerfil(usuario);
          localStorage.removeItem("token");
          localStorage.removeItem("info_user");
          setAuth({});
          setAlerta({});
        }, 1000);
      }

      const obj = {
        id: usuario.id,
        name: usuario.name,
        apellido: usuario.apellido,
        fecha_nacimiento: usuario.fecha_nacimiento,
        direccion: usuario.direccion,
        img: usuario.img,
        email: usuario.email,
      };
      setAlerta({
        msg: "Informacios actualizada se va a cerrar la sescion para ver los cambios",
        error: false,
      });

      setTimeout(() => {
        navegation("/");
        actualizarPerfil(obj);
        localStorage.removeItem("token");
        localStorage.removeItem("info_user");
        setAuth({});
        setAlerta({});
      }, 1000);
    }
  };
  const handelOnchage = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const foto = user.img;
  const { msg } = alerta;
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
          {foto ? (
            <Image
              src={foto}
              alt="fotoPerfil"
              borderRadius="full"
              boxSize="150px"
            />
          ) : (
            <BiUserCircle />
          )}
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
              <Link to="/user/carrito">
                <Text>Mi Carrito</Text>
              </Link>
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
              <MdLogout />
            </Box>
            <Flex
              justify={"left"}
              w="80%"
              pb="6px"
              borderBottom={"2px solid #EDEDED"}
            >
              <Link to="/" onClick={() => cerrarSesion()}>
                <Text>Logout</Text>
              </Link>
            </Flex>
          </Flex>
        </Box>
      </Stack>
      <Box p="20px" borderRadius={"20px"} w="75%" bg="#FFFFFF">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handelSubmit}>
          <Flex fontWeight={"extrabold"} mt={"50px"}>
            Nombre:{" "}
            <Input
              value={usuario.name}
              name="name"
              onChange={handelOnchage}
              w={"50%"}
              mb={"20px"}
              mx="10px"
              fontWeight={"light"}
            ></Input>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            Apellido:{" "}
            <Input
              value={usuario.apellido}
              name="apellido"
              onChange={handelOnchage}
              w={"50%"}
              mb={"20px"}
              mx="10px"
              fontWeight={"light"}
            ></Input>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            Email:{" "}
            <Input
              type="email"
              value={usuario.email}
              name="email"
              onChange={handelOnchage}
              w={"50%"}
              mb={"20px"}
              mx="10px"
              fontWeight={"light"}
            ></Input>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            Fecha de nacimiento:{" "}
            <Input
              type="date"
              value={usuario.fecha_nacimiento}
              name="fecha_nacimiento"
              onChange={handelOnchage}
              w={"50%"}
              mb={"20px"}
              mx="10px"
              fontWeight={"light"}
            ></Input>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            Dirección:{" "}
            <Input
              value={usuario.direccion}
              name="direccion"
              onChange={handelOnchage}
              w={"50%"}
              mb={"20px"}
              mx="10px"
              fontWeight={"light"}
            ></Input>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            imagen:{" "}
            <Input
              value={usuario.img}
              name="img"
              onChange={handelOnchage}
              w={"50%"}
              mb={"20px"}
              mx="10px"
              fontWeight={"light"}
            ></Input>
          </Flex>
          <Button
            mt={"10px"}
            bg="#FFFF"
            color="back"
            _hover={{
              bg: "#242524",
              color: "white",
            }}
            type="submit"
          >
            Enviar cambios
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default EditarPerfil;
