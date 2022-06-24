import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_products } from "../../Redux/Actions";
import Carousel from "../ProductCarousel/Carousel";
import {
  Box,
  Button,
  Text,
  Image,
  Flex,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "./Carrito.module.css";
import {
  add_quantity_in_cart_local_storage,
  subtract_quantity_in_cart_local_storage,
  delete_product_in_cart_local_storage,
} from "../../Redux/Actions";
import { BsFillTrashFill } from "react-icons/bs";
import DireccionUser from "../DireccionUser/DireccionUser";
import Mercadopago from "../MercadoPago/MercadoPago";

const Carrito = () => {
  const { products_in_cart_local_storage } = useSelector((state) => state);
  const { products } = useSelector((state) => state);
  const division = [
    products?.slice(0, 12),
    products?.slice(12, 24),
    products?.slice(24, 36),
  ];

  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_all_products());
  }, [dispatch]);

  let localStor = JSON.parse(localStorage.getItem("productos_carrito"));
  let infoDirection = JSON.parse(localStorage.getItem("user_direction"));

  let sum =
    products_in_cart_local_storage?.length > 0 &&
    products_in_cart_local_storage.reduce(
      (a, b) =>
        Number(b.cantidad) <= 1
          ? a + Number(b.precio)
          : a + Number(b.precio) * b.cantidad,
      0
    );

    const datos = {
      pais: infoDirection?.items?.pais ,
      provincia: infoDirection?.items?.provincia ,
      ciudad: infoDirection?.items?.ciudad ,
      CP: infoDirection?.items?.CP ,
      nombreCalle: infoDirection?.items?.nombreCalle ,
      numeroCalle: infoDirection?.items?.numeroCalle ,
      piso: infoDirection?.items?.piso ,
      telefono: infoDirection?.items?.telefono ,
      tipoDoc: infoDirection?.items?.tipoDoc ,
      numeroDoc: infoDirection?.items?.numeroDoc ,
  }

  return (
    <>
      {
        <Flex>
          {localStor[0] ? (
            <Flex justify="space-between" w="90%" m="auto">
              <Box maxH="500px" overflowY="scroll">
                {localStor?.map((el) => {
                  return (
                    <Box
                      fontSize="1em"
                      w="1000px"
                      my="20px"
                      bg="#FFFF"
                      p="20px"
                      borderRadius="10px"
                    >
                      {/* <Text fontWeight="extrabold" fontSize="25px">
												Mi carrito
											</Text> */}
                      <Box>
                        <Flex align="center" justify="space-between" w="100%">
                          <Image
                            src={el.imagen0}
                            boxSize="100px"
                            borderRadius="10px"
                            objectFit="contain"
                          />
                          <Text fontSize="1em" maxW="250px">
                            {el.nombre}
                          </Text>
                          <Text fontSize="1.3em" fontWeight="550">
                            ${el.precio}
                          </Text>
                          <Flex align="center" justify="space-between">
                            <Button
                              borderRadius={"full"}
                              bg="#242525"
                              color="#FFFF"
                              _hover={{ bg: "#242525", color: "#FFFF" }}
                              onClick={() =>
                                dispatch(
                                  subtract_quantity_in_cart_local_storage(el)
                                )
                              }
                            >
                              -
                            </Button>
                            <Text mx="20px" fontSize="1em" fontWeight="550">
                              {el.cantidad}
                            </Text>
                            <Button
                              bg="#242525"
                              borderRadius={"full"}
                              color="#FFFF"
                              _hover={{ bg: "#242525", color: "#FFFF" }}
                              onClick={() => {
                                if (el.cantidad >= el.stock) {
                                  toast({
                                    position: "top",
                                    title: "Lo sentimos!",
                                    description:
                                      "No tenemos mas stock de este producto :(",
                                    status: "warning",
                                    duration: 6000,
                                    isClosable: true,
                                  });
                                } else {
                                  dispatch(
                                    add_quantity_in_cart_local_storage(el)
                                  );
                                }
                              }}
                            >
                              +
                            </Button>
                            <Button
                              w="60px"
                              h="60px"
                              ml="20px"
                              onClick={() =>
                                dispatch(
                                  delete_product_in_cart_local_storage(el)
                                )
                              }
                            >
                              <BsFillTrashFill size={25} />
                            </Button>
                          </Flex>
                        </Flex>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Stack
                height="20vw"
                bg="#FFFF"
                mt="20px"
                p="20px"
                borderRadius="10px"
              >
                <DireccionUser/>
                <br />
                <Text fontSize="1.5em" fontWeight="550">
                  Total ${sum.toFixed(2)}
                </Text>
                <br />

                  <Button 
                    borderRadius="5px" bg="#242525" color="#FFFF"> {infoDirection.items.pais ? <Mercadopago items={datos}/> : "Debe completar los datos de envio" }  
                  </Button><br/><br/>
                
                <Link to="/">
                  <Button
                    borderRadius="5px"
                    color="#242525"
                    borderColor="#242525"
                    variant="outline"
                  >
                    Continuar comprando
                  </Button>
                </Link>
              </Stack>
            </Flex>
          ) : (
            <Box
              width="70vw"
              fontSize="1.5em"
              fontWeight="550"
              ml="auto"
              mr="auto"
            >
              <div>
                <p textStyle="p">Su carrito está vacio</p>
              </div>
              <br />
              <div>
                <p textStyle="p" className={styles.p}>
                  Para seguir comprando, navegue por las categorías en el sitio,
                  o busque su producto.
                </p>
              </div>
              <br />
              <Link to="/">
                <button className={styles.button}> Elegir Productos </button>
              </Link>
            </Box>
          )}
        </Flex>
      }

      <Box mt="50px">
        <hr />
        <Box width="70vw" fontSize="1.5em" fontWeight="550" ml="auto" mr="auto">
          <div>
            <Text mb="15px">
              Personas que compraron este producto también compraron:
            </Text>
          </div>
        </Box>
        <Box mt="0%" mb="25px">
          <Carousel items={division[0]} />
        </Box>
      </Box>
    </>
  );
};

export default Carrito;

/*

<div ref={scrl} className={estilo.card_container}>
    {items?.map((product) => {
        return (
            <div key={product.id} className={estilo.card}>
                {type === "images" ? <CategoryCard {...product}/> : <Product {...product} />}
            </div>
        );
    })}
</div>


*/
