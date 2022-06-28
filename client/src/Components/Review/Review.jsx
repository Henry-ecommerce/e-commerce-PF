import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { post_review, product_to_review } from "../../Redux/Actions/index";
import { useToast } from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Input,
  Textarea,
  Icon,
  IconButton,
  Button,
  Center,
  Box,
  Image,
} from "@chakra-ui/react";

import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router";

const Review = () => {
  let RegExpression = /^[a-zA-Z\s]*$/;
  let message = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stars = [];
  const productToReview = useSelector((state) => state.product_to_review);
  const toast = useToast();
  const [rating, setRating] = useState(0);
  let user = JSON.parse(localStorage.getItem("info_user"));
  const [input, setInput] = useState({
    titulo: "",
    text: "",
    rating: 0,
    productoId: productToReview,
    usuarioId: user,
    userName: "",
  });
  //  console.log("Id para mandar",productToReview);
  // console.log(input.usuarioId);
  const StarIcon = ({ fill }) => (
    <Icon
      as={AiFillStar}
      boxSize={8}
      fillOpacity={fill ? "100%" : "35%"}
      color="orange"
    />
  );

  const StarButton = ({ idx, fill }) => {
    return (
      <IconButton
        variant="unstyled"
        aria-label={`Rate ${idx}`}
        icon={<StarIcon fill={fill} />}
        onClick={() => onClick(idx)}
      />
    );
  };

  for (let i = 1; i <= 5; i++) {
    stars.push(<StarButton key={i} idx={i} fill={i <= rating} />);
  }

  const onClick = (idx) => {
    if (!isNaN(idx)) {
      if (rating === 1 && idx === 1) {
        setRating(0);
        setInput({
          ...input,
          rating: 0,
        });
      } else {
        setRating(idx);
        setInput({
          ...input,
          rating: idx,
          productoId: productToReview[0].id,
          usuarioId: user.id,
          userName: user.name,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      input.titulo.length < 3 ||
      input.titulo.trim().length === 0 ||
      input.text.trim().length === 0 ||
      productToReview.length < 0
    ) {
      toast({
        position: "top",
        title: "Review No Creada",
        description: "Por favor revisa la Informacion",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (!user) {
      toast({
        position: "top",
        title: "Review No Creada",
        description: "Por favor Inicia Sesion",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      //Console log para ver que esta enviando al back
      // console.log("debera enviar", input);
      dispatch(post_review(input));
      dispatch(product_to_review([]));
      setInput({
        titulo: "",
        text: "",
        rating: 0,
        productoId: productToReview,
        usuarioId: user,
        userName: "",
      });
      toast({
        position: "top",
        title: "Review Creada con Exito!",
        description: "Gracias Por Compartir",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      setTimeout(() => {
        window.location.href = `/detail/${productToReview[0].id}`;
      }, 500);
    }
  };

  const handleInputCheck = (e) => {
    let inputCheck = e.target.value;
    if (!RegExpression.test(inputCheck)) {
      message.current = "Caracteres No Validos Por favor Verifica";
    }
    if (inputCheck.length === 1) {
      message.current = "";
    }

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Center>
      <Flex
        color="black"
        bg="white"
        p="16px"
        fontSize={"2xl"}
        m="10"
        rounded="lg"
        boxShadow="md"
        w={"70vw"}
        maxW="1440px"
        minW={"350px"}
        h="fit-content"
        justify={"space-around"}
        align={"center"}
        wrap="wrap-reverse"
        alignItems={"center"}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormControl
            bg="white"
            borderRadius={"10px"}
            p={"20px 0px 20px 0px"}
            textAlign="center"
          >
            <Center>
              <FormLabel
                htmlFor="title"
                fontWeight="black"
                fontSize="x-large"
                textAlign={"center"}
                w="35vw"
                minW={"330px"}
              >
                Titulo
              </FormLabel>
            </Center>
            <Input
              id="title"
              name="titulo"
              type="text"
              size="md"
              w="35vw"
              minW={"330px"}
              border="1px"
              borderColor="black"
              variant="outline"
              maxLength="20"
              placeholder="¿Qué es lo que quieres compartir del producto?"
              onChange={(e) => handleInputCheck(e)}
              isRequired
            />
            <FormHelperText color={"black"}>{message.current}</FormHelperText>
            <Center>
              <FormLabel
                htmlFor="rating"
                fontWeight="black"
                fontSize="x-large"
                textAlign={"center"}
                w="35vw"
                minW={"330px"}
              >
                Rating
              </FormLabel>
            </Center>
            <Flex align={"center"} justify={"center"}>
              {stars}
            </Flex>
            <Center justify={"center"}>
              <FormLabel
                htmlFor="comentario"
                fontWeight="black"
                fontSize="x-large"
                textAlign={"center"}
                w="35vw"
                minW={"330px"}
              >
                ¡Cuéntanos más sobre el producto!
              </FormLabel>
            </Center>
            <Textarea
              id="comentario"
              name="text"
              border="1px"
              borderColor="black"
              placeholder="¿Qué te gusto o que no te gusto? ¿Para qué usaste el producto?"
              onChange={(e) => handleInputCheck(e)}
              w="35vw"
              minW={"330px"}
              minH="200px"
              maxLength="280"
              isRequired
            />
            <Center>
              <Button
                type="submit"
                loadingText="Enviando"
                size="lg"
                bg={"black"}
                color={"white"}
                m={"20px"}
              >
                Enviar
              </Button>
            </Center>
          </FormControl>
        </form>
        <Center>
          {productToReview?.length > 0 ? (
            productToReview.map((product) => {
              return (
                <Center
                  maxW="sm"
                  borderRadius="lg"
                  overflow="hidden"
                  m={"10px"}
                  p={"10px"}
                  key={product.id}
                >
                  <Flex
                    direction={"column"}
                    justify={"center"}
                    align={"center"}
                  >
                    <Image
                      src={product.imagen0}
                      alt={product.nombre}
                      boxSize="250px"
                    />
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h5"
                      lineHeight="tight"
                    >
                      {product.nombre}
                    </Box>
                  </Flex>
                </Center>
              );
            })
          ) : (
            <h1>"Sin Producto Seleccionado"</h1>
          )}
        </Center>
      </Flex>
    </Center>
  );
};

export default Review;
