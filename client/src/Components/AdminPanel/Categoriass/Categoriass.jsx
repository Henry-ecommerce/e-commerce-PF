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
	Button,
	Box,
	Text,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Select,
} from "@chakra-ui/react";
import React, { useRef, useState, useLayoutEffect, useReducer } from "react";
import useAuthAd from "../../../hooks/useAuthAd";
import HeaderAdmin from "../Admin/HeaderAdmin";
import { BiEditAlt } from "react-icons/bi";
import cargando from "../../../Loading/loading.svg";
import { MdRestorePage } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import "./Categorias.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Categoriass = () => {
	const nivigation = useNavigate();
	const selectAgergarProductos = useRef();
	const [editar, setEditar] = useState(false);
	const [agregar, setAgregar] = useState(false);
	let [errors, setErrors] = useState({
		nombre: "",
		productos: "",
	});
	const [eliminar, setEliminar] = useState(false);
	const [productos_de_agregar, setProductos_de_agregar] = useState([]);
	const [OpenForm, setOpenForm] = useState(false);
	const [enviarPutCategoria, setEnviarPutCategoria] = useState(false);
	const [infoCategoria, setInfoCategoria] = useState();
	const [nombreCategoriaInput, setNombreCategoriaInput] = useState("");
	const [nuevosProductosEditarCategoria, setNuevosProductosEditarCategoria] =
		useState([]);
	const [productos_a_eliminar_editar, setProductos_a_eliminar_editar] =
		useState([]);
	const [actualizar, setActualizar] = useState(false);
	const [loading, setloading] = useState(false);

	const {
		categorias,
		agregarCategorias,
		productos,
		eliminarCategoria,
		_obtenerCategorias,
		actualizarCategoria_nombre,
		actualizarCategoria_agregar_relacion,
		actualizarCategoria_eliminar_relacion,
		actualizarCategoria_agregar_eliminar_relacion,
	} = useAuthAd();
	const [ignore, forceUpdate] = useReducer((x) => x + 1, 0);
	useLayoutEffect(() => {
		// setCategorias(_obtenerCategorias());
		_obtenerCategorias();
		window.scrollTo({ top: 0 });
	}, [ignore]);

	function foo() {
		return categorias
			.filter(({ nombre }) => nombre === infoCategoria.nombre)
			.map(({ Productos }) => {
				return Productos.map((e) => e.nombre)
					.concat(nuevosProductosEditarCategoria)
					.filter((numero, pos, num) => {
						return pos === num.indexOf(numero);
					})
					.filter((elem) => !productos_a_eliminar_editar.includes(elem))
					.map((elem, i) => {
						return (
							<Flex justify={"space-between"} align="center">
								<Box key={i}>{elem.slice(0, (elem?.length * 50) / 100)}</Box>
								<Button
									bg={"#242524"}
									color={"white"}
									_hover={{
										bg: "#242524",
									}}
									onClick={() =>
										productos_a_eliminar_editar.includes(elem)
											? setProductos_a_eliminar_editar(
													productos_a_eliminar_editar.filter((e) => e !== elem)
											  )
											: nuevosProductosEditarCategoria.includes(elem)
											? setNuevosProductosEditarCategoria(
													nuevosProductosEditarCategoria.filter(
														(e) => e !== elem
													)
											  )
											: setProductos_a_eliminar_editar([
													...productos_a_eliminar_editar,
													elem,
											  ])
									}
								>
									{productos_a_eliminar_editar.includes(elem) ? (
										<MdRestorePage />
									) : (
										"x"
									)}
								</Button>
							</Flex>
						);
					});
			});
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (
			infoCategoria.id &&
			nombreCategoriaInput &&
			productos_a_eliminar_editar.length > 0 &&
			nuevosProductosEditarCategoria.length > 0
		) {
			setEditar(false);
			setOpenForm(false);
			actualizarCategoria_agregar_eliminar_relacion(
				infoCategoria.id,
				nombreCategoriaInput,
				productos_a_eliminar_editar,
				nuevosProductosEditarCategoria
			);
			setloading(true);
			if (
				productos_a_eliminar_editar.length > 8 &&
				nuevosProductosEditarCategoria > 8
			) {
				setTimeout(() => {
					setloading(false);
					window.location.reload(false);
				}, 4000);
			} else if (
				productos_a_eliminar_editar.length > 8 ||
				nuevosProductosEditarCategoria.length > 8
			) {
				setTimeout(() => {
					setloading(false);
					window.location.reload(false);
				}, 3000);
			} else {
				setTimeout(() => {
					setloading(false);
					window.location.reload(false);
				}, 1500);
			}
			// nivigation(`/admin/categorias/${Math.random(0, Infinity)}`);
			// nivigation(`/admin/categorias`)
			forceUpdate();
		} else if (
			infoCategoria.id &&
			nombreCategoriaInput &&
			productos_a_eliminar_editar.length > 0 &&
			nuevosProductosEditarCategoria.length === 0
		) {
			setEditar(false);
			setOpenForm(false);
			actualizarCategoria_eliminar_relacion(
				infoCategoria.id,
				nombreCategoriaInput,
				productos_a_eliminar_editar
			);
			setloading(true);
			if (
				productos_a_eliminar_editar.length > 8 &&
				nuevosProductosEditarCategoria > 8
			) {
				setTimeout(() => {
					setloading(false);
					window.location.reload(false);
				}, 4000);
			} else if (
				productos_a_eliminar_editar.length > 8 ||
				nuevosProductosEditarCategoria.length > 8
			) {
				setTimeout(() => {
					setloading(false);
					window.location.reload(false);
				}, 3000);
			} else {
				setTimeout(() => {
					setloading(false);
					window.location.reload(false);
				}, 1500);
			}
			// nivigation(`/admin/categorias/${Math.random(0, Infinity)}`);
			// nivigation(`/admin/categorias`)
			forceUpdate();
		} else if (
			infoCategoria.id &&
			nombreCategoriaInput &&
			productos_a_eliminar_editar.length === 0 &&
			nuevosProductosEditarCategoria.length > 0
		) {
			setEditar(false);
			setOpenForm(false);
			actualizarCategoria_agregar_relacion(
				infoCategoria.id,
				nombreCategoriaInput,
				nuevosProductosEditarCategoria
			);
			setloading(true);
			if (
				productos_a_eliminar_editar.length > 8 &&
				nuevosProductosEditarCategoria > 8
			) {
				setTimeout(() => {
					setloading(false);
					window.location.reload(false);
				}, 4000);
			} else if (
				productos_a_eliminar_editar.length > 8 ||
				nuevosProductosEditarCategoria.length > 8
			) {
				setTimeout(() => {
					setloading(false);
					window.location.reload(false);
				}, 3000);
			} else {
				setTimeout(() => {
					setloading(false);
					window.location.reload(false);
				}, 1500);
			}
			// nivigation(`/admin/categorias/${Math.random(0, Infinity)}`);
			// nivigation(`/admin/categorias`)
			forceUpdate();
		} else if (
			infoCategoria.id &&
			nombreCategoriaInput &&
			productos_a_eliminar_editar.length === 0 &&
			nuevosProductosEditarCategoria.length === 0
		) {
			setEditar(false);
			setOpenForm(false);
			actualizarCategoria_nombre(infoCategoria.id, nombreCategoriaInput);
			setloading(true);
			if (
				productos_a_eliminar_editar.length > 8 &&
				nuevosProductosEditarCategoria > 8
			) {
				setTimeout(() => {
					setloading(false);
					window.location.reload(false);
				}, 4000);
			} else if (
				productos_a_eliminar_editar.length > 8 ||
				nuevosProductosEditarCategoria.length > 8
			) {
				setTimeout(() => {
					setloading(false);
					window.location.reload(false);
				}, 3000);
			} else {
				setTimeout(() => {
					setloading(false);
					window.location.reload(false);
				}, 1500);
			}
			// nivigation(`/admin/categorias/${Math.random(0, Infinity)}`);
			// nivigation(`/admin/categorias`)
			forceUpdate();
		}
	}

	function handleSubmitAgregar(e) {
		e.preventDefault();
		if (nombreCategoriaInput === "") {
			setErrors((errors = { ...errors, nombre: "Campo requerido" }));
		} else {
			setErrors((errors = { ...errors, nombre: "" }));
		}
		if (productos_de_agregar.length === 0) {
			setErrors((errors = { ...errors, productos: "Campo requerido" }));
		} else {
			setErrors((errors = { ...errors, productos: "" }));
		}

		if (errors.nombre === "" && errors.productos === "") {
			agregarCategorias(nombreCategoriaInput, productos_de_agregar);
			setloading(true);
			setTimeout(() => {
				setloading(false);
				window.location.reload(false);
			}, 1000);
		}
	}

	return (
		<Flex alignItems="start">
			<HeaderAdmin />
			{loading ? (
				<Box className="form" position="absolute" top="30%" left="50%">
					<img src={cargando} width="80px" alt="cargando" />
				</Box>
			) : (
				<>
					{OpenForm && !agregar ? (
						<Box
							className="form"
							position={"absolute"}
							top="35%"
							left="50%"
							bg="#FFFF"
							p="20px"
							w="500px"
							borderRadius={"10px"}
							zIndex={10}
							boxShadow={"1px 1px 15px #1F2733"}
						>
							<Button
								mb="20px"
								onClick={() => {
									setProductos_a_eliminar_editar([]);
									setNuevosProductosEditarCategoria([]);
									setOpenForm(false);
								}}
								bg="#242524"
								color="#FFFF"
							>
								x
							</Button>
							<form onSubmit={handleSubmit}>
								<FormControl mb={"15px"}>
									<FormLabel>Nombre</FormLabel>
									<Input
										type="text"
										onChange={(e) => setNombreCategoriaInput(e.target.value)}
										value={nombreCategoriaInput}
										name="nombre"
									/>
								</FormControl>
								{categorias?.find(
									({ nombre }) => nombre === infoCategoria.nombre
								).Productos?.length > 0 ? (
									<Stack>
										<Stack
											bg="#ECEDEC"
											p="10px"
											borderRadius="10px"
											h="300px"
											overflowY="scroll"
										>
											{foo()}
										</Stack>
										<Flex>
											<Select ref={selectAgergarProductos}>
												{productos?.length > 0 &&
													productos?.map(({ nombre, id }) => {
														return <option key={id}>{nombre}</option>;
													})}
											</Select>
											<Button
												bg="#242524"
												color="#FFFF"
												_hover={{
													bg: "#242524",
												}}
												onClick={() =>
													productos_a_eliminar_editar.includes(
														selectAgergarProductos.current.value
													)
														? setProductos_a_eliminar_editar(
																productos_a_eliminar_editar.filter(
																	(e) =>
																		e !== selectAgergarProductos.current.value
																)
														  )
														: setNuevosProductosEditarCategoria(
																!nuevosProductosEditarCategoria.includes(
																	selectAgergarProductos.current.value
																) &&
																	!nuevosProductosEditarCategoria.includes(
																		foo()
																	)
																	? [
																			...nuevosProductosEditarCategoria,
																			selectAgergarProductos.current.value,
																	  ]
																	: nuevosProductosEditarCategoria
														  )
												}
											>
												+
											</Button>
										</Flex>
									</Stack>
								) : (
									<Stack>
										{nuevosProductosEditarCategoria.length > 0 ? (
											<Stack
												bg="#ECEDEC"
												p="10px"
												borderRadius="10px"
												h={foo().length < 10 ? "-webkit-fit-content" : "300px"}
												overflowY="scroll"
											>
												{foo()}
											</Stack>
										) : (
											<Text color="#FF3E32">No tiene productos</Text>
										)}
										<Flex>
											<Select ref={selectAgergarProductos}>
												{productos?.length > 0 &&
													productos?.map(({ nombre, id }) => {
														return <option key={id}>{nombre}</option>;
													})}
											</Select>
											<Button
												bg="#242524"
												color="#FFFF"
												_hover={{
													bg: "#242524",
												}}
												onClick={() =>
													setNuevosProductosEditarCategoria(
														!nuevosProductosEditarCategoria.includes(
															selectAgergarProductos.current.value
														) && !nuevosProductosEditarCategoria.includes(foo())
															? [
																	...nuevosProductosEditarCategoria,
																	selectAgergarProductos.current.value,
															  ]
															: nuevosProductosEditarCategoria
													)
												}
											>
												+
											</Button>
										</Flex>
									</Stack>
								)}
								<Stack spacing={6}>
									<Button
										mt={4}
										type="submit"
										bg={"#242524"}
										color={"white"}
										_hover={{
											bg: "#242524",
										}}
										onClick={() => setEnviarPutCategoria(true)}
									>
										Guardar
									</Button>
								</Stack>
							</form>
						</Box>
					) : (
						!OpenForm &&
						agregar && (
							<Box
								className="form"
								position={"absolute"}
								top="20%"
								left="50%"
								bg="#FFFF"
								p="20px"
								borderRadius={"10px"}
								zIndex={10}
								boxShadow={"1px 1px 15px #1F2733"}
							>
								<Button
									onClick={() => setAgregar(false)}
									bg="#242524"
									color="#FFFF"
									mb="10px"
								>
									x
								</Button>
								<form onSubmit={handleSubmitAgregar}>
									<FormControl>
										<FormLabel>Nombre</FormLabel>
										<Input
											type="text"
											onChange={(e) => setNombreCategoriaInput(e.target.value)}
											name="nombre"
										/>
										{errors !== undefined && (
											<Text color={"#FF555D"}>{errors.nombre}</Text>
										)}
									</FormControl>
									<Select
										my="10px"
										onChange={(e) =>
											setProductos_de_agregar(
												!productos_de_agregar.includes(e.target.value)
													? [...productos_de_agregar, e.target.value]
													: productos_de_agregar
											)
										}
									>
										{productos.length > 0 &&
											productos.map((elem) => {
												return <option key={elem.id}>{elem.nombre}</option>;
											})}
									</Select>
									<Box bg="#ECEDED" borderRadius="10px">
										{productos_de_agregar?.length > 0 &&
											productos_de_agregar.map((elem, i) => {
												return (
													<Flex
														key={i}
														p="10px"
														justify={"space-between"}
														align="center"
													>
														<Text>
															{elem.slice(0, (elem.length * 50) / 100)}
														</Text>
														<Button
															bg="#242524"
															color="#FFFF"
															onClick={() =>
																setProductos_de_agregar(
																	productos_de_agregar.filter((e) => e !== elem)
																)
															}
														>
															x
														</Button>
													</Flex>
												);
											})}
									</Box>
									{errors?.productos && (
										<Text color={"#FF555D"}>{errors?.productos}</Text>
									)}
									<Stack spacing={6}>
										<Button
											mt={4}
											type="submit"
											bg={"#242524"}
											color={"white"}
											_hover={{
												bg: "#242524",
											}}
										>
											Agregar
										</Button>
									</Stack>
								</form>
							</Box>
						)
					)}
					<TableContainer w="80%" m="auto" borderRadius="10px" mt="20px">
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
								setAgregar(false);
								setEditar(false);
								setEliminar(!eliminar);
							}}
						>
							Eliminar
						</Button>
						<Button
							m="12px"
							bg="#242525"
							color={"#FFFF"}
							_hover={{ bg: "#242525", color: "#FFFF" }}
							onClick={() => {
								setOpenForm(false);
								setEditar(false);
								setAgregar(true);
							}}
						>
							Agregar
						</Button>
						<Box h="500px" overflowY={"scroll"} borderRadius="10px">
							<Table variant="striped" bg="#FFFF">
								<Thead bg="#242525">
									<Tr>
										<Th color="#FFFF">Id</Th>
										<Th color="#FFFF">Nombre Categoria</Th>
										<Th color="#FFFF" isNumeric>
											Productos
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									{categorias.length > 0 &&
										typeof categorias !== "string" &&
										categorias
											.sort((a, b) => a.id - b.id)
											.map((elem) => {
												return (
													<Tr key={elem.id}>
														<Td>
															{" "}
															{editar && !eliminar ? (
																<Flex>
																	<Box
																		cursor={"pointer"}
																		mr="15px"
																		onClick={() => {
																			setOpenForm(true);
																			setInfoCategoria(elem);
																			setNombreCategoriaInput(elem.nombre);
																		}}
																	>
																		<BiEditAlt />
																	</Box>
																	{elem.id}
																</Flex>
															) : !editar && eliminar ? (
																<Flex>
																	<Box
																		cursor={"pointer"}
																		mr="15px"
																		onClick={() => {
																			eliminarCategoria(elem.id);
																		}}
																	>
																		<MdDeleteOutline />
																	</Box>
																	{elem.id}
																</Flex>
															) : (
																elem.id
															)}
														</Td>
														<Td>{elem.nombre}</Td>
														<Td w="30%">
															{elem?.Productos?.length > 0 ? (
																<Select  bg="#242524" color="#FFFF">
																	{elem?.Productos?.map(({ nombre, id }) => {
																		return <option key={id} style={{color:'black'}}>{nombre}</option>;
																	})}
																</Select>
															) : (
																<Text color="#FF3E32" textAlign="center ">
																	No tiene productos
																</Text>
															)}
														</Td>
														{/* <Td isNumeric>
														{elem?.Productos?.length > 0 ? (
															<Menu textAlign={"center"} autoSelect={false}>
																<MenuButton textAlign="center">
																	<Flex align={"center"}>
																		Productos
																		<Box mx="3px">
																			<IoIosArrowDown />
																		</Box>
																	</Flex>
																</MenuButton>
																<MenuList
																	color={"#242525"}
																	h={
																		elem?.Productos.length <= 10
																			? "-webkit-fit-content"
																			: "200px"
																	}
																	overflowX={"scroll"}
																>
																	{elem?.Productos?.map(({ nombre, id }) => {
																		return <MenuItem key={id}>{nombre}</MenuItem>;
																	})}
																</MenuList>
															</Menu>
														) : (
															<Text color="#FF3E32">No tiene productos</Text>
														)}
													</Td> */}
													</Tr>
												);
											})}
								</Tbody>
							</Table>
						</Box>
					</TableContainer>
				</>
			)}
		</Flex>
	);
};

export default Categoriass;
