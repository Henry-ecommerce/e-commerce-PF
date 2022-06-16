import { Box, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const CategoryCard = ({nombre, imagen}) => {


    //<Link to={`/products/category=${nombre}/1`}></Link>
    //quite el nombre (${nombre}) del link para evitar que rompa ya que las categorias aun no estan integradas.
    return (
    <>
    <Box width="300px" height="150px" bg="white" display="inline-block" borderRadius="15px" boxShadow="md">
        <Flex m="5px" mt="10px" alignItems="center" flexDirection="column" fontSize="15px" fontWeight="700">
        <Box _hover={{cursor: "pointer"}} maxHeight="150px" maxWidth="150px"><div onClick={e=>window.location.href = `/products/category=${nombre}/1`}><Image boxSize="115px" objectFit="scale-down" src={imagen} alt={nombre}/></div></Box>
        <p>{nombre?.replace(/-/g," ")}</p>
        </Flex>
    </Box>
    </>
    )
}

export default CategoryCard;