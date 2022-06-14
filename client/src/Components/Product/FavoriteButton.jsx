import React, { useEffect, useState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Portal,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { get_user_favorites } from "../../Redux/Actions";
import {Link} from 'react-router-dom';

function FavoriteButton({ origin, productId }) {
  let { favorites } = useSelector((state) => state);
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("info_user"));
  let [AlreadyFavorite, setFavorite] = useState(false);

  useEffect(() => {}, [favorites, dispatch, user?.id, productId]);

  function addFavorite(id, productId) {
    dispatch(get_user_favorites(user?.id));
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no hay token");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const datos = {
      productoId: productId,
      userId: id,
    };

    if (favorites.filter((e) => e.id === productId).length) {
      axios.post("user/favoritos/remove", datos, config);
      setFavorite(false);
    } else {
      axios.post("/user/favoritos", datos, config);
      setFavorite(true);
    }
  }

  if (origin !== "wishlist") {
    if (!user) {
      return (
        <Popover>
          <PopoverTrigger>
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
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                Inicie sesión para añadir a favoritos
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Link to="/login">
                  <Button bg="#242525" color="white">
                    Iniciar Sesión
                  </Button>
                </Link>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      );
    }
    return (
      <Popover>
        <PopoverTrigger>
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
            onClick={() => {
              addFavorite(user?.id, productId);
            }}
          >
            {!AlreadyFavorite && <AiOutlineHeart />}
            {AlreadyFavorite && <MdFavorite color="white" />}
          </Button>
        </PopoverTrigger>
      </Popover>
    );
  } else {
    return (
      <Button
        onClick={() => {
          addFavorite(user?.id, productId);
        }}
        m="0"
        bg="white"
        position="absolute"
        top="5px"
        borderRadius={"full"}
      >
        <BsTrash size="30" />
      </Button>
    );
  }
}

export default FavoriteButton;
