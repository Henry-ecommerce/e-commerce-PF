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
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthAd from "../../../hooks/useAuthAd";
import HeaderAdmin from "../Admin/HeaderAdmin";
const EditProductos = () => {
	const { producto } = useAuthAd();
	const [from, setFrom] = useState({
		nombre: "",
		marca: "",
		precio: "",
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleOnchangue = (e) => {
		setFrom({ ...from, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.prevenDefault();
	};
	const caracterisOnchange = (e) => {
		setCaracterista({ ...caracterista, [e.target.name]: e.target.value });
	};
	return (
		<Flex>
			<HeaderAdmin />
			<Flex mt="30px" align={"center"} justify={"center"} w={"90%"} m={"auto"}>
				<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
					<Stack align={"center"}>
						<Heading fontSize={"4xl"} textAlign={"center"}>
							Editar producto
						</Heading>
					</Stack>
					<Box
						rounded={"lg"}
						bg={useColorModeValue("white", "gray.700")}
						boxShadow={"lg"}
						p={100}
					>
						<form onSubmit={handleSubmit}>
							<Stack spacing={4}>
								<HStack>
									<Box>
										<FormControl id="Nombre" /* isRequired */>
											<FormLabel>Nombre</FormLabel>
											<Input
												onChange={handleOnchangue}
												type="text"
												value={from.nombre}
												name="nombre"
												placeholder="Escribe nombre del producto"
												required
											/>
										</FormControl>
									</Box>
								</HStack>
								<FormControl id="marca" /* isRequired */>
									<FormLabel>Marca</FormLabel>
									<Input
										onChange={handleOnchangue}
										value={from.marca}
										name="marca"
										type="text"
										placeholder="Escribe la marca"
									/>
								</FormControl>
								<FormControl id="precio" /* isRequired */>
									<FormLabel>Precio dolares</FormLabel>
									<InputGroup>
										<Input
											type="number"
											onChange={handleOnchangue}
											value={from.precio.Dolares}
											name="precio"
											placeholder="Precio en dolares"
										/>
									</InputGroup>
								</FormControl>
								<FormControl id="precio" /* isRequired */>
									<FormLabel>Precio pesos Arg</FormLabel>
									<InputGroup>
										<Input
											type="number"
											onChange={handleOnchangue}
											value={from.precio.PesosArg}
											name="precio"
											placeholder="precio en pesos Argentinos"
										/>
									</InputGroup>
								</FormControl>
								<FormControl id="precio" /* isRequired */>
									<FormLabel>Precio pesos Mexicanos</FormLabel>
									<InputGroup>
										<Input
											type="number"
											onChange={handleOnchangue}
											value={from.precio.PesosMX}
											name="precio"
											placeholder="precio en pesos Mexicanos"
										/>
									</InputGroup>
								</FormControl>
								{/*<FormControl id="caracteristicas" /* isRequired /** */}
								{Object.entries(caracterista).map((e, i) => {
									return (
										<FormControl key={i}>
											<FormLabel>{e[0]}</FormLabel>
											<Input
												type="text"
												onChange={caracterisOnchange}
												value={e[1]}
												name={e[0]}
												placeholder="Caracteristicas del producto"
											/>
										</FormControl>
									);
								})}
								{/*<FormControl id="caracteristicas" /* isRequired /** */}
								<FormControl id="funciones" /* isRequired */>
									<FormLabel>Funciones del producto</FormLabel>
									<InputGroup>
										<Input
											type={"text"}
											onChange={handleOnchangue}
											value={from.funciones}
											name="funciones"
											placeholder="Funciones del producto"
										/>
									</InputGroup>
								</FormControl>
								<FormControl id="stock" /* isRequired */>
									<FormLabel>Stock</FormLabel>
									<InputGroup>
										<Input
											type="number"
											onChange={handleOnchangue}
											value={from.stock}
											name="stock"
											placeholder="Stock"
										/>
									</InputGroup>
								</FormControl>
								<FormControl id="precio" /* isRequired */>
									<FormLabel>Descuento</FormLabel>
									<InputGroup>
										<Input
											type={"text"} //hacer funcion de descuento
											onChange={handleOnchangue}
											value={from.descuento}
											name="descuento"
											placeholder="Descuento"
										/>
									</InputGroup>
								</FormControl>
								<FormControl id="imagen0" /* isRequired */>
									<FormLabel>imagen 1</FormLabel>
									<InputGroup>
										<Input
											type={"text"}
											onChange={handleOnchangue}
											value={from.imagen0}
											name="imagen0"
										/>
									</InputGroup>
								</FormControl>
								<FormControl id="imagen1" /* isRequired */>
									<FormLabel>imagen 2</FormLabel>
									<InputGroup>
										<Input
											type={"text"}
											onChange={handleOnchangue}
											value={from.imagen1}
											name="imagen1"
										/>
									</InputGroup>
								</FormControl>
								<FormControl id="password_confirm" /* isRequired */>
									<FormLabel>imagen 3</FormLabel>
									<InputGroup>
										<Input
											type="text"
											onChange={handleOnchangue}
											value={from.imagen2}
											name="imagen2"
										/>
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
										Enviar cambios
									</Button>
								</Stack>
								<Stack pt={6}>
									<Text align={"center"}>
										Regresar a tabla
										<RouterLink style={{ color: "#4399E1" }} to="/admin/edit">
											{" "}
											producto
										</RouterLink>
									</Text>
								</Stack>
							</Stack>
						</form>
					</Box>
				</Stack>
			</Flex>
		</Flex>
	);
};

export default EditProductos;
