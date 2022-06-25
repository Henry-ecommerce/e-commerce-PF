import { Box, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AddToCart from "../AddToCardComponents/AddToCart";

const MiniCard = ({nombre, id, imagen1, precio, marca, stock}) => {
    return (
    <>
    <Box width="300px" height="150px" bg="white" borderRadius="10px" boxShadow="md">
        
        <Flex align="center">
        <Box>
            <Link to={`/detail/${id}`}><Image src={imagen1} alt={nombre} boxSize="150px" objectFit="scale-down"></Image></Link>
        </Box>
        <Box textAlign="center" fontWeight="bold">
            <Box fontWeight="200"><Link to={`/detail/${id}`}><p>{nombre?.slice(0,35)+"..."}</p></Link></Box>
            <Box fontSize="20px"><p>{"$"+precio?.PesosArg}</p></Box>
            <Box bg="#242525" p="5px" color="#ECEDEC" borderRadius="5px" width="fit-content"><AddToCart 
                            nombre={nombre}
                            precio={precio?.PesosArg}
                            marca={marca}
                            imagen0={imagen1}
                            id={id}
                            stock={stock}
                            texto="Agregar"/></Box>
        </Box>
        </Flex>
        
    </Box>
    </>
    )
}

export default MiniCard;