import React from "react";
import { AiFillStar } from "react-icons/ai";
import ReviewStars from "../ReviewStars/ReviewStars";
import {
  Text,
  Flex,
  HStack,
  Avatar,
  Center,
  Container,
} from "@chakra-ui/react";

const ReviewCard = ({ id, titulo, comentario,rating, user }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<AiFillStar />);
  }
  return (
    <Center key={id}>
      <Container
        m={"10px"}
        mb={"5px"}
        p={"5px"}
        maxW="2xl"
        bg={"white"}
        color={"black"}
        boxShadow="base"
        borderRadius={"10px"}
      >
        <HStack align={"center"} justify={"center"} p={"10px"}>
          <Flex align={"center"} justify={"center"} direction={"column"}>
            <Avatar bg={"black"} />
            <Container centerContent m={"10px"}>
              <Text>{user}</Text>
            </Container>
            <Container centerContent>
            <ReviewStars starRating={rating}/> 
            </Container>
          </Flex>
          <Flex
            direction={"column"}
            align={"center"}
            justify={"center"}
            w={"100%"}
          >
            <Text p={"5px"} as='strong'>{titulo}</Text>
            <Text p={"5px"}>{comentario}</Text>
          </Flex>
        </HStack>
      </Container>
    </Center>
  );
};

export default ReviewCard;
