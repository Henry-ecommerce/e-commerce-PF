import React, { useState, useEffect } from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	SimpleGrid,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import Alerta from "../../../helper/Alerta";
import useAuthAd from "../../../hooks/useAuthAd";
import "../Categoriass/Categorias.css";

const EditProductos = ({ setFormEdit }) => {
	const navegation = useNavigate();
	const [alerta, setAlerta] = useState({});
	const { producto, guardarProducto } = useAuthAd();
	const [from, setFrom] = useState({
		id: "",
		nombre: "",
		marca: "",
		funciones: "",
		stock: 0,
		descuento: "",
		imagen0: "",
		imagen1: "",
		imagen2: "",
	});
	const [caracterista, setCaracterista] = useState({});
	const [precio, setPrecio] = useState({});

	useEffect(() => {
		setFrom(producto);
		setCaracterista(producto.caracteristicas);
		setPrecio(producto.precio);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleOnchangue = (e) => {
		setFrom({ ...from, [e.target.name]: e.target.value });
	};

	const caracterisOnchange = (e) => {
		setCaracterista({ ...caracterista, [e.target.name]: e.target.value });
	};
	const precioOnchange = (e) => {
		setPrecio({ ...precio, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		const precioDMP = precio;
		const caracteristaS = caracterista;
		const productoNuevo = {
			id: from.id,
			nombre: from.nombre,
			marca: from.marca,
			funciones: from.funciones,
			stock: from.stock,
			precio: precioDMP,
			caracteristicas: caracteristaS,
			descuento: from.descuento,
			imagen0: from.imagen0,
			imagen1: from.imagen1,
			imagen2: from.imagen2,
		};

		guardarProducto(productoNuevo);
		setAlerta({
			msg: "Se edito correctamente",
			error: false,
		});
		setTimeout(() => {
			setAlerta({});
			navegation("/admin/edit");
			window.location.reload()
		}, 200);
	};
	const { msg } = alerta;
	return (
		<Flex
			align={"center"}
			justify={"center"}
			w={"80%"}
			position="absolute"
			zIndex={1000}
			className="form"
			top="60%"
			left="50%"
			bg="#EDF2F6"
			borderRadius={"10px"}
			boxShadow={"1px 5px 20px #1F2734"}
		>
			<Stack mx={"auto"} py={12}>
				{msg && <Alerta alerta={alerta} />}
				<Stack align={"center"}>
					<Button
						onClick={() => setFormEdit(false)}
						bg="#242525"
						color={"#FFFF"}
						position="absolute"
						left="10px"
						top="10px"
						_hover={{ bg: "#242525", color: "#FFFF" }}
					>
						x
					</Button>
					<Heading pb="30px" fontSize={"4xl"} textAlign={"center"}>
						Editar producto
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					w="1100px"
					m="auto"
					p={4}
				>
					<form onSubmit={handleSubmit} style={{ width: "100%" }}>
						<Stack spacing={4} /* bg='red' */>
							<SimpleGrid columns={2}>
								<Box>
									<Box m="10px">
										<FormControl
											bg="#ECEDEC"
											p="10px"
											borderRadius="10px"
											id="Nombre"
										>
											<FormLabel>Nombre</FormLabel>
											<Input
												_hover={{ borderColor: "#242526" }}
												borderColor="#242526"
												onChange={handleOnchangue}
												type="text"
												value={from.nombre}
												name="nombre"
												placeholder="Escribe nombre del producto"
												required
											/>
										</FormControl>
									</Box>
									<Box m="10px">
										<FormControl
											bg="#ECEDEC"
											p="10px"
											borderRadius="10px"
											id="marca"
										>
											<FormLabel>Marca</FormLabel>
											<Input
												_hover={{ borderColor: "#242526" }}
												borderColor="#242526"
												onChange={handleOnchangue}
												value={from.marca}
												name="marca"
												type="text"
												placeholder="Escribe la marca"
											/>
										</FormControl>
									</Box>
									<Box bg="#ECEDEC" p="10px" borderRadius="10px" m="10px">
										<FormLabel fontWeight={"extrabold"} textAlign="center">
											Precio
										</FormLabel>
										{Object.entries(precio).map((e, i) => {
											return (
												<FormControl
													bg="#ECEDEC"
													p="10px"
													borderRadius="10px"
													key={i + 1}
												>
													<FormLabel>{e[0]}</FormLabel>
													<Input
														_hover={{ borderColor: "#242526" }}
														borderColor="#242526"
														type="number"
														onChange={precioOnchange}
														value={e[1]}
														name={e[0]}
														placeholder="Precio"
													/>
												</FormControl>
											);
										})}
									</Box>
									<Box bg="#ECEDEC" p="10px" borderRadius="10px" m="10px">
										<FormLabel fontWeight={"extrabold"} textAlign="center">
											Caracteristicas
										</FormLabel>
										{Object.entries(caracterista).map((e, i) => {
											return (
												<FormControl
													bg="#ECEDEC"
													p="10px"
													borderRadius="10px"
													key={i}
												>
													<FormLabel>{e[0]}</FormLabel>
													<Input
														_hover={{ borderColor: "#242526" }}
														borderColor="#242526"
														type="text"
														onChange={caracterisOnchange}
														value={e[1]}
														name={e[0]}
														placeholder="Caracteristicas del producto"
													/>
												</FormControl>
											);
										})}
									</Box>
								</Box>
								<Box>
									<Box m="10px">
										<FormControl
											bg="#ECEDEC"
											p="10px"
											borderRadius="10px"
											m="10px"
											id="funciones" /* isRequired */
										>
											<FormLabel>Funciones del producto</FormLabel>
											{/* <InputGroup> */}
											<Input
												_hover={{ borderColor: "#242526" }}
												borderColor="#242526"
												type={"text"}
												onChange={handleOnchangue}
												value={from.funciones}
												name="funciones"
												placeholder="Funciones del producto"
											/>
											{/* </InputGroup> */}
										</FormControl>
									</Box>
									<Box m="10px">
										<FormControl
											bg="#ECEDEC"
											p="10px"
											borderRadius="10px"
											m="10px"
											id="stock" /* isRequired */
										>
											<FormLabel>Stock</FormLabel>
											<InputGroup>
												<Input
													_hover={{ borderColor: "#242526" }}
													borderColor="#242526"
													type="number"
													onChange={handleOnchangue}
													value={from.stock}
													name="stock"
													placeholder="Stock"
													m="10px"
												/>
											</InputGroup>
										</FormControl>
									</Box>
									<Box m="10px">
										<FormControl
											bg="#ECEDEC"
											p="10px"
											borderRadius="10px"
											m="10px"
											id="precio" /* isRequired */
										>
											<FormLabel>Descuento</FormLabel>
											<InputGroup>
												<Input
													_hover={{ borderColor: "#242526" }}
													borderColor="#242526"
													type={"text"} //hacer funcion de descuento
													onChange={handleOnchangue}
													value={from.descuento}
													name="descuento"
													placeholder="Descuento"
												/>
											</InputGroup>
										</FormControl>
									</Box>
									<Box bg="#ECEDEC" p="10px" borderRadius="10px" ml="20px">
									<FormLabel fontWeight={"extrabold"} textAlign="center">
										Imagenes
									</FormLabel>
									<Box m='10px'>
									<FormControl
										bg="#ECEDEC"
										// p="10px"
										borderRadius="10px"
										// m="10px"
										id="imagen0" /* isRequired */
									>
										<FormLabel>imagen 1</FormLabel>
										<InputGroup>
											<Input
												_hover={{ borderColor: "#242526" }}
												borderColor="#242526"
												type={"text"}
												onChange={handleOnchangue}
												value={from.imagen0}
												name="imagen0"
											/>
										</InputGroup>
									</FormControl>
									<FormControl
										bg="#ECEDEC"
										// p="10px"
										borderRadius="10px"
										my="8px"
										id="imagen1" /* isRequired */
									>
										<FormLabel>imagen 2</FormLabel>
										<InputGroup>
											<Input
												_hover={{ borderColor: "#242526" }}
												borderColor="#242526"
												type={"text"}
												onChange={handleOnchangue}
												value={from.imagen1}
												name="imagen1"
											/>
										</InputGroup>
									</FormControl>
									<FormControl
										// p="10px"
										borderRadius="10px"
										my="8px"
										id="password_confirm" /* isRequired */
									>
										<FormLabel>imagen 3</FormLabel>
										<InputGroup>
											<Input
												_hover={{ borderColor: "#242526" }}
												borderColor="#242526"
												type="text"
												onChange={handleOnchangue}
												value={from.imagen2}
												name="imagen2"
											/>
										</InputGroup>
									</FormControl>
									</Box>
								</Box>
								</Box>
							</SimpleGrid>
							<Stack spacing={10} pt={2}>
								<Button
									type="submit"
									loadingText="Submitting"
									w="40%"
									m="auto"
									size="lg"
									bg={"#252525"}
									color={"white"}
									_hover={{
										bg: "#252525",
									}}
								>
									Enviar cambios
								</Button>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};

export default EditProductos;
