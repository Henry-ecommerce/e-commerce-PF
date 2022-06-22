import { Flex, Image, Box, useMediaQuery } from "@chakra-ui/react";
import logo from "../Banner/logo.png"


const Banner = () => {
    const [mayor650w] = useMediaQuery('(min-width: 650px)');


    return(
    <>
    <Flex height="137px" width="auto" bg="white" color="#9a9a9a" alignItems={"center"} justifyContent={"center"}>
        <Flex textAlign={"center"} width="70vw" alignItems={"center"} justifyContent={mayor650w ? "space-between" : "space-around"} fontWeight="700" fontSize="calc(10px,1vw)">
            <Box display={mayor650w ? "visible": "none"} >Direccion: <br/>Corrientes XXX0, Local 19,<br/> 1006 Buenos Aires Argentina</Box>
            <Box display={mayor650w ? "visible": "none"}>Contacto: <br/> +54 11 4XXX-00XX <br/> ventas@.com.ar</Box>
            <Box display={mayor650w ? "visible": "none"}>Fuerza: <br/> No se rindan <br/> ya falta poco </Box>
            <Image boxSize="120px" src={logo} alt="logo"></Image>
        </Flex>
    </Flex>
    </>
    )
}

export default Banner;