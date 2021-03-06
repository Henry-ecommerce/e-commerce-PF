import React, { useState, useEffect } from "react";
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
import ReviewStars from "../ReviewStars/ReviewStars";
import axios from "axios";
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
  descuento,
  stock,
  Categoria,
}) {
  nombre = nombre.split(",")[0];
  const cards = [
    imagen0,
    imagen1 === undefined
      ? "https://programacion.net/files/article/20161110041116_image-not-found.png"
      : imagen1,
    imagen2 === undefined
      ? "https://programacion.net/files/article/20161110041116_image-not-found.png"
      : imagen2,
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
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios.get(`/review/:${id}`).then((res) => {
      setReviews(res.data);
    });
  }, [id]);

  function displayRating() {
    return Math.round(
      reviews
        .map((rtn) => rtn.rating)
        .reduce((prev, number) => prev + number, 0) / reviews.length
    );
  }
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "90%", md: "34%" });
  const side = useBreakpointValue({ base: "30%", md: "15px" });

  let precioFinal;

  if (descuento === 0) {
    precioFinal = precio;
  } else {
    let desc = precio?.PesosArg * (descuento / 100);
    precioFinal = parseInt(precio?.PesosArg - desc);
  }

  let ultima;
  if (stock === 1) {
    ultima = "Ultima unidad disponible!";
  }

  return (
    <Stack w="full" alignItems="center" justifyContent="space-between">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        w={["300px", "300px", "400px", "300px", "300px"]}
        borderWidth="1px"
        rounded="2xl"
        shadow="md"
        position="relative"
        h="413px"
      >
        <Flex>
          <Box position={"absolute"} zIndex={10}>
            <FavoriteButton origin={origin} productId={id} />
          </Box>
          {descuento !== null && (
            <Box
              position={"absolute"}
              zIndex={10}
              bg="#242525"
              color="#ECEDEC"
              w="fit-content"
              borderLeftRadius={"8px"}
              p="10px"
              top={["20px", "20px", "25px", "20px", "20px"]}
              left={["60%", "60%", "79%", "60%", "60%"]}
              fontSize="small"
              fontWeight={"extrabold"}
            >
              Descuento {descuento}%
            </Box>
          )}
        </Flex>
        {/* <Link to={`/detail/${id}`}> */}
        <Box height={"fit-content"} w="100%">
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
            right="calc(100% - 55px)"
            bottom={"60%"}
            borderRadius="full"
            position="absolute"
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
            left={"calc(100% - 55px)"}
            bottom={"60%"}
            borderRadius="full"
            position="absolute"
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
                mt="5px"
                minH={"70px"}
              >
                {nombre}
              </Box>
              <Box position={"absolute"} w="200px"><Text position="absolute" color='#F54343' top="-20px" w='250px'>{ultima ? ultima : null}</Text></Box>
            </Link>
            <Flex align={"center"}>
              <ReviewStars starRating={displayRating()} />({reviews.length})
            </Flex>
          </Stack>

          <Flex justifyContent="space-between" align="center" mt="12px">
            <Box as="span" color={"#242525"} fontWeight="bold" fontSize="18px">
              {descuento !== null && (
                <Text
                  fontSize={"12px"}
                  color="#9A9A9A"
                  textDecoration={"line-through"}
                >{`$ ${precio.PesosArg}`}</Text>
              )}
              {descuento !== null
                ? `$ ${(
                    precio.PesosArg -
                    (precio.PesosArg * descuento) / 100
                  ).toFixed(2)}`
                : `$ ${precio.PesosArg}`}
            </Box>

            <Box>
              <AddToCart
                nombre={nombre}
                precio={precioFinal}
                marca={marca}
                imagen0={imagen0}
                id={id}
                stock={stock}
                texto="Agregar al carrito"
                Categoria={Categoria}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Stack>
  );
}

export default Product;
