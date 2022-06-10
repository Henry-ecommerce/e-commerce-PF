import React from "react";
import { Button } from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineDelete } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

function FavoriteButton({origin, AlreadyFavorite}) {
  if (origin !== "wishlist") {
    return (
      <Button
        position={"absolute"}
        bg="#242525"
        color="#ECEDEC"
        borderRadius={"full"}
        p="10px"
        fontSize={"2xl"}
        m="0"
        top="10px"
        left="10px"
      >
        <AiOutlineHeart />
      </Button>
    );
  } else {
    return (
      <Button m="0" bg="white" position={"absolute"} top="10px">
        <BsTrash size="35" />
      </Button>
    );
  }
}

export default FavoriteButton;
