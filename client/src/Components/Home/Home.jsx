import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_products } from "../../Redux/Actions";
import Carousel from "../ProductCarousel/Carousel"

import { AiOutlineEnvironment, AiOutlineCreditCard, AiOutlineCheckCircle } from "react-icons/ai";
import { Box, Flex, Text } from "@chakra-ui/react";
import FrontPageSlide from "../FrontPageSlide/FrontPageSlide";

const Home = () => {
    const {products} = useSelector(state => state);

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(get_all_products())
    },[dispatch])
    let m =products?.filter(e => e.descuento !== null && e.descuento > 0)
    let productos_descuento = [m.slice(0,m.length - 1),products?.slice(12,24),products?.slice(24,36)]
    let productos_sin_descuento = products?.filter(e => e.descuento === null || e.descuento === 0) // ESTO ES TEMPORAL, CUENTO TENGAMOS LO DE LAS COMPRAS SE VA A CAMBIAR
    let productos_pocas_unidades = [products?.filter(e => e.stock <= 10).slice(0,12),products?.slice(12,24),products?.slice(24,36)] 

    const division = [productos_sin_descuento.slice(0,12),products?.slice(12,24),products?.slice(24,36)]

    return (
    <>
    <Box width="70vw" ml="auto" mr="auto" mb="20px" textAlign={"center"}><FrontPageSlide></FrontPageSlide></Box>
    <Box width="70vw" fontSize="2.5em" fontWeight="550" ml="auto" mr="auto">
        <div><Text fontSize={'25px'}>Productos en oferta</Text></div>
    </Box>
    <Box mt="25px" mb="25px"><Carousel items={productos_descuento[0]} /></Box>
    
    <Box width="auto" height="174px" mt="25px" mb="25px" borderTop=" 2px solid #D9D9D9" borderBottom="2px solid #D9D9D9">
        <div>
        <Flex justifyContent="space-evenly" align="center" wrap="wrap" height="174px" color="#9A9A9A" fontSize="calc(20px + 0.5vw)" pl="150px" pr="150px">


            <Flex align="center">
                <Box fontSize="40px" mr="15px"><AiOutlineEnvironment/> </Box>
                <Text fontSize={'20px'}>Envios a cualquier <br/>parte del mundo</Text>
            </Flex>

            <Flex align="center">
                <Box fontSize="40px" mr="15px"><AiOutlineCreditCard/></Box>
                <Text fontSize={'20px'}>Paga como quieras<br/>credito debito y mas</Text>
            </Flex>

            <Flex align="center">
                <Box fontSize="40px" mr="15px"><AiOutlineCheckCircle/></Box>
                <Text fontSize={'20px'}>Registrate y obten<br/>beneficios exclusivos</Text>
            </Flex>

        </Flex>
        </div>
    </Box>

    <Box width="70vw" fontSize="2.5em" fontWeight="550" ml="auto" mr="auto">
        <div><Text fontSize="25px">Mas Vendidos</Text></div>
    </Box>
    <Box mt="25px" mb="25px"><Carousel items={division[0]} /></Box>
    
    <Box width="70vw" fontSize="2.5em" fontWeight="550" ml="auto" mr="auto">
        <div><Text fontSize="25px">Ultimas Unidades</Text></div>
    </Box>
    <Box mt="25px" mb="25px"><Carousel items={productos_pocas_unidades[0]} /></Box>
    </>
    )
}

export default Home;