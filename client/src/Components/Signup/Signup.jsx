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
// import { useAuth } from "../../Context/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Signup() {
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState();
	const [errors, setErrors] = useState("");
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	// const { signup } = useAuth();

	async function handleSubmit(e) {
		e.preventDefault();
		if (password.length !== passwordConfirm.length) {
			return setErrors("Las contraseñas tienen se tener el mismo largo");
		}
		try {
			setErrors("");
			// await signup(email, password);
			navigate("/");
			/* CREO QUE TENDRIAMOS QUE HACER UN POST AL BACK TAMBIEN PARA GUARDAR EL MAIL DEL USUARIO */
		} catch (error) {
			console.log(error);
			setErrors("Hubo un error al crear la cuenta");
		}
	}

	return (
		<Flex mt="30px" align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
				</Stack>
				{errors && (
					<Box textAlign={"center"} color="#FE0A01" fontWeight={"extrabold"}>
						{errors}
					</Box>
				)}
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<form onSubmit={handleSubmit}>
						<Stack spacing={4}>
							<HStack>
								<Box>
									<FormControl id="firstName" /* isRequired */>
										<FormLabel>First Name</FormLabel>
										<Input type="text" />
									</FormControl>
								</Box>
								<Box>
									<FormControl id="lastName">
										<FormLabel>Last Name</FormLabel>
										<Input type="text" />
									</FormControl>
								</Box>
							</HStack>
							<FormControl id="email" /* isRequired */>
								<FormLabel>Email address</FormLabel>
								<Input
									type="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<FormControl id="password" /* isRequired */>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										type={showPassword ? "text" : "password"}
										onChange={(e) => setPassword(e.target.value)}
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
							</FormControl>
							<FormControl id="password_confirm" /* isRequired */>
								<FormLabel>Password Confirm</FormLabel>
								<InputGroup>
									<Input
										type={showPasswordConfirm ? "text" : "password"}
										onChange={(e) => setPasswordConfirm(e.target.value)}
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
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}
