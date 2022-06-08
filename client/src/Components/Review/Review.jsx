import React, { useState, useRef } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Input,
  Textarea,
  Box,
  Icon,
  IconButton,
  Button,
  Stack,
  Heading,
} from "@chakra-ui/react";

import { AiFillStar } from "react-icons/ai";

const Review = () => {
  let RegExpression = /^[a-zA-Z\s]*$/;
  let message = useRef("");
  const stars = [];
  const [mensajeEnviado, setMensajeEnviado] = useState("");
  const [rating, setRating] = useState(0);
  const [input, setInput] = useState({
    titulo: "",
    rating: 0,
    description: "",
  });

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
        variant="outline"
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
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    if (input.titulo.length < 3 || input.titulo.trim().length === 0) {
      setMensajeEnviado("Informacion Insuficiente");
    } else {
      // dispatch(action(input))
      setInput({
        titulo: "",
        rating: rating,
        description: "",
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
    <Flex m="30px" align={"center"} justify={"center"}>
      <Box color="#ECFDEC" bg="#1C1C1C" p="16px" fontSize={"2xl"} m="10" rounded="lg">
        <h1>{mensajeEnviado}</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormControl>
            <FormLabel htmlFor="title">Titulo</FormLabel>
            <FormHelperText color="#ECFDEC">
              {message.current.length > 1
                ? `${message.current}`
                : "¿Qué es lo que quieres compartir del producto?"}
            </FormHelperText>
            <Input
              id="title"
              name="titulo"
              type="text"
              onChange={(e) => handleInputCheck(e)}
              isRequired
            />
            <FormLabel htmlFor="rating">Rating</FormLabel>
            <p>{rating}</p>
            <Flex align={"center"} justify={"center"}>
              {stars}
            </Flex>
            <FormLabel htmlFor="comentario">
              ¡Cuéntanos más sobre el producto!
            </FormLabel>
            <FormHelperText color="#ECFDEC">
              ¿Qué te gusto o que no te gusto? ¿Para qué usaste el producto?
            </FormHelperText>
            <Textarea
              id="comentario"
              name="description"
              onChange={(e) => handleInputCheck(e)}
              maxLength="280"
              isRequired
            />
            <Button
              type="submit"
              loadingText="Enviando"
              size="lg"
              bg={"black"}
              color={"white"}
              _hover={{
                bg: "gray.700",
                color: "white",
              }}
            >
              Enviar
            </Button>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};

export default Review;
