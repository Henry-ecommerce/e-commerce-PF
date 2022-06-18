import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alerta from "../../helper/Alerta";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

function ConfirmarCuenta() {
  const { id } = useParams();

  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `${process.env.REACT_APP_API}/registro/confirmar/${id}`;
        const { data } = await axios.get(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
          error: false,
        });
        return;
      } catch (error) {}
      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  const { msg } = alerta;
  console.log(msg);
  console.log("holaa");
  return (
    <>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg === "Vuelva a intentar tokenn no valido" ? (
          <Alerta alerta={alerta} />
        ) : (
          <></>
        )}
        {cuentaConfirmada === true ? (
          <Box textAlign="center" py={10} px={6} my={"150px"}>
            <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
              Cuenta confirmada correctamente
            </Heading>
            <Link to="/login">
              <span style={{ color: "#659DF6", fontWeight: "bolder" }}>
                {" "}
                iniciar sesion 🙌
              </span>{" "}
            </Link>
          </Box>
        ) : (
          <>
            <Box textAlign="center" py={10} px={6} my={"150px"}>
              <Box display="inline-block">
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  bg={"red.500"}
                  rounded={"50px"}
                  w={"55px"}
                  h={"55px"}
                  textAlign="center"
                >
                  <CloseIcon boxSize={"20px"} color={"white"} />
                </Flex>
              </Box>
              <Heading as="h2" size="xl" mt={6} mb={2}>
                Hubo un error
              </Heading>
              <Link to="/login/signup" style={{ color: "black" }}>
                Registrate para
                <span style={{ color: "#659DF6", fontWeight: "bolder" }}>
                  {" "}
                  obtener una cuenta
                </span>
              </Link>
            </Box>
          </>
        )}
      </div>
    </>
  );
}

export default ConfirmarCuenta;
