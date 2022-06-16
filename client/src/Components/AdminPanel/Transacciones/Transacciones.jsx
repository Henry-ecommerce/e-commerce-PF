import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import HeaderAdmin from "../Admin/HeaderAdmin";

const Transacciones = () => {
	return (
		<Flex>
			<HeaderAdmin />
			<Box w='60%' m='auto'>Transacciones</Box>
		</Flex>
	);
};

export default Transacciones;
