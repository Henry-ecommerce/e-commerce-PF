import React from "react";
import { AiFillStar } from "react-icons/ai";
import {
  Text,
  Flex,
  Spacer,
  Avatar,
  Center,
  Container,
} from "@chakra-ui/react";
const ReviewCard = ({id, titulo, comentario}) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<AiFillStar />);
  }
  return (
    <Center key={id}>
      <Container
        m={"20px"}
        mb={"0"}
        p={"5px"}
        maxW="2xl"
        bg={"#EDEDED"}
        boxShadow="base"
        borderRadius={"10px"}
      >
        <Flex align={"center"} justify={"space-around"}>
          <Flex
            align={"center"}
            justify={"center"}
            direction={"column"}
            m={"10px"}
          >
            <Avatar bg={"black"} />
            <Container centerContent m={"10px"}>
              <Text>Usuario</Text>
            </Container>
            <Flex>{stars}</Flex>
          </Flex>
          <Spacer />
          <Text p={"5px"}>
          {titulo}
          </Text>
          <Text p={"5px"}>
          {comentario}
          </Text>
        </Flex>
      </Container>
    </Center>
  );
};

export default ReviewCard;
