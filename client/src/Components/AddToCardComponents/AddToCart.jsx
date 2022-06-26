import { set_products_in_cart_local_storage } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, useToast } from "@chakra-ui/react";

export default function AddToCart({
  nombre,
  marca,
  precio,
  imagen0,
  id,
  texto,
  stock,
}) {
  const toast = useToast();
  nombre = nombre?.split(",")[0];
  const dispatch = useDispatch();
  const { products_in_cart_local_storage } = useSelector((state) => state);

  let filter = products_in_cart_local_storage?.filter((el) => el.id === id);

  return (
    <Button
      bg="#242525"
      color="#ECEDEC"
      _hover={{ bg: "#242525", color: "#ECEDEC" }}
      fontSize="small"
      onClick={() => {
        localStorage.setItem(
          "productos_carrito",
          JSON.stringify(products_in_cart_local_storage)
        );
        // console.log(localStorage.getItem('productos_carrito'))
        if (filter) {
          if (filter[0]?.cantidad >= stock) {
            toast({
              position: "top",
              title: "Lo sentimos!",
              description: "No tenemos mas stock de este producto :(",
              status: "warning",
              duration: 4000,
              isClosable: true,
            });
          } else {
            toast({
              position: "top",
              title: "Agregado!",
              description: "Se agrego el producto a tu carrito",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            dispatch(
              set_products_in_cart_local_storage({
                stock,
                nombre,
                marca,
                precio,
                imagen0,
                id,
              })
            );
          }
        }
      }}
    >
      {texto}
    </Button>
  );
}
