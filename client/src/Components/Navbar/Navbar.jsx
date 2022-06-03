import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function Navbar() {
	const { currentUser, signout } = useAuth();
	async function handleLogout() {
		try {
			await signout()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Flex justify={"space-between"} m="30px">
			<Flex justify={"space-around"} align="center">
				<Box mx="15px">
					<Link to="/#">Inicio</Link>
				</Box>
				<Box mx="15px">
					<Link to="/#">Sucursal</Link>
				</Box>
				<Box mx="15px">
					<Link to="/#">Pedido</Link>
				</Box>
				<Box mx="15px">
					<Link to="/#">RapidoMore</Link>
				</Box>
				<Button>Carrito</Button>
			</Flex>

			{currentUser ? (
				<Flex align={'center'}>
					<Text mx={3}> {currentUser?.email} </Text>
					<Button onClick={handleLogout}>Log out</Button>
				</Flex>
			) : (
				<Link to="/signup">
					<Button>Sign Up</Button>
				</Link>
			)}
		</Flex>
	);
}

export default Navbar;

// Inicio Sucursal Pedido RapidoMore
