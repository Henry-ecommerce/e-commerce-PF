import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { product_to_review } from "../../Redux/Actions/index";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/button";

export default function ReviewButton({ id }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`productos/detail/${id}`).then((result) => {
      setProduct(result.data);
      // console.log(result.data);
    });
  }, []);

  function onReview() {
    dispatch(product_to_review([product]));
  }

  return (
    <Link to={"/review"}>
      <Button
        bg="#242525"
        color="#ECEDEC"
        _hover={{ bg: "#242525", color: "#ECEDEC" }}
        fontSize="small"
        w="150px"
        onClick={onReview}
      >
        Escribir Mi Opinión
      </Button>
    </Link>
  );
}
