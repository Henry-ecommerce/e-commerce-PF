import { Flex, Image, Box, calc } from "@chakra-ui/react";
import logo from "../Banner/logo.png"

const Banner = () => {
    return(
    <>
    <Flex height="137px" width="auto" bg="white" color="#9a9a9a" alignItems={"center"} justifyContent={"center"}>
        <Flex textAlign={"center"} width="70vw" alignItems={"center"} justifyContent={"space-around"} fontWeight="700" fontSize="calc(10px,1vw)">
            <Box >Direccion: <br/>Corrientes XXX0, Local 19,<br/> 1006 Buenos Aires Argentina</Box>
            <Box>Contacto: <br/> +54 11 4XXX-00XX <br/> ventas@.com.ar</Box>
            <Box>Fuerza: <br/> No se rindan <br/> ya falta poco </Box>
            <Image boxSize="120px" src={logo} alt="logo"></Image>
        </Flex>
    </Flex>
    </>
    )
}

export default Banner;