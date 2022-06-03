import React, { useState } from "react";
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
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState();
	const [errors, setErrors] = useState("");
	const { login, currentUser } = useAuth();
	const navigate = useNavigate()

	async function handleSubmit(e) {
		e.preventDefault();
		if (password === "") {
			return setErrors("La contraseña es un campo obligatorio");
		}
		if (email === currentUser?.email) {
			return setErrors("Ya estas logeado!");
		}
		try {
			setErrors("");
			await login(email, password);
			navigate('/')
		} catch (error) {
			console.log(error);
			setErrors("Hubo un error al iniciar sesión la cuenta");
		}
	}

	return (
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
					Login
				</Heading>
				{errors && (
					<Box textAlign={"center"} color="#FE0A01" fontWeight={"extrabold"}>
						{errors}
					</Box>
				)}
				<form onSubmit={handleSubmit}>
					<FormControl id="email">
						<FormLabel>Email address</FormLabel>
						<Input
							placeholder="your-email@example.com"
							_placeholder={{ color: "gray.500" }}
							type="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>
					<FormControl id="password" mt={4}>
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>
					<Stack spacing={6}>
						<Button
							mt={4}
							type="submit"
							bg={"blue.400"}
							color={"white"}
							_hover={{
								bg: "blue.500",
							}}
						>
							Submit
						</Button>
					</Stack>
				</form>
				<Stack pt={6}>
					<Text align={"center"}>
						Forgot your Password?
						<RouterLink to="/newPassword" style={{ color: "#4399E1" }}>
							{" "}
							Change Password
						</RouterLink>
					</Text>
				</Stack>
				<Stack pt={3}>
					<Text align={"center"}>
						No count?
						<RouterLink to="/signup" style={{ color: "#4399E1" }}>
							{" "}
							Sing Up
						</RouterLink>
					</Text>
				</Stack>
			</Stack>
		</Flex>
	);
}
