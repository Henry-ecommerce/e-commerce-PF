import { set_products_in_cart_local_storage } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";

export default function AddToCart({ nombre, marca, precio, imagen0, id }) {
  nombre = nombre.split(",")[0];
  const dispatch = useDispatch();
  const { products_in_cart_local_storage } = useSelector((state) => state);

  return (
    <Button
      bg="#242525"
      color="#ECEDEC"
      _hover={{ bg: "#242525", color: "#ECEDEC" }}
      fontSize="small"
      onClick={() => [
        localStorage.setItem(
          "productos_carrito",
          JSON.stringify(products_in_cart_local_storage)
        ),
        // console.log(localStorage.getItem('productos_carrito'))
        dispatch(
          set_products_in_cart_local_storage({ nombre, marca, precio, imagen0 })
        ),
      ]}
    >
      Agregar a Carrito
    </Button>
  );
}
