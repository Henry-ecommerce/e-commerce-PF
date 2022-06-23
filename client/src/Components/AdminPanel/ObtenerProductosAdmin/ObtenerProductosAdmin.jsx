/* eslint-disable array-callback-return */
import { useState, useEffect, useLayoutEffect } from "react";
import {
	TableContainer,
	Table,
	Tr,
	Th,
	Tbody,
	Td,
	Thead,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Flex,
	Img,
	Box,
	Input,
	Button,
	Text,
	Checkbox,
} from "@chakra-ui/react";
import useAuthAd from "../../../hooks/useAuthAd";
import HeaderAdmin from "../Admin/HeaderAdmin";
import Cards from "./Cards";
import { IoIosArrowDown } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import EditProductos from "../EditProductos/EditProductos";

const ObtenerProductosAdmin = () => {
	const {
		productos,
		obtenerProducto_por_nombre,
		obtenerProductos_filtrados,
		_marca,
		eliminarProducto,
		putProducto,
		_obtenerProducto,
	} = useAuthAd();
	const [input, setInput] = useState("");
	const [_precio, setPrecio] = useState("Dolares");
	const [marca_seleccionada, setMarca_seleccionada] = useState("");
	const [formEdit, setFormEdit] = useState(false);
	const [editar, setEditar] = useState(false);
	const [eliminar, setEliminar] = useState(false);
	const [editar_seleccionado, setEditar_seleccionado] = useState("");

	let precio_productos = Object.keys(
		productos.length > 0 && productos[0].precio
	);

	function handleSubmit(e) {
		e.preventDefault();
		if (input !== "") {
			obtenerProducto_por_nombre(input);
		}
	}

	 useLayoutEffect(() => {
    _obtenerProducto()
  },[])

	useEffect(() => {
		if (marca_seleccionada !== "") {
			obtenerProductos_filtrados(marca_seleccionada);
		}
	}, [marca_seleccionada]);

	return (
		<Flex>
			<HeaderAdmin />
			{formEdit && (
				<Box w='70%'>
					<EditProductos setFormEdit={setFormEdit}/>
				</Box>
			)}
			{productos.length > 0 && typeof productos !== "string" ? (
				<Box w="83%" m="auto" mt="30px">
					<form onSubmit={handleSubmit}>
						<Flex w="30%">
							<Input
								type={"text"}
								bg="#FFFF"
								mx="10px"
								placeholder="Buscar producto..."
								onChange={(e) => setInput(e.target.value)}
							/>
							<Button
								bg="#242525"
								color={"#FFFF"}
								_hover={{ bg: "#242525", color: "#FFFF" }}
								type="submit"
							>
								Buscar
							</Button>
						</Flex>
					</form>
					<Button
						m="12px"
						bg="#242525"
						color={"#FFFF"}
						_hover={{ bg: "#242525", color: "#FFFF" }}
						onClick={() => {
							setEliminar(false);
							setEditar(!editar);
						}}
					>
						Editar
					</Button>
					<Button
						m="12px"
						bg="#242525"
						color={"#FFFF"}
						_hover={{ bg: "#242525", color: "#FFFF" }}
						onClick={() => {
							setEditar(false);
							setEliminar(!eliminar);
						}}
					>
						Eliminar
					</Button>
					<Box h="500px" overflowY={"scroll"} borderRadius="10px" mt="30px">
						<TableContainer>
							<Table size={"md"} variant="striped" bg="#BFBFBF">
								<Thead bg="#242525" padding={"50px"}>
									<Tr>
										<Th color="#FFFF" textAlign={"center"}>
											Nombre
										</Th>
										<Th color="#FFFF" textAlign={"center"}>
											<Flex justifyContent="center">
												<Menu isLazy textAlign={"center"} autoSelect={false}>
													<MenuButton
														fontWeight={"extrabold"}
														textAlign="center"
													>
														<Flex align={"center"}>
															MARCA
															<Box mx="3px">
																<IoIosArrowDown />
															</Box>
														</Flex>
													</MenuButton>
													<MenuList
														color={"#242525"}
														h="200px"
														overflowX={"scroll"}
													>
														{productos.length > 0 &&
															typeof productos !== "string" &&
															_marca.map((elem, i) => {
																return (
																	<MenuItem
																		key={i}
																		onClick={() => setMarca_seleccionada(elem)}
																		bg={
																			_marca === marca_seleccionada && "#242525"
																		}
																		color={
																			_marca === marca_seleccionada && "#FFFF"
																		}
																		_hover={{
																			bg:
																				_marca === marca_seleccionada &&
																				"#242525",
																			color:
																				_marca === marca_seleccionada &&
																				"#FFFF",
																		}}
																	>
																		{elem}
																	</MenuItem>
																);
															})}
													</MenuList>
												</Menu>
											</Flex>
										</Th>
										<Th color="#FFFF" isNumeric>
											<Flex justifyContent="center">
												<Menu isLazy textAlign={"center"} autoSelect={false}>
													<MenuButton
														fontWeight={"extrabold"}
														textAlign="center"
													>
														<Flex align={"center"}>
															PRECIO
															<Box mx="3px">
																<IoIosArrowDown />
															</Box>
														</Flex>
													</MenuButton>
													<MenuList color={"#242525"}>
														{precio_productos.map((elem, i) => {
															return (
																<MenuItem
																	key={i}
																	onClick={() => setPrecio(elem)}
																	bg={_precio === elem && "#242525"}
																	color={_precio === elem && "#FFFF"}
																	_hover={{
																		bg: _precio === elem && "#242525",
																		color: _precio === elem && "#FFFF",
																	}}
																>
																	{elem}
																</MenuItem>
															);
														})}
													</MenuList>
												</Menu>
											</Flex>
										</Th>
										<Th color="#FFFF" textAlign={"center"}>
											Caracteristicas
										</Th>
										<Th color="#FFFF" textAlign={"center"} isNumeric>
											Stock
										</Th>
										<Th color="#FFFF" textAlign={"center"} isNumeric>
											Descuento
										</Th>
										<Th color="#FFFF" textAlign={"center"}>
											Imagenes
										</Th>
									</Tr>
								</Thead>
								<Tbody textAlign={"center"} bg="#FFFF">
									{productos.length > 0 &&
										typeof productos !== "string" &&
										productos.map((elem) => {
											return (
												<Tr key={elem.id}>
													<Td>
														{editar && !eliminar ? (
															<Flex justify={"space-between"}>
																<Box
																	cursor={"pointer"}
																	onClick={() => {
																		setFormEdit(true);
																		putProducto(elem);
																	}}
																>
																	<BiEditAlt />
																</Box>
																{elem.nombre.slice(0, 30)}
															</Flex>
														) : !editar && eliminar ? (
															<Flex justify={"space-between"}>
																<Box
																	cursor={"pointer"}
																	onClick={() => eliminarProducto(elem.id)}
																>
																	<MdDeleteOutline />
																</Box>
																{elem.nombre.slice(0, 30)}
															</Flex>
														) : (
															elem.nombre.slice(0, 30)
														)}
													</Td>
													<Td textAlign={"center"}>{elem.marca}</Td>
													<Td textAlign={"center"}>${elem.precio[_precio]}</Td>
													<Td textAlign={"center"}>caracteristicas</Td>
													<Td textAlign={"center"}>{elem.stock}</Td>
													<Td textAlign={"center"}>
														{elem.descuento === null ? `${0}%` : `${elem.descuento}%`}
													</Td>
													<Td textAlign={"center"}>
														<Img
															src={elem.imagen0}
															alt={elem.nombre}
															w="50px"
															borderRadius={"5px"}
														/>
													</Td>
												</Tr>
											);
										})}
								</Tbody>
							</Table>
						</TableContainer>
					</Box>
				</Box>
			) : (
				<Box w="80%" m="auto">
					<h2>No hay productos</h2>
					<p>
						Comienza agregando productos{" "}
						<span> y apareceran en este lugar</span>
					</p>
				</Box>
			)}
		</Flex>
	);
};

export default ObtenerProductosAdmin;
