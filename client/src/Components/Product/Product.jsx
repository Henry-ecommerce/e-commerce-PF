import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Stack,
  Button,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { set_products_in_cart_local_storage } from "../../Redux/Actions";

function Product({ nombre, marca, precio, imagen0, id }) {
  nombre = nombre.split(",")[0];
  const dispatch = useDispatch();
  const { products_in_cart_local_storage } = useSelector((state) => state);

  function addToCart(e) {
    localStorage.setItem(
      "productos_carrito",
      JSON.stringify(products_in_cart_local_storage)
    );
    // console.log(localStorage.getItem('productos_carrito'))
    dispatch(
      set_products_in_cart_local_storage({ nombre, marca, precio, imagen0 })
    );
  }

  return (
    <Stack w="full" alignItems="center" justifyContent="space-between">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        w={["300px", "300px", "400px", "300px", "300px"]}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        h="413px"
      >
        <Box
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
        </Box>
        <Box
          position={"absolute"}
          bg="#242525"
          color="#ECEDEC"
          w="130px"
          borderLeftRadius={"8px"}
          p="10px"
          top={["10px", "10px", "15px", "10px", "10px"]}
          // bg={["pink", "red", "green", "#1F2734",'#E28B00']}
          left={["60%", "60%", "79%", "60%", "60%"]}
          fontSize="small"
          fontWeight={"extrabold"}
        >
          Descuento 10%
        </Box>
        <Link to={`/${id}`}>
          <Image
            src={imagen0}
            alt={`Picture of ${nombre}`}
            roundedTop="lg"
            m="auto"
            mt="50px"
            h="160px"
          />
        </Link>
        <Box p="4">
          <Stack justifyContent="space-between" alignContent="center">
            <Link to={`/${id}`}>
              <Box
                fontSize="medium"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                mb="12px"
                minH={"72px"}
              >
                {nombre}
              </Box>
            </Link>
            <Flex align={"center"}>
              <Box fontSize={"2xl"}>
                <AiFillStar />
              </Box>
              <Box fontSize={"2xl"}>
                <AiFillStar />
              </Box>
              <Box fontSize={"2xl"}>
                <AiFillStar />
              </Box>
              <Box fontSize={"2xl"} color="#9A9A9A">
                <AiFillStar />
              </Box>
              (23)
            </Flex>
          </Stack>

          <Flex justifyContent="space-between" align="center" mt="12px">
            <Box as="span" color={"gray.600"}>
              {`$ ${precio.PesosArg}`}
            </Box>
            <Button
              bg="#242525"
              color="#ECEDEC"
              _hover={{ bg: "#242525", color: "#ECEDEC" }}
              fontSize="x-small"
              onClick={() => addToCart()}
            >
              Agregar a Carrito
            </Button>
          </Flex>
        </Box>
      </Box>
    </Stack>
  );
}

export default Product;
