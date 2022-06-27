import React, { useLayoutEffect } from "react";
import {
	Box,
	Flex,
	Stack,
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Td,
	Tbody,
	Text,
	Button,
	Select,
} from "@chakra-ui/react";
import HeaderAdmin from "../Admin/HeaderAdmin";
import {
	MdKeyboardArrowDown,
	MdKeyboardArrowUp,
	MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import ReactApexChart from "react-apexcharts";
import useAuthAd from "../../../hooks/useAuthAd";
import { Link } from "react-router-dom";

const AdministrarProductos = () => {
	const {
		categorias,
		users,
		tatalOrdenes,
		tatalGanancias,
		totalBalance,
		_obtenerPedidos,
		ventasProMes,
		totalPorCategorias,
		ordenes,
	} = useAuthAd();
	// console.log(totalPorCategorias, ' total categorias')
	// console.log(Object.keys(totalPorCategorias)?.map(e => categorias?.filter(m => m.id === Number(e)))?.map(e => e[0].nombre), ' Es esto')
	// console.log(categorias, ' categorias')
	useLayoutEffect(() => {
		_obtenerPedidos();
		window.scrollTo({ top: 0 });
	}, []);

	function color_estado(estado) {
		if (estado === "Completado") {
			return (
				<Text
					border="1px solid #00CA1B"
					p="10px"
					w="50%"
					m="auto"
					borderRadius="10px"
					fontWeight="extrabold"
					color="#00CA1B"
				>
					Completado
				</Text>
			);
		}
		if (estado === "Cancelado") {
			return (
				<Text
					border="1px solid #FF4E42"
					p="10px"
					w="50%"
					m="auto"
					borderRadius="10px"
					fontWeight="extrabold"
					color="#FF4E42"
				>
					Cancelado
				</Text>
			);
		}
		if (estado === "Procesando") {
			return (
				<Text
					border="1px solid #F6C644"
					p="10px"
					w="50%"
					m="auto"
					borderRadius="10px"
					fontWeight="extrabold"
					color="#F6C644"
				>
					Procesando
				</Text>
			);
		}
		if (estado === "Creado") {
			return (
				<Text
					border="1px solid #FF910B"
					p="10px"
					w="50%"
					m="auto"
					borderRadius="10px"
					fontWeight="extrabold"
					color="#FF910B"
				>
					Creado
				</Text>
			);
		}
	}

	let x =
		typeof totalPorCategorias !== "undefined"
			? Object.keys(totalPorCategorias)
					?.map((e) => categorias?.filter((m) => m.id === Number(e)))
					?.map((e) => e[0]?.nombre)
			: "";

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const d = new Date();
	let month = months[d.getMonth()];
	let comboMagico =
		typeof totalPorCategorias !== "undefined" &&
		Object.values(totalPorCategorias)
			.map((e, i) => [e, x[i]])
			.sort((a, b) => b[0] - a[0])
			.slice(0, 6);
	console.log(comboMagico);
	let _categorias = [
		{
			data: comboMagico ? comboMagico.map((e) => e[0]) : [],
		},
	];
	let categorias_options = {
		chart: {
			height: 350,
			type: "radar",
		},
		dataLabels: {
			enabled: true,
		},
		plotOptions: {
			radar: {
				size: 140,
				polygons: {
					strokeColors: "#e9e9e9",
					fill: {
						colors: ["#f8f8f8", "#fff"],
					},
				},
			},
		},
		colors: ["#40A0FC"],
		markers: {
			size: 4,
			colors: ["#fff"],
			strokeColor: "#40A0FC",
			strokeWidth: 2,
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return val;
				},
			},
		},
		xaxis: { categories: comboMagico ? comboMagico.map((e) => e[1]) : [] },
		yaxis: {
			tickAmount: 7,
			labels: {
				formatter: function (val, i) {
					if (i % 2 === 0) {
						return val;
					} else {
						return "";
					}
				},
			},
		},
	};

	let series = [
		{
			name: "Ventas ",
			data:
				ventasProMes !== undefined &&
				Object.values(ventasProMes)
					?.map((e) => e.length)
					.filter((e) => e > 0),
		},
	];
	let options = {
		chart: {
			height: 350,
			type: "line",
			zoom: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "straight",
		},
		title: {
			text: "Ventas historico anual",
			align: "left",
		},
		grid: {
			row: {
				colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
				opacity: 0.5,
			},
		},
		xaxis: {
			categories: months.slice(0, months.indexOf(month) + 1),
		},
	};

	return (
		<Flex justifyContent="space-between">
			<HeaderAdmin />
			<Box w="70%" mt="33px" mx="auto">
				<Flex w="100%">
					<Stack
						justify="space-between"
						bg="#FFFF"
						borderRadius="10px"
						p="10px"
						h="150px"
						w="600px"
						mx="10px"
						boxShadow="1px 10px 10px #AAAAAA"
					>
						<Flex justify="space-between">
							<Box color="#AAAAAA" fontWeight="extrabold">
								Usuarios
							</Box>
							{/* <Flex color="#4FC168" fontWeight="extrabold" align="center">
								<Box fontSize="22px">
									<MdKeyboardArrowUp />
								</Box>
								20%
							</Flex> */}
						</Flex>
						<Box fontSize="30px">{users.length}</Box>
						<Flex justify="space-between" align="center">
							<Box fontSize="10px">Ver todos los usuarios</Box>
							<Box bg="#ECEDED" p="5px" borderRadius="10px" fontSize="20px">
								<AiOutlineUser />
							</Box>
						</Flex>
					</Stack>
					<Stack
						justify="space-between"
						bg="#FFFF"
						borderRadius="10px"
						p="10px"
						h="150px"
						w="600px"
						mx="10px"
						boxShadow="1px 10px 10px #AAAAAA"
					>
						<Flex justify="space-between">
							<Box color="#AAAAAA" fontWeight="extrabold">
								Ordenes
							</Box>
							{/* <Flex color="#F1574F" fontWeight="extrabold" align="center">
								<Box fontSize="22px">
									<MdKeyboardArrowDown />
								</Box>
								20%
							</Flex> */}
						</Flex>
						<Box fontSize="30px">{tatalOrdenes}</Box>
						<Flex justify="space-between" align="center">
							<Box fontSize="10px">Ver todas las ordenes</Box>
							<Box bg="#FBEFD8" color="#C49453" p="8px" borderRadius="10px">
								<FiShoppingCart />
							</Box>
						</Flex>
					</Stack>
					<Stack
						justify="space-between"
						bg="#FFFF"
						borderRadius="10px"
						p="10px"
						h="150px"
						w="600px"
						mx="10px"
						boxShadow="1px 10px 10px #AAAAAA"
					>
						<Flex justify="space-between">
							<Box color="#AAAAAA" fontWeight="extrabold">
								Ganancias
							</Box>
							{/* <Flex color="#4FC168" fontWeight="extrabold" align="center">
								<Box fontSize="22px">
									<MdKeyboardArrowUp />
								</Box>
								20%
							</Flex> */}
						</Flex>
						<Box fontSize="30px">{tatalGanancias}</Box>
						<Flex justify="space-between" align="center">
							<Box fontSize="10px">Ver todas las ganancias</Box>
							<Box
								fontSize="20px"
								color="#318338"
								bg="#D3E9D2"
								p="5px"
								borderRadius="10px"
							>
								<RiMoneyDollarCircleLine />
							</Box>
						</Flex>
					</Stack>
					<Stack
						justify="space-between"
						bg="#FFFF"
						borderRadius="10px"
						p="10px"
						h="150px"
						w="600px"
						mx="10px"
						boxShadow="1px 10px 10px #AAAAAA"
					>
						<Flex justify="space-between">
							<Box color="#AAAAAA" fontWeight="extrabold">
								Balance
							</Box>
							{/* <Flex color="#4FC168" fontWeight="extrabold" align="center">
								<Box fontSize="22px">
									<MdKeyboardArrowUp />
								</Box>
								20%
							</Flex> */}
						</Flex>
						<Box fontSize="30px">{totalBalance}</Box>
						<Flex justify="space-between" align="center">
							<Box fontSize="10px">Ver el balance</Box>
							<Box bg="#F3CDF4" color="#620F61" borderRadius="10px" p="8px">
								<MdOutlineAccountBalanceWallet />
							</Box>
						</Flex>
					</Stack>
				</Flex>
				<Flex w="98%" m="auto" mt="33px" justify="space-between">
					<Box
						w="49%"
						bg="#FFFF"
						borderRadius="10px"
						boxShadow="1px 10px 10px #AAAAAA"
						p="10px"
					>
						<ReactApexChart
							options={options}
							series={series}
							type="line"
							height={350}
						/>
					</Box>
					<Box
						w="49%"
						bg="#FFFF"
						borderRadius="10px"
						boxShadow="1px 10px 10px #AAAAAA"
						p="10px"
					>
						<Text fontSize="14px" m="10px" mt="0" fontWeight="extrabold">
							Top 6 ventas por categoria
						</Text>
						<ReactApexChart
							options={categorias_options}
							series={_categorias}
							type="radar"
							height={350}
						/>
					</Box>
				</Flex>
				<Box
					bg="#FFFF"
					borderRadius="10px"
					boxShadow="1px 10px 10px #AAAAAA"
					p="10px"
					w="98%"
					m="auto"
					mt="40px"
					h="250px"
					overflowY="scroll"
				>
					<Flex justify="space-between">
						<Text fontSize="14px" m="10px" mt="0" fontWeight="extrabold">
							Pedidos
						</Text>
						<Text fontSize="14px" m="10px" mt="0" textDecor="underline">
							<Link to="/admin/ordenes">Ver todos los pedidos</Link>
						</Text>
					</Flex>
					<TableContainer>
						<Table size="sm">
							<Thead>
								<Tr>
									<Th textAlign="center" textTransform="capitalize">
										Productos
									</Th>
									{/* <Th textAlign="center" textTransform="capitalize">
										Cantidad total
									</Th> */}
									<Th textAlign="center" textTransform="capitalize">
										Total
									</Th>
									<Th textAlign="center" textTransform="capitalize">
										Status
									</Th>
								</Tr>
							</Thead>
							<Tbody textAlign="center">
								{ordenes.length > 0 &&
									ordenes.map((el) => {
										return (
											<Tr key={el.id}>
												{/* PRODUCTOS */}
												<Td w="35%">
													<Select>
														{el?.items?.map((e) => {
															return <option key={e.id}>{e.title}</option>;
														})}
													</Select>
												</Td>
												{/* PRODUCTOS */}
												{/* TOTAL */}
												<Td textAlign={"center"}>
													$ {el.payments[0].total_paid_amount}
												</Td>
												{/* TOTAL */}
												{/* STATUS */}
												<Td textAlign="center">
													{color_estado(el.estado_envio)}
												</Td>
												{/* STATUS */}
											</Tr>
										);
									})}
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
				<Box
					bg="#FFFF"
					borderRadius="10px"
					boxShadow="1px 10px 10px #AAAAAA"
					p="10px"
					w="98%"
					m="auto"
					mt="40px"
					h="250px"
					overflowY="scroll"
				>
					<Text fontSize="14px" m="10px" mt="0" fontWeight="extrabold">
						Usuarios
					</Text>
					<TableContainer>
						<Table size="sm">
							<Thead>
								<Tr>
									<Th textAlign="center">Nombre</Th>
									<Th textAlign="center">Email</Th>
									<Th textAlign="center">Status</Th>
									<Th textAlign="center">Compras</Th>
								</Tr>
							</Thead>
							<Tbody textAlign="center">
								{users?.map(({ id, name, email, rol, Pedidos }) => {
									return (
										<Tr key={id}>
											<Td textAlign="center">{name}</Td>
											<Td textAlign="center">{email}</Td>
											<Td textAlign="center">{rol}</Td>
											<Td textAlign="center">{Pedidos.length}</Td>
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</Flex>
	);
};

export default AdministrarProductos;
