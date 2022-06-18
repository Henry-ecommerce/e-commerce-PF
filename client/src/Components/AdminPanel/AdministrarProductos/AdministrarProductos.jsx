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
} from "@chakra-ui/react";
import React from "react";
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

const AdministrarProductos = () => {
	const { categorias, users } = useAuthAd();
	console.log(users);

	let _categorias = [
		{
			data: [80, 50, 30, 40, 100, 20],
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
		xaxis: {
			categories: categorias.map(({ nombre }) => nombre),
		},
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
			name: "Desktops",
			data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
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
			categories: [
				"Ene",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Ago",
				"Sep",
			],
		},
	};

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const d = new Date();
	let month = months[d.getMonth()];
	console.log(month);

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
							<Flex color="#4FC168" fontWeight="extrabold" align="center">
								<Box fontSize="22px">
									<MdKeyboardArrowUp />
								</Box>
								20%
							</Flex>
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
							<Flex color="#F1574F" fontWeight="extrabold" align="center">
								<Box fontSize="22px">
									<MdKeyboardArrowDown />
								</Box>
								20%
							</Flex>
						</Flex>
						<Box fontSize="30px">100</Box>
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
							<Flex color="#4FC168" fontWeight="extrabold" align="center">
								<Box fontSize="22px">
									<MdKeyboardArrowUp />
								</Box>
								20%
							</Flex>
						</Flex>
						<Box fontSize="30px">100</Box>
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
							<Flex color="#4FC168" fontWeight="extrabold" align="center">
								<Box fontSize="22px">
									<MdKeyboardArrowUp />
								</Box>
								20%
							</Flex>
						</Flex>
						<Box fontSize="30px">100</Box>
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
					<Text fontSize="14px" m="10px" mt="0" fontWeight="extrabold">
						Pedidos
					</Text>
					<TableContainer>
						<Table size="sm">
							<Thead>
								<Tr>
									<Th textAlign="center">Usuario</Th>
									<Th textAlign="center">Productos</Th>
									<Th textAlign="center">Cantidad</Th>
									<Th textAlign="center">Status</Th>
								</Tr>
							</Thead>
							<Tbody textAlign="center">
								<Tr>
									<Td textAlign="center">Tomas 1</Td>
									<Td textAlign="center">Producto 1</Td>
									<Td textAlign="center">2</Td>
									<Td textAlign="center">
										<Button
											fontSize="14px"
											variant="outline"
											color="#74CCBF"
											borderColor="#74CCBF"
										>
											Completado
										</Button>
									</Td>
								</Tr>
								<Tr>
									<Td textAlign="center">Tomas 2</Td>
									<Td textAlign="center">Producto 2</Td>
									<Td textAlign="center">3</Td>
									<Td textAlign="center">
										<Button
											fontSize="14px"
											variant="outline"
											color="#F6C644"
											borderColor="#F6C644"
										>
											Demorado
										</Button>
									</Td>
								</Tr>
								<Tr>
									<Td textAlign="center">Tomas 3</Td>
									<Td textAlign="center">Producto 3</Td>
									<Td textAlign="center">4</Td>
									<Td textAlign="center">
										<Button
											fontSize="14px"
											variant="outline"
											color="#F1574E"
											borderColor="#F1574E"
										>
											Cancelado
										</Button>
									</Td>
								</Tr>
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
								{users?.map(({ id, name, email, rol }) => {
									return (
										<Tr key={id}>
											<Td textAlign='center'>{name}</Td>
											<Td textAlign='center'>{email}</Td>
											<Td textAlign='center'>{rol}</Td>
											<Td textAlign='center'>Ninguna</Td>
										</Tr>
									);
								})}
								{/* <Tr>
									<Td textAlign="center">Tomas 2</Td>
									<Td textAlign="center">email@hotmail.com</Td>
									<Td textAlign="center">User</Td>
									<Td textAlign="center">1</Td>
								</Tr>
								<Tr>
									<Td textAlign="center">Tomas 3</Td>
									<Td textAlign="center">email@hotmail.com</Td>
									<Td textAlign="center">User</Td>
									<Td textAlign="center">2</Td>
								</Tr> */}
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</Flex>
	);
};

export default AdministrarProductos;
