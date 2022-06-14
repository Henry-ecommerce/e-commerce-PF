import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../../helper/Alerta";

const NewPass = () => {
  const { token } = useParams();
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passModi, setPassModi] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: "Contraseña debe de tener minimo 6 caracteres",
        error: true,
      });
      return;
    }
    try {
      const url = `${process.env.REACT_APP_API}/registro/cambioPasss/${token}`;
      const { data } = await axios.post(url, { password });

      setPassModi(true);
      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_API}/registro/cambioPasss/${token}`
        );
        setAlerta({
          msg: "Coloca tu nueva contraseña",
          error: false,
        });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Hubo un error, vuelve a intentar",
          error: true,
        });
      }
    };
    comprobarToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const { msg } = alerta;

  return (
    <>
      <Flex mt="30px" align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Restablece tu contraseña y no pierdas acceso a
              <span className="text-black"> cuenta pacientes</span>
            </Heading>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            {msg && <Alerta alerta={alerta} />}
            {tokenValido && (
              <>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <HStack>
                      <Box>
                        <FormControl id="firstName" /* isRequired */>
                          <FormLabel>Nueva contraseña</FormLabel>
                          <Input
                            type="password"
                            name="password"
                            placeholder="Escribe una contraseña"
                            required
                            className="border w-full p-3 mt-3 bg-gray-50 rounded"
                            value={password}
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Box>
                    </HStack>
                    <Button
                      type="submit"
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                </form>
              </>
            )}
            {passModi && (
              <Link
                to="/login"
                className="block text-center my-5 text-gray-500 text-xl"
              >
                <span className="font-bold text-slate-700 text-lg">
                  {" "}
                  inicia sesion
                </span>
              </Link>
            )}
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default NewPass;
