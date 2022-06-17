import React from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Image,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";
import HeaderAdmin from "../Admin/HeaderAdmin";
import { useState } from "react";
import useAuth from "../../../hooks/useAuthAd";
import { useRef } from "react";
import { useEffect } from "react";

const AgregarProducto = () => {
	const input_img_ref = useRef();
	const { categorias, guardarProducto } = useAuth();
	const [cantidad_Caracteristicas, setCantidad_Caracteristicas] = useState([1]);
	const [moneda, setMoneda] = useState("Usd");
	const [errors, setErrors] = useState({});
	const [alerta, setAlerta] = useState({});
	const [imagenes, setImagenes] = useState([]);
	const [i, setI] = useState();
	const [imagenPreview, setImagenPreview] = useState([]);
	let [arrCategorias, setArrCategorias] = useState([]);
	let [form, setForm] = useState({
		name: "",
		precio: "",
		stock: "",
		descuento: "",
		marca: "",
		caracteristicas_texto: [],
		caracteristicas: {},
		caracteristicas_titulo: [],
	});

	useEffect(() => {
		if (i) {
			const fileReader = new FileReader();
			fileReader.onloadend = () => {
				if (
					!imagenPreview.includes(fileReader.result) &&
					imagenPreview.length < 3
				) {
					setImagenPreview([...imagenPreview, fileReader.result]);
				}
			};
			fileReader.readAsDataURL(i);
		} else {
			setImagenPreview([]);
		}
	}, [i]);

	const validation = (values) => {
		const errors = {};

		if (!values.name.trim()) {
			errors.name = "El campo es requerido";
		} else {
			errors.name = "";
		}
		if (!values.precio.trim()) {
			errors.precio = "El campo es requerido";
		} else {
			errors.precio = "";
		}
		if (!values.stock.trim()) {
			errors.stock = "El campo es requerido";
		} else {
			errors.stock = "";
		}
		if (!values.marca.trim()) {
			errors.marca = "El campo es requerido";
		} else {
			errors.marca = "";
		}
		if (values.caracteristicas_texto.length === 0) {
			errors.caracteristicas_texto = "El campo es requerido";
		} else {
			errors.caracteristicas_texto = "";
		}
		if (arrCategorias.length === 0) {
			errors.categorias = "El campo es requerido";
		} else {
			errors.categorias = "";
		}
		if (values.caracteristicas_titulo.length === 0) {
			errors.caracteristicas_titulo = "El campo es requerido";
		} else {
			errors.caracteristicas_titulo = "";
		}
		if (imagenes.length === 0) {
			errors.imgs = "El campo es requerido";
		} else {
			errors.imgs = "";
		}

		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log({ ...form, categorias: arrCategorias, imagenes: imagenes });
		handleChange(e);
		setErrors(validation(form));
		console.log(imagenes)
		try {
			console.log(
				{ ...form, categorias: arrCategorias, imagenes: imagenes },
				"soly el submit"
			);
			guardarProducto({
				...form,
				precio: { [moneda]: form.precio },
				categorias: arrCategorias,
				imagenes: imagenPreview,
			});
			// setForm({
			// 	name: "",
			// 	precio: "",
			// 	stock: "",
			// 	escuento: "",
			// 	marca: "",
			// 	caracteristicas_texto: [],
			// 	caracteristicas: {},
			// 	caracteristicas_titulo: [],
			// 	imgs: "",
			// });
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};
	const handleChange = (e) => {
		setErrors(validation(form));
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const { msg } = alerta;

	return (
		<Flex>
			<HeaderAdmin />
			<Box w="80%" m="auto" mt="30px" bg="#FFFF" p="15px" borderRadius={"10px"}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Crear Producto
					</Heading>
				</Stack>
				<form onSubmit={handleSubmit}>
					<Flex justify={"space-between"}>
						<Box w="50%">
							<Box>
								<FormControl
									w="80%"
									m="auto"
									my="10px"
									bg="#ECEDEC"
									p="10px"
									borderRadius={"8px"}
								>
									<FormLabel fontWeight={"extrabold"}>Nombre</FormLabel>
									<Input
										bg="#FFFF"
										onChange={handleChange}
										type="text"
										value={form.name}
										name="name"
										placeholder="Escribe el nombre"
									/>
									{errors.name && (
										<Text color="#FE0A01" m="10px">
											{errors.name}
										</Text>
									)}
								</FormControl>
							</Box>
							<Box>
								<FormControl
									w="80%"
									m="auto"
									my="10px"
									bg="#ECEDEC"
									p="10px"
									borderRadius={"8px"}
								>
									<FormLabel fontWeight={"extrabold"}>Precio</FormLabel>
									<Stack>
										<Menu>
											<MenuButton px={4} py={2} transition="all 0.2s">
												<Flex justify={"left"} align="center">
													{moneda}
													<Box mx="8px">
														<IoIosArrowDown />
													</Box>
												</Flex>
											</MenuButton>
											<MenuList>
												<MenuItem onClick={() => setMoneda("Usd")}>
													Usd
												</MenuItem>
												<MenuItem onClick={() => setMoneda("Mxs")}>
													Mxs
												</MenuItem>
												<MenuItem onClick={() => setMoneda("Ars")}>
													Ars
												</MenuItem>
											</MenuList>
										</Menu>

										<Input
											bg="#FFFF"
											// onBlur={handleOnblur}
											onChange={handleChange}
											type="precio"
											value={form.precio}
											name="precio"
										/>
									</Stack>
									{errors.precio && (
										<Text color="#FE0A01" m="10px">
											{errors.precio}
										</Text>
									)}
								</FormControl>
							</Box>
							<FormControl
								w="80%"
								m="auto"
								my="10px"
								bg="#ECEDEC"
								p="10px"
								borderRadius={"8px"}
							>
								<FormLabel fontWeight={"extrabold"}>Stock</FormLabel>
								<Input
									bg="#FFFF"
									// onBlur={handleOnblur}
									onChange={handleChange}
									value={form.stock}
									name="stock"
									type="number"
								/>
								{errors.stock && (
									<Text color="#FE0A01" m="10px">
										{errors.stock}
									</Text>
								)}
							</FormControl>
							<FormControl
								w="80%"
								m="auto"
								my="10px"
								bg="#ECEDEC"
								p="10px"
								borderRadius={"8px"}
							>
								<FormLabel fontWeight={"extrabold"}>Descuento</FormLabel>
								<Input
									bg="#FFFF"
									// onBlur={handleOnblur}
									onChange={handleChange}
									value={form.email}
									name="descuento"
									type="text"
								/>
								{errors.descuento && (
									<Text color="#FE0A01" m="10px">
										{errors.descuento}
									</Text>
								)}
							</FormControl>
							<FormControl
								w="80%"
								m="auto"
								my="10px"
								bg="#ECEDEC"
								p="10px"
								borderRadius={"8px"}
							>
								<FormLabel fontWeight={"extrabold"}>Categorias</FormLabel>
								<Menu>
									<MenuButton px={4} py={2} transition="all 0.2s">
										<Flex justify={"left"} align="center">
											Tarjetas Graficas
											<Box mx="8px">
												<IoIosArrowDown />
											</Box>
										</Flex>
									</MenuButton>
									<MenuList h="200px" overflowY={"scroll"}>
										{categorias?.length > 0 &&
											categorias.map((elem, i) => {
												return (
													<MenuItem
														key={elem.id}
														onClick={() =>
															setArrCategorias(
																!arrCategorias?.includes(elem.nombre)
																	? [...arrCategorias, elem.nombre]
																	: arrCategorias
															)
														}
													>
														{elem.nombre}
													</MenuItem>
												);
											})}
									</MenuList>
								</Menu>
								{arrCategorias?.length > 0 && (
									<Box w="50%">
										{arrCategorias?.map((elem, i) => {
											return (
												<Flex
													key={i}
													align="center"
													justify={"space-between"}
													bg="#FFFF"
													p={"10px"}
													borderRadius="5px"
													mt="8px"
												>
													<Text>{elem}</Text>
													<Button
														bg="#242524"
														color={"#FFFF"}
														_hover={{ bg: "#242524", color: "#FFFF" }}
														onClick={() =>
															setArrCategorias(
																(arrCategorias = arrCategorias.filter(
																	(categoria) => categoria !== elem
																))
															)
														}
														fontSize="10px"
														width={"15px"}
														mx="10px"
													>
														x
													</Button>
												</Flex>
											);
										})}
									</Box>
								)}
								{errors.categorias && (
									<Text color="#FE0A01" m="10px">
										{errors.categorias}
									</Text>
								)}
							</FormControl>
						</Box>
						<Box w="50%">
							<Box>
								<FormControl
									w="80%"
									m="auto"
									my="10px"
									bg="#ECEDEC"
									p="10px"
									borderRadius={"8px"}
								>
									<FormLabel fontWeight={"extrabold"}>Marca</FormLabel>
									<Input
										bg="#FFFF"
										// onBlur={handleOnblur}
										onChange={handleChange}
										type="text"
										value={form.marca}
										name="marca"
										placeholder="Marca del producto"
									/>
									{errors.marca && (
										<Text color="#FE0A01" m="10px">
											{errors.marca}
										</Text>
									)}
								</FormControl>
							</Box>

							<FormControl
								w="80%"
								m="auto"
								my="10px"
								bg="#ECEDEC"
								p="10px"
								borderRadius={"8px"}
							>
								<FormLabel fontWeight={"extrabold"}>Caracteristicas</FormLabel>
								{cantidad_Caracteristicas?.map((elem, i) => {
									return (
										<Flex justify={"space-between"} key={i}>
											<Box>
												<FormLabel fontWeight={"medium"}>Titulo</FormLabel>
												<Input
													bg="#FFFF"
													// onBlur={handleOnblur}
													onChange={handleChange}
													value={form.caracteristicas_titulo}
													name="caracteristicas_titulo"
													type="text"
												/>
												{errors.caracteristicas_titulo && (
													<Text color="#FE0A01" m="10px">
														{errors.caracteristicas_titulo}
													</Text>
												)}
											</Box>
											<Box>
												<FormLabel fontWeight={"medium"}>Texto</FormLabel>
												<Input
													bg="#FFFF"
													// onBlur={handleOnblur}
													onChange={handleChange}
													value={form.caracteristicas_texto}
													name="caracteristicas_texto"
													type="text"
												/>
												{}
												{errors.caracteristicas_texto && (
													<Text color="#FE0A01" m="10px">
														{errors.caracteristicas_texto}
													</Text>
												)}
											</Box>
										</Flex>
									);
								})}
								{cantidad_Caracteristicas.length < 4 && (
									<Button
										my="10px"
										onClick={() =>
											setCantidad_Caracteristicas([
												...cantidad_Caracteristicas,
												"1",
											])
										}
										bg="#242524"
										color={"#FFFF"}
										_hover={{ bg: "#242524", color: "#FFFF" }}
									>
										+
									</Button>
								)}
							</FormControl>

							<FormControl
								w="80%"
								m="auto"
								my="10px"
								bg="#ECEDEC"
								p="10px"
								borderRadius={"8px"}
							>
								<FormLabel fontWeight={"extrabold"}>Imagenes</FormLabel>
								<Input
									bg="#FFFF"
									// onBlur={handleOnblur}
									value={form.imagenes}
									name="imagenes"
									accept="image/*"
									type="file"
									ref={input_img_ref}
									onChange={(e) => {
										const file = e.target.files[0];
										if (file && file.type.substr(0, 5) === "image") {
											setI(file);
											setImagenes([...imagenes, file]);
										} else {
											setI(null);
										}
									}}
								/>
								{/* {imagenes.length < 3 && (
									<Button
										bg="#242524"
										color={"#FFFF"}
										_hover={{ bg: "#242524", color: "#FFFF" }}
										my="10px"
										onClick={() => {
											if (input_img_ref.current.value !== "") {
												setImagenes([...imagenes, input_img_ref.current.value]);
												input_img_ref.current.value = "";
											}
										}}
									>
										Agregar
									</Button>
								)} */}
								<Flex justify={"space-between"} align="center">
									{i !== null &&
										imagenPreview?.map((e, i) => {
											return (
												<Box w="100px">
													<Image
														src={e}
														alt="foto"
														w="100%"
														objectFit={"cover"}
														key={i}
													/>
												</Box>
											);
										})}
								</Flex>

								{errors.imagenes && (
									<Text color="#FE0A01" m="10px">
										{errors.imagenes}
									</Text>
								)}
								<SimpleGrid columns={3} justifyItems="center" mt="20px">
									{imagenes.length > 0 &&
										imagenes.map((elem, i) => {
											return (
												<Box>
													<Button
														bg="#242524"
														color={"#FFFF"}
														_hover={{ bg: "#242524", color: "#FFFF" }}
														borderRadius={"full"}
														top="14px"
														fontSize={"10px"}
														height="20px"
														left={"75%"}
														position="relative"
														onClick={() =>
															setImagenes(
																imagenes.filter((img) => img !== elem)
															)
														}
													>
														x
													</Button>
													<Image
														key={i}
														src={elem}
														alt={"foto"}
														w="100px"
														borderRadius={"3px"}
													/>
												</Box>
											);
										})}
								</SimpleGrid>
							</FormControl>
						</Box>
					</Flex>
					<Stack spacing={10} pt={5} w="30%" m={"auto"}>
						<Button
							type="submit"
							loadingText="Submitting"
							size="lg"
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
		</Flex>
	);
};

export default AgregarProducto;
