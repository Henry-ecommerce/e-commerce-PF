import { Button } from "@chakra-ui/react";
import axios from "axios";
export default function MercadoPago({ items }) {
  function Pagar() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no hay token");
      return;
    }

    const datos = {
      items: items,
      user: JSON.parse(localStorage.getItem("info_user")),
      producto: JSON.parse(localStorage.getItem("productos_carrito")),
    };

    localStorage.setItem('user_direction', JSON.stringify(datos));

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(token, datos);
    axios
      .post(`/user/pago`, datos, headers)
      .then((res) => res.data)
      .then((data) => window.location.replace(data));
  }

  return (
    <Button
      mx="10px"
      bg="#242525"
      color="#FFFF"
      _hover={{ bg: "#242525", color: "#FFFF" }}
      onClick={() => Pagar()}
    >
      Finalizar Compra
    </Button>
  );
}
