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
    apellido: "",
    fecha_nacimiento: "",
  });

  const validation = (values) => {
    // const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const errors = {};
    let pattern = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,30}$$/;

    if (!values.fecha_nacimiento.trim()) {
      errors.fecha_nacimiento = "El campo es requerido";
    } else if (!pattern.test(!values.fecha_nacimiento.trim())) {
      errors.fecha_nacimiento =
        "¡El fecha de nacimiento debe tener entre 3 y 30 caracteres y no acepta valores especiales!";
    }
    if (!values.name.trim()) {
      errors.name = "El campo es requerido";
    } else if (!pattern.test(!values.name.trim())) {
      errors.name =
        "¡El name debe tener entre 3 y 30 caracteres y no acepta valores especiales!";
    }
    if (!values.apellido.trim()) {
      errors.apellido = "El campo es requerido";
    } else if (!pattern.test(!values.apellido.trim())) {
      errors.apellido =
        "¡El apellido debe tener entre 3 y 30 caracteres y no acepta valores especiales!";
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
    handleChange(e);
    setErrors(validation(form));

    try {
      await axios.post(`${process.env.REACT_APP_API}/registro/cliente`, form);
      setAlerta({
        msg: "Revisa tu email para confirmar la cuenta",
        error: false,
      });
      setForm({
        name: "",
        apellido: "",
        email: "",
        password: "",
        passwordRepit: "",
        fecha_nacimiento: "",
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
			<Stack spacing={8} mx={"auto"} w={"50%"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Crear cuenta
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					{msg !== {} && <Alerta alerta={alerta} />}
					<form onSubmit={handleSubmit}>
						<Stack spacing={4}>
							<Box>
								<FormControl /* id="firstName" */>
									<FormLabel>Nombre</FormLabel>
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
							<Box>
								<FormControl /* id="firstName" */>
									<FormLabel>Apellido</FormLabel>
									<Input
										onBlur={handleOnblur}
										onChange={handleChange}
										type="text"
										value={form.apellido}
										name="apellido"
										placeholder="Escribe tu nombre"
									/>
									{errors.apellido && (
										<Text color="#FE0A01">{errors.apellido}</Text>
									)}
								</FormControl>
							</Box>
							<Box>
								<FormControl /* id="firstName" */>
									<FormLabel>Fecha de nacimiento</FormLabel>
									<Input
										onBlur={handleOnblur}
										onChange={handleChange}
										type="date"
										value={form.fecha_nacimiento}
										name="fecha_nacimiento"
									/>
									{errors.fecha_nacimiento && (
										<Text color="#FE0A01">{errors.fecha_nacimiento}</Text>
									)}
								</FormControl>
							</Box>
							<FormControl id="email" /* isRequired */>
								<FormLabel>Email</FormLabel>
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
								<FormLabel>Contraseña</FormLabel>
								<InputGroup>
									<Input
										type={showPassword ? "text" : "password"}
										onBlur={handleOnblur}
										onChange={handleChange}
										value={form.password}
										name="password"
									/>
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
								{errors.password && (
									<Text color="#FE0A01">{errors.password}</Text>
								)}
							</FormControl>
							<FormControl id="password_confirm" /* isRequired */>
								<FormLabel>Confirmar contraseña</FormLabel>
								<InputGroup>
									<Input
										type={showPasswordConfirm ? "text" : "password"}
										onBlur={handleOnblur}
										onChange={handleChange}
										value={form.passwordRepit}
										name="passwordRepit"
									/>
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
								{errors.passwordRepit && (
									<Text color="#FE0A01">{errors.passwordRepit}</Text>
								)}
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									type="submit"
									loadingText="Submitting"
									size="lg"
									bg={"#242524"}
									color={"white"}
									_hover={{
										bg: "#242524",
									}}
								>
									Sign up
								</Button>
							</Stack>
							<Stack pt={6}>
								<Text align={"center"}>
									Ya sos usuario?
									<RouterLink style={{ color: "#4399E1" }} to="/login">
										{" "}
										Iniciar Sesion
									</RouterLink>
								</Text>
							</Stack>
							<Stack pt={6}>
								<Text align={"center"}>
									Olvidaste tu contraseña?
									<RouterLink
										style={{ color: "#4399E1" }}
										to="/login/newPassword"
									>
										{" "}
										Recuperar contraseña
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
