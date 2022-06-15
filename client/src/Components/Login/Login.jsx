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
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../Context/AuthContext";

import axios from "axios";
import Alerta from "../../helper/Alerta";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";
export default function Login() {
  const navegates = useNavigate();
  const { setAuth } = useAuth();
  const [alerta, setAlerta] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  console.log(`Soy el user`, user);

  const handleCallbackResponse = (respose) => {
    localStorage.setItem("token-go", respose.credential);
    const userObject = jwt_decode(respose.credential);
    localStorage.setItem(
      "info_user",
      JSON.stringify({ ...userObject, rol: "User" })
    );
    setUser(userObject);
    document.getElementById("singInDiv").hidden = true;
  };

  const handleSingOut = async (e) => {
    try {
      const obje = {
        name: user.given_name,
        apellido: user.family_name,
        password: user.jti,
        email: user.email,
        img: user.picture,
        fecha_nacimiento: null,
        rol: "User",
        token: null,
        confirmado: true,
      };
      setUser({});

      await axios.post(
        `${process.env.REACT_APP_API}/registro/clienteGoogle`,
        obje
      );
    } catch (error) {
      console.log(error.message);
    }
  };
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
        navegates("/owner");
      } else if (data.rol === "Admin") {
        navegates("/admin");
      } else {
        navegates("/user");
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
      <div>
        <div id="singInDiv"></div>
        {Object.keys(user).length !== 0 && (
          <button onClick={(e) => handleSingOut(e)}>Sing Out</button>
        )}

        {user && <div id="singInDiv"></div>}
      </div>
      <Flex mt="100px" align={"center"} justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={1}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
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
          </form>
          <Stack pt={6}>
            <Text align={"center"}>
              Olvidaste tu contraseña?
              <RouterLink to="newPassword" style={{ color: "#4399E1" }}>
                {" "}
                Change Password
              </RouterLink>
            </Text>
          </Stack>
          <Stack pt={3}>
            <Text align={"center"}>
              No tenes cuenta?
              <RouterLink to="signup" style={{ color: "#4399E1" }}>
                {" "}
                Registrate
              </RouterLink>
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
