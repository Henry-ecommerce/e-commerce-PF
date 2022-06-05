import React, { useState } from "react";
import {
	Button,
	FormControl,
	Flex,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue,
	Link,
	Box,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
// import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
	const [email, setEmail] = useState();
	const [errors, setErrors] = useState("");
	// const { resetPassword, currentUser } = useAuth();
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		// if (email === currentUser?.email) {
		// 	return setErrors("Ya estas logeado!");
		// }
		// try {
		// 	setErrors("");
		// 	await resetPassword(email);
		// 	navigate("/");
		// } catch (error) {
		// 	console.log(error);
		// 	setErrors("Hubo un error al iniciar sesión la cuenta");
		// }
	}

	return (
		<Flex mt="30px" align={"center"} justify={"center"}>
			<Stack
				spacing={4}
				w={"full"}
				maxW={"md"}
				bg={useColorModeValue("white", "gray.700")}
				rounded={"xl"}
				boxShadow={"lg"}
				p={6}
				my={12}
			>
				<Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
					Forgot your password?
				</Heading>
				{errors && (
					<Box textAlign={"center"} color="#FE0A01" fontWeight={"extrabold"}>
						{errors}
					</Box>
				)}
				<Text
					fontSize={{ base: "sm", sm: "md" }}
					color={useColorModeValue("gray.800", "gray.400")}
				>
					You'll get an email with a reset link
				</Text>
				<form onSubmit={handleSubmit}>
					<FormControl id="email">
						<Input
							onChange={(e) => setEmail(e.target.value)}
							placeholder="your-email@example.com"
							_placeholder={{ color: "gray.500" }}
							type="email"
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
							Request Reset
						</Button>
					</Stack>
				</form>
				<Stack pt={3}>
					<Text align={"center"}>
						Already a user?
						<Link color={"blue.400"}>
							<RouterLink to="/login"> Login</RouterLink>
						</Link>
					</Text>
				</Stack>
			</Stack>
		</Flex>
	);
}
