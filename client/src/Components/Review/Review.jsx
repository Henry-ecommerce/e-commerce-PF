import React, { useState } from "react";
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
  const [rating, setRating] = useState(0);
  const stars = [];

  const StarIcon = () => (
    <Icon as={AiFillStar} boxSize={8} color="rgba( 248, 231, 28, 1 )" />
  );
  const StarButton = (idx) => {
    return (
      <IconButton
        variant="outline"
        aria-label={`Rate ${idx}`}
        icon={<StarIcon />}
        onClick={() => onRating(idx)}
      />
    );
  };

  for (let i = 1; i <= 5; i++) {
    stars.push(<StarButton key={i} idx={i} fill={i <= rating} />);
  }
  const onRating = (idx) => {
    if (!isNaN(idx)) {
      // allow user to click first icon and set rating to zero if rating is already 1
      if (rating === 1 && idx === 1) {
        setRating(0);
      } else {
        setRating(idx);
        console.log(rating + "entro");
      }
    }
  };

  return (
    <Flex mt="30px" align={"center"} justify={"center"}>
      <Box bg="#242525" color="#ECEDEC" p="10px" fontSize={"2xl"} m="10">
          <FormControl>
            <FormLabel htmlFor="title">Titulo</FormLabel>
            <FormHelperText>
              ¿Qué es lo que quieres compartir del producto?
            </FormHelperText>
            <Input id="title" type="text" />
            <FormLabel htmlFor="rating">Rating</FormLabel>
            <input name="rating" type="hidden" value={rating} />
            {stars}
            <FormLabel htmlFor="comentario">
              ¡Cuéntanos más sobre el producto!
            </FormLabel>
            <FormHelperText>
              ¿Qué te gusto o que no te gusto? ¿Para qué usaste el producto?
            </FormHelperText>
            <Textarea id="comentario" />
            <Button
              type="submit"
              loadingText="Submitting"
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
      </Box>
    </Flex>
  );
};

export default Review;
