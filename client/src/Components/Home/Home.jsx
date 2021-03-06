import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { get_all_products, get_user_favorites } from "../../Redux/Actions";
import Carousel from "../ProductCarousel/Carousel";
import MensajesAutomaticos from "../MensajesAutomaticos/MensajesAutomaticos";
import {
	AiOutlineEnvironment,
	AiOutlineCreditCard,
	AiOutlineCheckCircle,
} from "react-icons/ai";
import { Box, Flex, Text } from "@chakra-ui/react";

import FrontPageSlide from "../FrontPageSlide/FrontPageSlide";
import { useState } from "react";
import { MdHelpOutline, MdHighlightOff } from "react-icons/md";
import axios from 'axios'

const Home = () => {
	const { products } = useSelector((state) => state);
	const [visible, setVisible] = useState("");
  const [prosuctosMasVendidos, setProsuctosMasVendidos] = useState([]);
  // console.log(prosuctosMasVendidos, ' productos mas vendidos')

	const dispatch = useDispatch();

	let m = products?.filter((e) => e.descuento !== null && e.descuento > 0);
	let productos_descuento = [
		m.slice(0, m.length - 1),
		products?.slice(12, 24),
		products?.slice(24, 36),
	];
	let productos_sin_descuento = prosuctosMasVendidos
	let productos_pocas_unidades = [
		products?.filter((e) => e.stock <= 10).slice(0, 12),
		products?.slice(12, 24),
		products?.slice(24, 36),
	];

	let user = JSON.parse(localStorage.getItem("info_user"));

  async function get_productos_mas_vendidos() {
    const {data} = await axios.get('/pedidos')
    setProsuctosMasVendidos(data.sort((a,b) => b.total_en_ventas - a.total_en_ventas))
  }

	useEffect(() => {
		dispatch(get_user_favorites(user?.id));
		dispatch(get_all_products());
    get_productos_mas_vendidos()
	}, [dispatch]);

	// let productos_descuento = [
	//   products
	//     ?.filter((e) => e.descuento !== null && e.descuento > 0)
	//     .slice(0, 12),
	//   products?.slice(12, 24),
	//   products?.slice(24, 36),
	// ];
	// let productos_sin_descuento = products?.filter(
	//   (e) => e.descuento === null || e.descuento === 0
	// ); // ESTO ES TEMPORAL, CUENTO TENGAMOS LO DE LAS COMPRAS SE VA A CAMBIAR
	// let productos_pocas_unidades = [
	//   products?.filter((e) => e.stock <= 10).slice(0, 12),
	//   products?.slice(12, 24),
	//   products?.slice(24, 36),
	// ];

	const division = [
		productos_sin_descuento.slice(0, 12),
		products?.slice(12, 24),
		products?.slice(24, 36),
	];

	return (
		<>
			<Box
				position="fixed"
				zIndex={"2000"}
				left="calc(98vw - 360px)"
				top="calc(98vh - 600px)"
			>
				<Box position={"absolute"} top={"100px"}>
					<Flex ml="10px" display={visible ? "visible" : "none"}>
						<MensajesAutomaticos></MensajesAutomaticos>
					</Flex>

					<Box
						position={"absolute"}
						maxW="40px"
						p="5px 5px 5px 5px"
						fontSize={"30px"}
						color={"white"}
						textAlign={"center"}
						bg="#242525"
						borderRadius="50%"
						m="10px"
						mt={visible ? null : "435px"}
						ml="320px"
						boxShadow="md"
						cursor={"pointer"}
						_hover={{ bg: "#9a9a9a" }}
						onClick={(e) => setVisible(visible ? false : true)}
					>
						{visible ? (
							<MdHighlightOff></MdHighlightOff>
						) : (
							<MdHelpOutline></MdHelpOutline>
						)}
					</Box>
				</Box>
			</Box>
			<Box mb="20px" textAlign={"center"}>
				<FrontPageSlide></FrontPageSlide>
			</Box>
			<Box
				width="70vw"
				maxWidth="1440px"
				ml="auto"
				mr="auto"
				fontSize="2.5em"
				fontWeight="550"
			>
				<Text fontSize={"25px"}>Productos en oferta</Text>
			</Box>
			<Box mt="25px" mb="25px">
				<Carousel items={productos_descuento[0]} />
			</Box>

			<Box
				width="auto"
				height="fit-content"
				minHeight="174px"
				m={"25px auto 25px auto"}
				borderTop=" 2px solid #D9D9D9"
				borderBottom="2px solid #D9D9D9"
			>
				<Flex
					m={"0px auto 0px auto"}
					width="60vw"
					maxWidth="1440px"
					justifyContent="space-between"
					wrap="wrap"
					minHeight="174px"
					height="fit-content"
					color="#9A9A9A"
					fontSize="calc(20px + 0.5vw)"
				>
					<Flex align="center" mt="10px" mb="5px">
						<Box fontSize="40px" mr="15px">
							<AiOutlineEnvironment />{" "}
						</Box>
						<Text fontSize={"20px"}>
							Envios a cualquier <br />
							parte del mundo
						</Text>
					</Flex>

					<Flex align="center" mt="10px" mb="10px">
						<Box fontSize="40px" mr="15px">
							<AiOutlineCreditCard />
						</Box>
						<Text fontSize={"20px"}>
							Paga como quieras
							<br />
							credito debito y mas
						</Text>
					</Flex>

					<Flex align="center" mt="5px" mb="10px">
						<Box fontSize="40px" mr="15px">
							<AiOutlineCheckCircle />
						</Box>
						<Text fontSize={"20px"}>
							Registrate y obten
							<br />
							beneficios exclusivos
						</Text>
					</Flex>
				</Flex>
			</Box>

			<Box
				width="70vw"
				maxWidth="1440px"
				ml="auto"
				mr="auto"
				fontSize="2.5em"
				fontWeight="550"
			>
				<Text fontSize="25px">Mas Vendidos</Text>
			</Box>
			<Box mt="25px" mb="25px">
				<Carousel items={division[0]} />
			</Box>

			<Box
				width="70vw"
				maxWidth="1440px"
				ml="auto"
				mr="auto"
				fontSize="2.5em"
				fontWeight="550"
			>
				<Text fontSize="25px">Ultimas Unidades</Text>
			</Box>
			<Box mt="25px" mb="25px">
				<Carousel items={productos_pocas_unidades[0]} />
			</Box>
		</>
	);
};

export default Home;
