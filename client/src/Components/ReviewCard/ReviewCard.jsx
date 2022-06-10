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
const ReviewCard = () => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<AiFillStar />);
  }
  return (
    <Center>
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
            There are many benefits to a joint design and development system.
            Not only does it bring benefits to the design team, but it also
            brings benefits to engineering teams. It makes sure that our
            experiences have a consistent look and feel, not just in our design
            specs, but in production.
          </Text>
        </Flex>
      </Container>
    </Center>
  );
};

export default ReviewCard;
