import {
	Flex,
	Box,
	Image,
	useColorModeValue,
	Stack,
	IconButton,
	useBreakpointValue,
	Heading,
	Text,
	Container,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import AddToCart from "../AddToCardComponents/AddToCart";
import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import Slider from "react-slick";

function Product({
	nombre,
	marca,
	precio,
	imagen0,
	imagen1,
	imagen2,
	id,
	origin,
}) {
	nombre = nombre.split(",")[0];
	const cards = [
		imagen0,
		"https://programacion.net/files/article/20161110041116_image-not-found.png",
		"https://programacion.net/files/article/20161110041116_image-not-found.png",
	];
	const settings = {
		dots: true,
		arrows: false,
		fade: true,
		infinite: true,
		autoplay: false,
		speed: 500,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	// As we have used custom buttons, we need a reference variable to
	// change the state
	const [slider, setSlider] = useState(null);
	const top = useBreakpointValue({ base: "90%", md: "34%" });
	const side = useBreakpointValue({ base: "30%", md: "15px" });

	return (
		<Stack w="full" alignItems="center" justifyContent="space-between">
			<Box
				bg={useColorModeValue("white", "gray.800")}
				w={["300px", "300px", "400px", "300px", "300px"]}
				borderWidth="1px"
				rounded="lg"
				shadow="lg"
				position="relative"
				h="413px"
			>
				<Flex>
					<Box position={"absolute"} zIndex={1000}>
						<FavoriteButton origin={origin} />
					</Box>
					<Box
						position={"absolute"}
						zIndex={1000}
						bg="#242525"
						color="#ECEDEC"
						w="130px"
						borderLeftRadius={"8px"}
						p="10px"
						top={["10px", "10px", "15px", "10px", "10px"]}
						left={["60%", "60%", "79%", "60%", "60%"]}
						fontSize="small"
						fontWeight={"extrabold"}
					>
						Descuento 10%
					</Box>
				</Flex>
				{/* <Link to={`/detail/${id}`}> */}
				<Box height={"200px"} w="100%">
					<link
						rel="stylesheet"
						type="text/css"
						charSet="UTF-8"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
					/>
					<link
						rel="stylesheet"
						type="text/css"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
					/>
					{/* Left Icon */}
					<IconButton
						aria-label="left-arrow"
						bg="#242525"
						color="#FFFF"
						borderRadius="full"
						position="absolute"
						left={side}
						top={top}
						transform={"translate(0%, -50%)"}
						zIndex={2}
						onClick={() => slider?.slickPrev()}
					>
						<BiLeftArrowAlt />
					</IconButton>
					{/* Right Icon */}
					<IconButton
						aria-label="right-arrow"
						bg="#242525"
						color="#FFFF"
						borderRadius="full"
						position="absolute"
						right={side}
						top={top}
						transform={"translate(0%, -50%)"}
						zIndex={2}
						onClick={() => slider?.slickNext()}
					>
						<BiRightArrowAlt />
					</IconButton>
					<Slider {...settings} ref={(slider) => setSlider(slider)}>
						{cards.map((url, index) => (
							<Box
								key={index}
								height={"180px"}
								mt="10px"
								backgroundPosition="center"
								backgroundRepeat="no-repeat"
								backgroundSize="contain"
								backgroundImage={`url(${url})`}
							/>
						))}
					</Slider>
				</Box>
				{/* </Link> */}
				<Box p="4">
					<Stack justifyContent="space-between" alignContent="center">
						<Link to={`/detail/${id}`}>
							<Box
								fontSize="medium"
								fontWeight="semibold"
								as="h4"
								lineHeight="tight"
								mb="12px"
								mt="10px"
								minH={"70px"}
							>
								{nombre}
							</Box>
						</Link>
						<Flex align={"center"}>
							<Box fontSize={"2xl"}>
								<AiFillStar />
							</Box>
							<Box fontSize={"2xl"}>
								<AiFillStar />
							</Box>
							<Box fontSize={"2xl"}>
								<AiFillStar />
							</Box>
							<Box fontSize={"2xl"} color="#9A9A9A">
								<AiFillStar />
							</Box>
							(23)
						</Flex>
					</Stack>

					<Flex justifyContent="space-between" align="center" mt="12px">
						<Box as="span" color={"gray.600"}>
							{`$ ${precio.PesosArg}`}
						</Box>

						<Box>
							<AddToCart
								nombre={nombre}
								precio={precio}
								marca={marca}
								imagen0={imagen0}
							/>
						</Box>
					</Flex>
				</Box>
			</Box>
		</Stack>
	);
}

export default Product;
