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
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import axios from "axios";
import Alerta from "../../helper/Alerta";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [alerta, setAlerta] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepit: "",
  });

  const validation = (values) => {
    // const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const errors = {};
    let pattern = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,30}$$/;

    if (!values.name.trim()) {
      errors.name = "El campo es requerido";
    } else if (!pattern.test(!values.name.trim())) {
      errors.name =
        "¡El name debe tener entre 3 y 30 caracteres y no acepta valores especiales!";
    }
    if (!values.email.trim()) {
      errors.email = "El campo es requerido";
    }

    if (!values.password.trim()) {
      errors.password = "El campo es requerido";
    } else if (values.password.length < 5) {
      errors.password = "Constraseña muy corta";
    }
    if (!values.passwordRepit.trim()) {
      errors.passwordRepit = "El campo es requerido";
    } else if (values.passwordRepit !== values.password) {
      errors.passwordRepit = "Las contraseñas no coinciden";
    }

    return errors;
  };

  const handleOnblur = (e) => {
    handleChange(e);
    setErrors(validation(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API}/registro/cliente`, form);
      setAlerta({
        msg: "Revisa tu email para confirmar la cuenta",
        error: false,
      });
      setForm({
        name: "",
        email: "",
        password: "",
        passwordRepit: "",
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 5000);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { msg } = alerta;

  return (
    <Flex mt="30px" align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" /* isRequired */>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      onBlur={handleOnblur}
                      onChange={handleChange}
                      type="text"
                      value={form.name}
                      name="name"
                      placeholder="Escribe tu nombre"
                    />
                    {errors.name && <Text color="#FE0A01">{errors.name}</Text>}
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" /* isRequired */>
                <FormLabel>Email address</FormLabel>
                <Input
                  onBlur={handleOnblur}
                  onChange={handleChange}
                  value={form.email}
                  name="email"
                  type="email"
                />
                {errors.email && <Text color="#FE0A01">{errors.email}</Text>}
              </FormControl>
              <FormControl id="password" /* isRequired */>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onBlur={handleOnblur}
                    onChange={handleChange}
                    value={form.password}
                    name="password"
                  />
                  {errors.password && (
                    <Text color="#FE0A01">{errors.password}</Text>
                  )}
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="password_confirm" /* isRequired */>
                <FormLabel>Password Confirm</FormLabel>
                <InputGroup>
                  <Input
                    type={showPasswordConfirm ? "text" : "password"}
                    onBlur={handleOnblur}
                    onChange={handleChange}
                    value={form.passwordRepit}
                    name="passwordRepit"
                  />
                  {errors.passwordRepit && (
                    <Text color="#FE0A01">{errors.passwordRepit}</Text>
                  )}
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPasswordConfirm(
                          (showPasswordConfirm) => !showPasswordConfirm
                        )
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
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
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?
                  <RouterLink style={{ color: "#4399E1" }} to="/login">
                    {" "}
                    Login
                  </RouterLink>
                </Text>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Recuperar contraseña
                  <RouterLink
                    style={{ color: "#4399E1" }}
                    to="/login/newPassword"
                  >
                    {" "}
                    Recuperar pass
                  </RouterLink>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
