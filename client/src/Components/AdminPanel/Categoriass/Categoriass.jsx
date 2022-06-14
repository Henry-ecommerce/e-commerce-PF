import {
	TableContainer,
	Table,
	Tr,
	Th,
	Tbody,
	Td,
	Thead,
	// Box,
	Flex,
} from "@chakra-ui/react";
import React from "react";
import useAuthAd from "../../../hooks/useAuthAd";
import HeaderAdmin from "../Admin/HeaderAdmin";

const Categoriass = () => {
	const { categorias } = useAuthAd();
	console.log(categorias);
	return (
		<Flex alignItems="start" >
			<HeaderAdmin />
			<TableContainer w="80%" m="auto" borderRadius="10px" mt='20px'>
				<Table variant="striped" bg="#BFBFBF">
					<Thead bg="#242525">
						<Tr>
							<Th color="#FFFF">Id</Th>
							<Th color="#FFFF">Nombre Categoria</Th>
							<Th color="#FFFF" isNumeric>
								Producto
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{categorias.length > 0 && typeof categorias !== 'string' &&
							categorias.map((elem) => {
								return (
									<Tr key={elem.id}>
										<Td>{elem.id}</Td>
										<Td>{elem.nombre}</Td>
										<Td isNumeric>Select de productos</Td>
									</Tr>
								);
							})}
						{/* <Tr>
							<Td>inches</Td>
							<Td>millimetres (mm)</Td>
							<Td isNumeric>25.4</Td>
						</Tr> */}
					</Tbody>
				</Table>
			</TableContainer>
		</Flex>
	);
};

export default Categoriass;
