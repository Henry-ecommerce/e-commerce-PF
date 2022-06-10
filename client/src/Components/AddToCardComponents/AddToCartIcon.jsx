import { set_products_in_cart_local_storage } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

export default function AddToCartIcon({ nombre, marca, precio, imagen0, id }) {
  nombre = nombre?.split(",")[0];
  const dispatch = useDispatch();
  const { products_in_cart_local_storage } = useSelector((state) => state);

  return (
    <Button
      bg="#242525"
      color="#ECEDEC"
      _hover={{ bg: "#242525", color: "#ECEDEC" }}
      fontSize="x-small"
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
      <FaShoppingCart />
    </Button>
  );
}
