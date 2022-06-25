import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Portal,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import { useAuth } from "../../Context/AuthContext";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  add_quantity_in_cart_local_storage,
  subtract_quantity_in_cart_local_storage,
  delete_product_in_cart_local_storage,
} from "../../Redux/Actions";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const { products_in_cart_local_storage } = useSelector((state) => state);
  const [_width, set_width] = useState(window.frames.innerWidth);
  window.addEventListener("resize", () => {
    set_width(window.frames.innerWidth);
  });
  const navigate = useNavigate();
  const { cerrarSesion } = useAuth();
  const toast = useToast();
  let user = JSON.parse(localStorage.getItem("info_user"));

  return (
    <Flex p="10px" justify={"space-between"} bg="#242525" color="#ECEDEC">
      {_width <= 688 ? (
        <Menu>
          <MenuButton aria-label="Options" variant="outline">
            <AiOutlineMenu />
          </MenuButton>
          <MenuList color={"#242525"}>
            {user?.name !== undefined && (
              <MenuItem color="#ECEDEC">{user.name}</MenuItem>
            )}
            <MenuItem>
              <Link to="/#">Inicio</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/#">Sucursal</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/#">Pedido</Link>
            </MenuItem>
            {user?.rol === "Admin" && (
              <MenuItem>
                <Link to="/admin">Admin</Link>
              </MenuItem>
            )}
            {user?.rol === "Owner" && (
              <MenuItem>
                <Link to="/owner/categorias">Admin</Link>
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      ) : (
        <>
          <Flex justify={"space-around"} align="center">
            <Box mx="15px">
              <Link to="/#">Inicio</Link>
            </Box>
            <Box mx="15px">
              <Link to="/#">Sucursal</Link>
            </Box>
            <Box mx="15px">
              <Link to="/#">Pedido</Link>
            </Box>
            <Box mx="15px">
              {user?.rol === "Admin" && (
                <Link to="/admin">Panel Admin</Link>
              )}
              {user?.rol === "Owner" && (
                <Link to="/owner/edit">Panel Owner</Link>
              )}
            </Box>
          </Flex>
          <Flex align={"center"} mx="30px">
            {user?.name !== undefined && (
              <Box mx="10px" color="#ECEDEC" textTransform={"capitalize"}>
                <Link to="/user/perfil">{user.name}</Link>
              </Box>
            )}
            {user?.name !== undefined ? (
              <Menu autoSelect={false} closeOnSelect={false}>
                <MenuButton disabled={user?.name === undefined ? true : false}>
                  <AiOutlineUser />
                </MenuButton>
                <Portal>
                  <MenuList>
                    <Link to="/user/perfil">
                      <MenuItem>
                        <Box mx="10px">
                          <AiOutlineUser />
                        </Box>
                        Perfil
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={() => {
                        cerrarSesion();
                        navigate("/");
                      }}
                    >
                      <Box mx="10px">
                        <MdLogout />
                      </Box>
                      Cerrar Sesion
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            ) : (
              <Link to="/login">
                <AiOutlineUser />
              </Link>
            )}
            <Box ml={4} color="#ECEDEC">
              {user && (
                <Link to="/user/wishList">
                  <AiOutlineHeart />
                </Link>
              )}
              {!user && <AiOutlineHeart />}
            </Box>
            <Box cursor={"pointer"} ml={4} color="#ECEDEC">
              <Box>
                {products_in_cart_local_storage?.length > 0 &&
                  typeof products_in_cart_local_storage !== "string" && (
                    <Box
                      bg="#FE0100"
                      fontSize={"8px"}
                      textAlign="center"
                      borderRadius={"full"}
                      pos="absolute"
                      w="12px"
                      top="6px"
                      right="34px"
                    >
                      {products_in_cart_local_storage?.length}
                    </Box>
                  )}
                <Menu autoSelect={false} closeOnSelect={false}>
                  <MenuButton
                    disabled={
                      products_in_cart_local_storage?.length === 0 &&
                      typeof products_in_cart_local_storage !== "string"
                        ? true
                        : false
                    }
                  >
                    <FiShoppingCart />
                  </MenuButton>
                  <Portal>
                    <MenuList w={"600px"} zIndex={1000}>
                      {products_in_cart_local_storage?.length > 0 &&
                        typeof products_in_cart_local_storage !== "string" &&
                        products_in_cart_local_storage.map((elem, i) => {
                          return (
                            <MenuItem key={i} display="block">
                              <Flex
                                align="center"
                                justify="space-around"
                                mt={i > 0 && "12px"}
                              >
                                <Flex w="200px" justify={"center"}>
                                  <Image
                                    src={elem.imagen0}
                                    h="100px"
                                    borderRadius="3px"
                                  />
                                </Flex>
                                <Stack>
                                  <Text ml="10px">
                                    {elem.nombre?.length > 30
                                      ? elem.nombre.slice(
                                          0,
                                          (elem.nombre?.length * 40) / 100
                                        )
                                      : elem.nombre}
                                  </Text>
                                  <Flex
                                    align={"center"}
                                    justify="space-between"
                                  >
                                    <Button
                                      borderRadius={"full"}
                                      w="2px"
                                      bg="#242525"
                                      color="#FFFF"
                                      _hover={{ bg: "#242525", color: "#FFFF" }}
                                      onClick={() =>
                                        dispatch(
                                          subtract_quantity_in_cart_local_storage(
                                            elem
                                          )
                                        )
                                      }
                                    >
                                      -
                                    </Button>
                                    <Text mx="10px">{elem.cantidad}</Text>
                                    <Button
                                      bg="#242525"
                                      borderRadius={"full"}
                                      color="#FFFF"
                                      _hover={{ bg: "#242525", color: "#FFFF" }}
                                      onClick={() => {
                                        if (elem.cantidad >= elem.stock) {
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
                                            add_quantity_in_cart_local_storage(
                                              elem
                                            )
                                          );
                                        }
                                      }}
                                    >
                                      +
                                    </Button>
                                    <Text mx="10px" w={"95px"}>
                                      {typeof elem.precio === "Object"
                                        ? `$ ${elem.precio.PesosArg}`
                                        : `$ ${elem.precio}`}
                                    </Text>
                                    <Box
                                      onClick={() =>
                                        dispatch(
                                          delete_product_in_cart_local_storage(
                                            elem
                                          )
                                        )
                                      }
                                    >
                                      <BsFillTrashFill />
                                    </Box>
                                  </Flex>
                                </Stack>
                              </Flex>
                            </MenuItem>
                          );
                        })}
                      <MenuItem display="block" closeOnSelect>
                        <Flex align="center" justify="center" h="100px">
                          <Text mx="10px" fontWeight={"extrabold"}>
                            Total:{" "}
                            {products_in_cart_local_storage?.length > 0 &&
                              products_in_cart_local_storage
                                .reduce(
                                  (a, b) =>
                                    Number(b.cantidad) <= 1
                                      ? a + Number(b.precio)
                                      : a + Number(b.precio) * b.cantidad,
                                  0
                                )
                                .toFixed(2)}
                          </Text>
                          <Link to="/user/carrito">
                            <Button>Ir al pago</Button>
                          </Link>
                        </Flex>
                      </MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              </Box>
            </Box>
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default Navbar;
