import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Text,
  Box,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../Context/AuthContext";

import axios from "axios";
import Alerta from "../../helper/Alerta";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";
export default function Login() {
  const navegates = useNavigate();
  const { setAuth, _obtenerProducto } = useAuth();
  const [alerta, setAlerta] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "1001878141909-1d23q1061u79i2cma56k3qpnlppvu9nu.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("singInDiv"), {
      then: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  const handleCallbackResponse = async (respose) => {
    localStorage.setItem("token", respose.credential);

    const userObject = jwt_decode(respose.credential);
    localStorage.setItem(
      "info_user",
      JSON.stringify({ ...userObject, rol: "User" })
    );
    setUser(userObject);

    document.getElementById("singInDiv").hidden = true;
  };

  const handleSingOut = (e) => {
    try {
      setUser();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      const enviar = async () => {
        const obje = {
          name: user.given_name,
          apellido: user.family_name,
          password: user.jti,
          email: user.email,
          fecha_nacimiento: null,
          rol: "User",
          token: null,
          confirmado: true,
        };

        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/registro/cliente/loginGoogle`,
          obje
        );
        console.log(data.token);

        localStorage.setItem("token", data.token);
        localStorage.setItem("info_user", JSON.stringify(data));
        setAuth(data);
        navegates("/");
      };
      enviar();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/registro/cliente/login`,
        { email, password }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("info_user", JSON.stringify(data));

      setAuth(data);
      if (data.rol === "Owner") {
        navegates("/");
      } else if (data.rol === "Admin") {
        navegates("/");
        _obtenerProducto();
      } else {
        navegates("/");
      }
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <Flex mt="100px" align={"center"} justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          //bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"2xl"}
          p={6}
          my={1}
          bg={"#FFFF"}
        >
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight={"extrabold"}
            textAlign={"center"}
          >
            Iniciar Sesion
          </Heading>

          {/* {errors && (
          <Box textAlign={"center"} color="#FE0A01" fontWeight={"extrabold"}>
            {errors}
          </Box>
        )} */}
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
              />
            </FormControl>
            <FormControl id="password" mt={4}>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                mt={4}
                type="submit"
                bg={"#242524"}
                color={"white"}
                _hover={{
                  bg: "#242524",
                }}
              >
                Iniciar
              </Button>
            </Stack>
            <Flex justify={"center"} mt={"20px"}>
              <Box id="singInDiv"></Box>

              {user && <div id="singInDiv"></div>}
            </Flex>
          </form>
          <Stack pt={6}>
            <Text align={"center"}>
              Olvidaste tu contraseña?
              <RouterLink to="newPassword" style={{ color: "#4399E1" }}>
                {" "}
                <span style={{ color: "#659DF6", fontWeight: "bolder" }}>
                  {" "}
                  Cambiar contraseña
                </span>
              </RouterLink>
            </Text>
          </Stack>
          <Stack pt={3}>
            <Text align={"center"}>
              No tenes cuenta?
              <RouterLink to="signup" style={{ color: "#4399E1" }}>
                <span style={{ color: "#659DF6", fontWeight: "bolder" }}>
                  {" "}
                  Registrate
                </span>
              </RouterLink>
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
