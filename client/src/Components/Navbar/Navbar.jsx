import React, { useState } from "react";
import {
	Box,
	Text,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";

function Navbar() {
	const { currentUser, signout } = useAuth();
	const [_width, set_width] = useState(window.frames.innerWidth);
	window.addEventListener("resize", () => {
		set_width(window.frames.innerWidth);
	});


	async function handleLogout() {
		try {
			await signout();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Flex p="10px" justify={"space-between"} bg="#242525" color="#ECEDEC">
			{_width <= 688 ? (
				<Menu>
					<MenuButton
						aria-label="Options"
						variant="outline"
					>
						<AiOutlineMenu />
					</MenuButton>
					<MenuList color={"#242525"}>
						<MenuItem>
							<Link to="/#">Inicio</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/#">Sucursal</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/#">Pedido</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/#">RapidoMore</Link>
						</MenuItem>
					</MenuList>
				</Menu>
			) : (
				<>
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
					</Flex>

					{currentUser ? (
						<Flex align={"center"}>
							<Text mx={3}> {currentUser?.email} </Text>
							<Button color="#242525" onClick={handleLogout}>
								Log out
							</Button>
							<Box color="#ECEDEC">
								<FiShoppingCart />
							</Box>
						</Flex>
					) : (
						<Flex align={"center"} mx="30px">
							<Link to="/signup">
								<AiOutlineUser />
							</Link>
							<Box ml={4} color="#ECEDEC">
								<AiOutlineHeart />
							</Box>
							<Box ml={4} color="#ECEDEC">
								<FiShoppingCart />
							</Box>
						</Flex>
					)}
				</>
			)}
		</Flex>
	);
}

export default Navbar;

// Inicio Sucursal Pedido RapidoMore
