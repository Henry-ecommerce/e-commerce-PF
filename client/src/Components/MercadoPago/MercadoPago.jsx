import { Button } from "@chakra-ui/react";
import axios from "axios";

export default function MercadoPago() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("no hay token");
    return;
  }
  const datos = {
    user: localStorage.getItem("info_user"),
    producto: localStorage.getItem("info_user"),
  };

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  function onClick(datos, headers) {
    axios.post(`http://localhost:3001/productos/checkout`, datos, headers);
  }

  return (
    <Button
      mx="10px"
      bg="#242525"
      color="#FFFF"
      _hover={{ bg: "#242525", color: "#FFFF" }}
      // onClick={() => onClick(datos, headers)}
    >
      Finalizar Compra
    </Button>
  );
}

// mp.checkout({
//   preference: {
//     id: response.id,
//   },
// });
