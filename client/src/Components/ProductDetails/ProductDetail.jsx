import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

import { Flex, Box, Image, Stack, Button, HStack } from "@chakra-ui/react";

import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import ReviewCard from "../ReviewCard/ReviewCard";

function ProductDetail() {
  let { id } = useParams();

  const [showDescription, setDescription] = useState(true);
  const [showReviews, setReview] = useState(false);
  const [showEspecification, setEspecification] = useState(false);
  const [isActiveD, setIsActiveD] = useState(true);
  const [isActiveE, setIsActiveE] = useState(false);
  const [isActiveR, setIsActiveR] = useState(false);

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/productos/detail/${id}`).then((result) => {
      setProduct(result.data);
      console.log(result.data);
    });
  }, []);

  const [img, setImg] = useState();

  function changeImg(e) {
    setImg(e);
  }

  if (typeof product === "object") {
    return (
      <>
        <Box fontWeight="black" fontSize="small" ml="600px" mt="4px">
          <Link to={"/"}>{"Home > "}</Link>
          {`Detalle > ${product.funciones}`}
        </Box>
        <Stack w="full" alignItems="center" justifyContent="space-between">
          <Box w="800px" h="800px" bg="white" p="10px" m="10px">
            <Flex justifyContent="space-around">
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
                    />
                  </Button>
                </Stack>
              </Box>

              <Box>
                <Stack direction="column">
                  <Button
                    position={"relative"}
                    bg="#242525"
                    color="#ECEDEC"
                    borderRadius={"full"}
                    p="10px"
                    fontSize={"2xl"}
                    m="0"
                    top="10px"
                    left="10px"
                    ml="200px"
                    w="45px"
                  >
                    <AiOutlineHeart />
                  </Button>

                  <Box alignContent="center" w="100%" p={3} boxSize="300px">
                    <Image src={img ? img : product.imagen0} />
                  </Box>
                </Stack>
              </Box>

              <Box>
                <Flex direction="column" alignContent="space-evenly">
                  <Box w="200px" fontWeight="black">
                    {product.nombre}
                  </Box>
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
                  <br />
                  <br />
                  <Box
                    fontWeight="black"
                    fontSize="x-large"
                  >{`$ ${product.precio?.PesosArg}`}</Box>
                  <br />
                  <br />
                  <div>Espacio Para Promociones Bancarias</div>
                  <br />

                  <HStack spacing="25px">
                    <Button
                      bg="#242525"
                      color="#ECEDEC"
                      _hover={{ bg: "#242525", color: "#ECEDEC" }}
                      fontSize="small"
                      w="150px"
                    >
                      COMPRAR
                    </Button>

                    <Button w="50px">
                      <FaShoppingCart />
                    </Button>
                  </HStack>
                </Flex>
              </Box>
            </Flex>
            <Stack direction="row" spacing={4} align="center" mt="15px">
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

            <Box>
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

            <Box>
              {showReviews ? (
                <Box><ReviewCard/><ReviewCard/></Box>
              ) : null}        
            </Box>
            <Box>
              {showEspecification ? (
                <Box>Ver como renderizar las caracteristicas</Box>
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
