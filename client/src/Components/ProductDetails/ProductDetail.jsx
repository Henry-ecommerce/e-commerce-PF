import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Flex,
  Box,
  Image,
  Stack,
  Button,
  HStack,
  VStack,
  Center,
  Text,
  useMediaQuery,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Portal,
} from "@chakra-ui/react";
import AddToCart from "../AddToCardComponents/AddToCart";
import AddToCartIcon from "../AddToCardComponents/AddToCartIcon";
import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { FaEmber, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { product_to_review } from "../../Redux/Actions/index";
import ReviewCard from "../ReviewCard/ReviewCard";
import ReviewStars from "../ReviewStars/ReviewStars";
import Paths from "../Paths/Paths";
import FavoriteButton from "../Product/FavoriteButton";
import Review from "../Review/ReviewButton";

function ProductDetail() {
  let { id } = useParams();

  const [showDescription, setDescription] = useState(true);
  const [showReviews, setReview] = useState(false);
  const [showEspecification, setEspecification] = useState(false);
  const [isActiveD, setIsActiveD] = useState(true);
  const [isActiveE, setIsActiveE] = useState(false);
  const [isActiveR, setIsActiveR] = useState(false);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [Rev, setRev] = useState([]);

  const [mayor900w] = useMediaQuery("(min-width: 900px)");

  useEffect(() => {
    axios.get(`productos/detail/${id}`).then((result) => {
      setProduct(result.data);
    });
    axios.get(`/review/:${id}`).then((res) => {
      setReviews(res.data);
    });

    const token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("info_user"));

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (headers && user?.id) {
      axios.get(`/user/pedido/${user.id}`, headers).then((result) =>
        result.data?.map((e) =>
          setRev(
            ...Rev,
            e.items?.filter((el) => el.id == id)
          )
        )
      );
    }
  }, [id]);

  const [img, setImg] = useState();

  function changeImg(e) {
    setImg(e);
  }

  function onReview() {
    dispatch(product_to_review([product]));
  }

  function displayRating() {
    return Math.round(
      reviews
        .map((rtn) => rtn.rating)
        .reduce((prev, number) => prev + number, 0) / reviews.length
    );
  }

  let hola;
  if (product?.caracteristicas) {
    let a = Object?.entries(product?.caracteristicas);
    hola = a?.map((e) => e[0] + " : " + e[1]);
  }

  let precioFinal;

  if (product.descuento === 0) {
    precioFinal = product.precio;
  } else {
    let desc = product.precio?.PesosArg * (product.descuento / 100);
    precioFinal = parseInt(product.precio?.PesosArg - desc);
  }

  let ultima;
  if (product?.stock === 1) {
    ultima = "Compra ahora! Es la ultima unidad disponible!";
  } else {
    ultima = `Unidades disponibles : ${product.stock}`;
  }

  if (typeof product === "object") {
    return (
      <>
        <Box
          width={"70vw"}
          maxW="1440"
          minW="350px"
          mt="10px"
          mr="auto"
          ml="auto"
        >
          <Paths></Paths>
        </Box>

        <Stack w="full" alignItems="center">
          <Box
            w="70vw"
            maxW="1440"
            minW="350px"
            h="fit-content"
            bg="white"
            p="10px"
            m="10px"
          >
            {/*MAYOR A 900 HASTA LINEA 236*/}
            {mayor900w ? (
              <Flex justifyContent="space-between">
                <Box ml="5px">
                  <Stack direction="column">
                    <Button
                      boxSize="120px"
                      bg="white"
                      border="2px"
                      borderColor={img === product.imagen0 ? "black" : "white"}
                      onClick={() => changeImg(product.imagen0)}
                    >
                      <Image
                        src={product.imagen0}
                        alt={`Picture`}
                        boxSize="100px"
                        objectFit="contain"
                      />
                    </Button>
                    <Button
                      boxSize="120px"
                      bg="white"
                      border="2px"
                      borderColor={img === product.imagen1 ? "black" : "white"}
                      onClick={() => changeImg(product.imagen1)}
                    >
                      <Image
                        src={product.imagen1}
                        alt={`Picture`}
                        boxSize="100px"
                        objectFit="contain"
                      />
                    </Button>
                    <Button
                      boxSize="120px"
                      bg="white"
                      border="2px"
                      borderColor={img === product.imagen2 ? "black" : "white"}
                      onClick={() => changeImg(product.imagen2)}
                    >
                      <Image
                        src={product.imagen2}
                        alt={`Picture`}
                        boxSize="100px"
                        objectFit="contain"
                      />
                    </Button>
                  </Stack>
                </Box>

                <Box position="relative">
                  <Box
                    position={"absolute"}
                    m="0"
                    top="10px"
                    mb="10px"
                    left="10px"
                    ml="19vw"
                    mr="1vw"
                  >
                    <FavoriteButton productId={product.id} origin={"hola"} />
                  </Box>

                  <Stack
                    h={"100%"}
                    direction="column"
                    alignItems={"center"}
                    justifyContent="center"
                  >
                    <Box>
                      <Image
                        boxSize={"25vw"}
                        objectFit="contain"
                        src={img ? img : product.imagen0}
                      />
                    </Box>
                  </Stack>
                </Box>

                <Box w={"25vw"}>
                  <Flex direction="column" alignContent="space-between">
                    <Box w="25vw" fontSize={"20px"} fontWeight="black">
                      {product.nombre}
                    </Box>
                    <br />
                    <ReviewStars starRating={displayRating()} />(
                    {reviews.length})
                    <br />
                    <br />
                    <Box
                      as="span"
                      color={"#242525"}
                      fontWeight="bold"
                      fontSize="30px"
                    >
                      {product.descuento !== null && (
                        <Text
                          fontSize={"15px"}
                          color="#9A9A9A"
                          textDecoration={"line-through"}
                        >{`Antes : $ ${product.precio?.PesosArg}`}</Text>
                      )}
                      {product.descuento !== null
                        ? ` $ ${(
                            product.precio?.PesosArg -
                            (product?.precio?.PesosArg * product.descuento) /
                              100
                          ).toFixed(2)}`
                        : `$ ${product.precio?.PesosArg}`}
                    </Box>
                    <br />
                    <br />
                    <Text fontSize="20px">{ultima ? ultima : null}</Text>
                    <br />
                    <Box display={"flex"} flexWrap="wrap" justifyContent={"center"} >
                    <Box m="5px">{product.stock > 0 ? (
                        <AddToCartIcon
                          nombre={product.nombre}
                          precio={precioFinal}
                          marca={product.marca}
                          imagen0={product.imagen0}
                          id={product.id}
                          Categoria={product.Categoria}
                          stock={product.stock}
                        />
                      ) : null}</Box>

                      <Box>
                        <Link to="/user/carrito">
                          <Box m="5px">{product.stock > 0 ? (
                            <AddToCart
                              nombre={product.nombre}
                              precio={precioFinal}
                              marca={product.marca}
                              imagen0={product.imagen0}
                              id={product.id}
                              stock={product.stock}
                              Categoria={product.Categoria}
                              texto="COMPRAR AHORA"
                            />
                          ) : (
                            <Text>
                              Lo sentimos no hay stock de este producto
                            </Text>
                          )}</Box>
                        </Link>
                      </Box>
                      <Box m="5px">{Rev.length > 0 ? (
                        <Review id={product.id} />
                      ) : (
                        <Popover>
                          <PopoverTrigger>
                            <Button
                              bg="#242525"
                              color="#ECEDEC"
                              _hover={{ bg: "#242525", color: "#ECEDEC" }}
                              fontSize="small"
                              p='10px'
                            >
                              ESCRIBIR UNA OPINION
                            </Button>
                          </PopoverTrigger>
                          <Portal>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverHeader>
                                Para Dejar Una Opinion Debe Haber Comprado El
                                Producto
                              </PopoverHeader>
                              <PopoverCloseButton />
                              <PopoverBody>
                                <Link to="/user/carrito">
                                  <AddToCart
                                    nombre={product.nombre}
                                    precio={precioFinal}
                                    marca={product.marca}
                                    imagen0={product.imagen0}
                                    id={product.id}
                                    stock={product.stock}
                                    Categoria={product.Categoria}
                                    texto="COMPRAR AHORA"
                                  />
                                </Link>
                              </PopoverBody>
                            </PopoverContent>
                          </Portal>
                        </Popover>
                      )}</Box>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            ) : (
              <Flex justifyContent="center">
                <Box w={"70vw"} minW="350px">
                  <Flex direction="column" alignItems="center">
                    <Box
                      w="60vw"
                      minW="330px"
                      textAlign={"center"}
                      fontSize={"20px"}
                      fontWeight="black"
                    >
                      {product.nombre}
                    </Box>
                    <ReviewStars starRating={displayRating()} />(
                    {reviews.length})
                    <Box position="relative">
                      <Box
                        position={"absolute"}
                        m="0"
                        top="10px"
                        mb="10px"
                        left="80%"
                      >
                        <FavoriteButton
                          productId={product.id}
                          origin={"hola"}
                        />
                      </Box>

                      <Stack direction="column">
                        <Box
                          alignContent="center"
                          w="100%"
                          boxSize="fit-content"
                        >
                          <Image
                            w="60vw"
                            minW="330px"
                            maxH="400px"
                            objectFit="contain"
                            src={img ? img : product.imagen0}
                          />
                        </Box>
                      </Stack>
                    </Box>
                    <Box ml="5px">
                      <Stack direction="row">
                        <Button
                          minW="110px"
                          minH="110px"
                          boxSize="20vw"
                          bg="white"
                          border="2px"
                          borderColor={
                            img === product.imagen0 ? "black" : "white"
                          }
                          onClick={() => changeImg(product.imagen0)}
                        >
                          <Image
                            minW="100px"
                            minH="100px"
                            src={product.imagen0}
                            alt={`Picture`}
                            boxSize="20vw"
                            objectFit="contain"
                          />
                        </Button>
                        <Button
                          minW="110px"
                          minH="110px"
                          boxSize="20vw"
                          bg="white"
                          border="2px"
                          borderColor={
                            img === product.imagen1 ? "black" : "white"
                          }
                          onClick={() => changeImg(product.imagen1)}
                        >
                          <Image
                            minW="100px"
                            minH="100px"
                            src={product.imagen1}
                            alt={`Picture`}
                            boxSize="20vw"
                            objectFit="contain"
                          />
                        </Button>
                        <Button
                          minW="110px"
                          minH="110px"
                          boxSize="20vw"
                          bg="white"
                          border="2px"
                          borderColor={
                            img === product.imagen2 ? "black" : "white"
                          }
                          onClick={() => changeImg(product.imagen2)}
                        >
                          <Image
                            minW="100px"
                            minH="100px"
                            src={product.imagen2}
                            alt={`Picture`}
                            boxSize="20vw"
                            objectFit="contain"
                          />
                        </Button>
                      </Stack>
                    </Box>
                    <Box
                      as="span"
                      color={"#242525"}
                      fontWeight="bold"
                      fontSize="30px"
                    >
                      {product.descuento !== null && (
                        <Text
                          fontSize={"15px"}
                          color="#9A9A9A"
                          textDecoration={"line-through"}
                        >{`Antes : $ ${product.precio?.PesosArg}`}</Text>
                      )}
                      {product.descuento !== null
                        ? ` $ ${(
                            product.precio?.PesosArg -
                            (product?.precio?.PesosArg * product.descuento) /
                              100
                          ).toFixed(2)}`
                        : `$ ${product.precio?.PesosArg}`}
                    </Box>
                    <Box mt="10px" mb="20px">
                      <Box display={"flex"} flexWrap="wrap" justifyContent={"center"}>
                        <Box m="5px">{product.stock > 0 ? (
                          <AddToCartIcon
                            nombre={product.nombre}
                            precio={precioFinal}
                            marca={product.marca}
                            imagen0={product.imagen0}
                            id={product.id}
                            stock={product.stock}
                            Categoria={product.Categoria}
                          />
                        ) : null}</Box>

                        
                          <Link to="/user/carrito">
                          <Box m="5px">{product.stock > 0 ? (
                              <AddToCart
                                nombre={product.nombre}
                                precio={precioFinal}
                                marca={product.marca}
                                imagen0={product.imagen0}
                                id={product.id}
                                stock={product.stock}
                                Categoria={product.Categoria}
                                texto="COMPRAR AHORA"
                              />
                            ) : (
                              <Text>
                                Lo sentimos no hay stock de este producto
                              </Text>
                            )}</Box>
                          </Link>
                        
                          <Box m="5px">{Rev.length > 0 ? (
                          <Review id={product.id} />
                        ) : (
                          <Popover>
                            <PopoverTrigger>
                              <Button
                                bg="#242525"
                                color="#ECEDEC"
                                _hover={{ bg: "#242525", color: "#ECEDEC" }}
                                fontSize="small"
                                w="150px"
                              >
                                Escribir Mi Opinión
                              </Button>
                            </PopoverTrigger>
                            <Portal>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader>
                                  Para Dejar Una Opinion Debe Haber Comprado El
                                  Producto
                                </PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                  <Link to="/user/carrito">
                                    <AddToCart
                                      nombre={product.nombre}
                                      precio={precioFinal}
                                      marca={product.marca}
                                      imagen0={product.imagen0}
                                      id={product.id}
                                      stock={product.stock}
                                      Categoria={product.Categoria}
                                      texto="COMPRAR AHORA"
                                    />
                                  </Link>
                                </PopoverBody>
                              </PopoverContent>
                            </Portal>
                          </Popover>
                        )}</Box>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            )}

            <Stack direction="row" spacing={4} align="center" mt="15px" pl="5">
              <Button
                variant="link"
                colorScheme={isActiveD ? "" : "blackAlpha"}
                onClick={() => [
                  setDescription(!showDescription),
                  setReview(false),
                  setEspecification(false),
                  setIsActiveD(true),
                  setIsActiveE(false),
                  setIsActiveR(false),
                ]}
              >
                Descripción
              </Button>
              <Button
                colorScheme={isActiveE ? "" : "blackAlpha"}
                variant="link"
                onClick={() => [
                  setEspecification(!showEspecification),
                  setReview(false),
                  setDescription(false),
                  setIsActiveE(true),
                  setIsActiveR(false),
                  setIsActiveD(false),
                ]}
              >
                Especificacion
              </Button>
              <Button
                colorScheme={isActiveR ? "" : "blackAlpha"}
                variant="link"
                onClick={() => [
                  setReview(!showReviews),
                  setDescription(false),
                  setEspecification(false),
                  setIsActiveR(true),
                  setIsActiveD(false),
                  setIsActiveE(false),
                ]}
              >
                Reseñas
              </Button>
            </Stack>

            <Box pl="5" pr="5">
              {showDescription ? (
                <Box>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. {<br />}Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.{<br />} Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum."
                </Box>
              ) : null}
            </Box>

            <Box pl="5" pr="5">
              {showReviews ? (
                <Box
                  bg={"#EDEDED"}
                  overflow={"auto"}
                  h={"300px"}
                  m={"15px"}
                  p={"10px"}
                  borderRadius={"10px"}
                >
                  {reviews.length > 0 ? (
                    reviews.map((r) => {
                      return (
                        <ReviewCard
                          key={r.id}
                          titulo={r.titulo}
                          comentario={r.text}
                          rating={r.rating}
                          user={r.userName}
                        />
                      );
                    })
                  ) : (
                    <Center>Aun no Hay Reviews Se el Primero!</Center>
                  )}
                </Box>
              ) : null}
            </Box>
            <Box>
              {showEspecification ? (
                <Box>
                  <br />

                  {hola?.map((e) => (
                    <Text fontWeight="black">{e}</Text>
                  ))}
                </Box>
              ) : null}
            </Box>
          </Box>
        </Stack>
      </>
    );
  } else {
    return (
      <Box align="center" fontWeight="black" fontSize="3xl">
        UPSS... NO SE ECONTRARON PRODUCTOS
        <Image src="https://martinbrainon.com/inicio/wp-content/uploads/2018/01/lead-nuclear-power-human-error-homer-simpson-1-600x398.jpg" />
      </Box>
    );
  }
}

export default ProductDetail;
