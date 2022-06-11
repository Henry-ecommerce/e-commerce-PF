import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { post_review, product_to_review } from "../../Redux/Actions/index";
import Product from "../Product/Product.jsx";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Input,
  Textarea,
  Box,
  Icon,
  IconButton,
  Button,
  Center,
} from "@chakra-ui/react";

import { AiFillStar } from "react-icons/ai";

const Review = () => {

  let RegExpression = /^[a-zA-Z\s]*$/;
  let message = useRef("");
  const dispatch = useDispatch();
  const stars = [];
  const productToReview = useSelector((state) => state.product_to_review);
  const [mensajeEnviado, setMensajeEnviado] = useState("");
  const [rating, setRating] = useState(0);
  const [input, setInput] = useState({
    titulo: "",
    text: "",
    rating: 0,
    productoId: productToReview,
  });
  console.log("Id para mandar",productToReview);
  const StarIcon = ({ fill }) => (
    <Icon
      as={AiFillStar}
      boxSize={8}
      fillOpacity={fill ? "100%" : "25%"}
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
          productoId: productToReview[0].id
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setInput({
    //   ...input,
    //   productoId: productToReview[0].id,
    // });
    if (
      input.titulo.length < 3 ||
      input.titulo.trim().length === 0 ||
      input.text.trim().length === 0
    ) {
      setMensajeEnviado("Informacion Insuficiente");
    } else { 
      console.log("debera enviar",input);
      dispatch(post_review(input));
      dispatch(product_to_review([]));
      setInput({
        titulo: "",
        text: "",
        rating: 0,
        productoId: productToReview
      });
      setMensajeEnviado("Review Creada con Exito!");
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
    <Center align={"space-between"} justify={"center"}>
      <Box
        color="black"
        bg="white"
        p="16px"
        fontSize={"2xl"}
        m="10"
        rounded="lg"
        boxShadow="base"
        minW="900px"
        minH="600px"
      >
        <Flex>
          <Center>
            <h1>{mensajeEnviado}</h1>
            <Center m="30px" align={"space-between"} justify={"center"}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl>
                  <Center justify={"center"}>
                    <FormLabel
                      htmlFor="title"
                      fontWeight="black"
                      fontSize="x-large"
                    >
                      Titulo
                    </FormLabel>
                  </Center>
                  <Input
                    id="title"
                    name="titulo"
                    type="text"
                    size="md"
                    w="500px"
                    variant="outline"
                    placeholder="¿Qué es lo que quieres compartir del producto?"
                    onChange={(e) => handleInputCheck(e)}
                    isRequired
                  />
                  <FormHelperText color="black" p="16px">
                    {message.current}
                  </FormHelperText>
                  <Center>
                    <FormLabel
                      htmlFor="rating"
                      fontWeight="black"
                      fontSize="x-large"
                    >
                      Rating
                    </FormLabel>
                  </Center>
                  {/* <p>{rating}</p> */}
                  <Flex align={"center"} justify={"center"}>
                    {stars}
                  </Flex>
                  <Center justify={"center"}>
                    <FormLabel
                      htmlFor="comentario"
                      fontWeight="black"
                      fontSize="x-large"
                    >
                      ¡Cuéntanos más sobre el producto!
                    </FormLabel>
                  </Center>
                  <Textarea
                    id="comentario"
                    name="text"
                    placeholder="¿Qué te gusto o que no te gusto? ¿Para qué usaste el producto?"
                    onChange={(e) => handleInputCheck(e)}
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
                      _hover={{
                        bg: "gray.700",
                        color: "white",
                      }}
                    >
                      Enviar
                    </Button>
                  </Center>
                </FormControl>
              </form>
            </Center>
          </Center>
          <Center>
            {productToReview?.length > 0
              ? productToReview.map((product) => {
                  return <Product key={product.id} {...product} />;
                })
              : (<h1>"Sin Producto Seleccionado"</h1>)}
          </Center>
        </Flex>
      </Box>
    </Center>
  );
};

export default Review;
