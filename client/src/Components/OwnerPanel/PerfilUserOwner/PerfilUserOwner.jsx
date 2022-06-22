import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Stack, Text, Input } from "@chakra-ui/react";
import { GrLocation } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlinePresentToAll } from "react-icons/md";
import { HiOutlineBan } from "react-icons/hi";
import useAuthAd from "../../../hooks/useAuthAd";
import { Link } from "react-router-dom";
import Alerta from "../../../helper/Alerta";

const PerfilUserOwner = () => {
  const { obtenerPerfilId, perfilIDUser, UpdateRolUser, BanearUsuario } =
    useAuthAd();
  const [rol, setRol] = useState(false);
  const [baneos, setBaneos] = useState(false);
  const [datosEnvio, setDatosEnvio] = useState(false);
  const [compras, setCompras] = useState(false);
  const [defaul, setDefaul] = useState(true);
  const [rols, setRols] = useState("");
  const [baneoss, setBaneoss] = useState("");
  const [alerta, setAlerta] = useState({});

  const { id } = useParams();
  useEffect(() => {
    obtenerPerfilId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handelBaneoss = (e) => {
    setBaneoss(e.target.value);
  };
  const handelRol = (e) => {
    setRols(e.target.value);
  };
  const handleSubmitRols = (e) => {
    e.preventDefault();
    UpdateRolUser(id, rols);
    setAlerta({
      msg: "Se cambio el rol correctamente",
      error: false,
    });
    setTimeout(() => {
      setAlerta({});
    }, 4000);
  };
  const handleSubmitBaneo = (e) => {
    e.preventDefault();
    BanearUsuario(id, baneoss);
    if (baneoss === "baneo") {
      setAlerta({
        msg: "Usuario baneado correctamente",
        error: false,
      });
    } else {
      setAlerta({
        msg: "Usuario fue desbaneado correctamente",
        error: false,
      });
    }

    setTimeout(() => {
      setAlerta({});
    }, 4000);
  };

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
          <BiUserCircle />
        </Box>
        <Box w="90%">
          <Button
            bg="#242524"
            color="#FFFF"
            _hover={{
              bg: "#242524",
            }}
            onClick={() => setRol(!rol)}
          >
            <Flex justify={"space-between"} align="center">
              <Box pb="6px">
                <GrUserAdmin />
              </Box>
              <Flex>
                <Text>Cambiar Rol</Text>
              </Flex>
            </Flex>
          </Button>
          <Flex justify={"space-between"} align="center">
            <Button
              bg="#242524"
              color="#FFFF"
              _hover={{
                bg: "#242524",
              }}
              onClick={() => setBaneos(!baneos)}
            >
              <Flex justify={"space-between"} align="center">
                <Box pb="6px">
                  <HiOutlineBan />
                </Box>
                <Flex>
                  <Text>Baneos</Text>
                </Flex>
              </Flex>
            </Button>
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
                <Text>Compras del usuario</Text>
              </Flex>
            </Flex>
          </Link>
          <Link to="/owner/users">
            <Flex justify={"space-between"} align="center">
              <Box pb="6px">
                <AiOutlineArrowLeft />
              </Box>
              <Flex
                justify={"left"}
                w="80%"
                pb="6px"
                borderBottom={"2px solid #EDEDED"}
              >
                <Text>Volver al panel de usuarios</Text>
              </Flex>
            </Flex>
          </Link>
        </Box>
      </Stack>
      {rol ? (
        <Box p="20px" borderRadius={"20px"} w="75%" bg="#FFFFFF">
          {msg && <Alerta alerta={alerta} />}
          <Flex fontWeight={"extrabold"}>Cambiar rol a usario</Flex>
          <Flex fontWeight={"extrabold"}>
            Nombre completo :{" "}
            <Text mx="10px" fontWeight={"light"}>
              {perfilIDUser.name} {perfilIDUser.apellido}
            </Text>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            Email:{" "}
            <Text mx="10px" fontWeight={"light"}>
              {perfilIDUser.email}
            </Text>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            Seleccioná el rol que desas dar a usiaro
          </Flex>
          <select defaultValue="default" onChange={handelRol}>
            <option value="default" disabled>
              Seleciona rol
            </option>
            <option value={"admin"}>Admin</option>
            <option value={"user"}>Usuario</option>
          </select>
          <Button
            bg="#242524"
            color="#FFFF"
            _hover={{
              bg: "#242524",
            }}
            onClick={handleSubmitRols}
          >
            Cambiar rol {<MdOutlinePresentToAll />}
          </Button>
        </Box>
      ) : baneos ? (
        <Box p="20px" borderRadius={"20px"} w="75%" bg="#FFFFFF">
          {msg && <Alerta alerta={alerta} />}
          <Flex fontWeight={"extrabold"}>Cambiar rol a usario</Flex>
          <Flex fontWeight={"extrabold"}>
            Nombre completo :{" "}
            <Text mx="10px" fontWeight={"light"}>
              {perfilIDUser.name} {perfilIDUser.apellido}
            </Text>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            Email:{" "}
            <Text mx="10px" fontWeight={"light"}>
              {perfilIDUser.email}
            </Text>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            <Text>
              {" "}
              Prohibir al usuario <span style={{ color: "red" }}>Baneo</span>
            </Text>
          </Flex>
          <select defaultValue="default" onChange={handelBaneoss}>
            <option value="default" disabled>
              Seleciona la accion
            </option>
            <option value={"baneo"}>Banear</option>
            <option value={"desbaneo"}>Desbanear</option>
          </select>

          <Button
            bg="#242524"
            color="#FFFF"
            _hover={{
              bg: "#242524",
            }}
            onClick={handleSubmitBaneo}
          >
            Enviar {<MdOutlinePresentToAll />}
          </Button>
        </Box>
      ) : (
        <Box p="20px" borderRadius={"20px"} w="75%" bg="#FFFFFF">
          <Flex fontWeight={"extrabold"}>Datos del usuario selecicado</Flex>
          <Flex fontWeight={"extrabold"}>
            Nombre:{" "}
            <Text mx="10px" fontWeight={"light"}>
              {perfilIDUser.name}
            </Text>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            Apellido:{" "}
            <Text mx="10px" fontWeight={"light"}>
              {perfilIDUser.apellido}
            </Text>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            Email:{" "}
            <Text mx="10px" fontWeight={"light"}>
              {perfilIDUser.email}
            </Text>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            Fecha de nacimiento:{" "}
            <Text mx="10px" fontWeight={"light"}>
              {perfilIDUser.fecha_nacimiento ? (
                perfilIDUser.fecha_nacimiento
              ) : (
                <p style={{ color: "#ea5753" }}>
                  El usuario no ha registrado una fecha de nacimiento
                </p>
              )}
            </Text>
          </Flex>
          <Flex fontWeight={"extrabold"}>
            Dirección:{" "}
            <Text mx="10px" fontWeight={"light"}>
              {perfilIDUser.direccion ? (
                perfilIDUser.direccion
              ) : (
                <p style={{ color: "#ea5753" }}>
                  El usuario no ha registrado una direcion
                </p>
              )}
            </Text>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default PerfilUserOwner;
