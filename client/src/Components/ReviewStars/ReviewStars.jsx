import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Flex,Box } from "@chakra-ui/react";
const ReviewStars = ({ starRating }) => {
 
  return (
    <Flex>
      {starRating > 0
        ? Array(5)
            .fill("")
            .map((_, i) => (
                <Box fontSize={"2xl"}>
                  <AiFillStar key={i} color={i < starRating ? "black" : "#9A9A9A"} />		
				</Box>
            ))
        : Array(5)
            .fill("")
            .map((_, i) => <Box fontSize={"2xl"}><AiOutlineStar key={i} /></Box>)}
    </Flex>
  );
};

export default ReviewStars;
