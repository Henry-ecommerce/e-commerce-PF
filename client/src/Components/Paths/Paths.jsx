import { Flex, Box } from "@chakra-ui/react";
import {Link} from "react-router-dom";

const Paths = ()=>{
   let path = (window.location.pathname)?.split("/");

   if(!isNaN(path.length-1)) path.pop();
   /*este componente contiene 4 validaciones importantes, basicamente si la ruta termina con un numero elimina ese elemento
   si el primer elemento esta vacio, ese sera el HOME, si el path incluye "category=" elimina esa porcion de string, y al ultimo elemento de la ruta
   no le agregara Link y resaltara el color.*/
    return(
    <>
    <Flex fontWeight={"600"} color="#9a9a9a">
    {path?.map((elem,index) =>
    index === path.length-1 ? <Box color="#242525">{elem.includes("category") ? "/" + decodeURI(elem.replace("category=","")) : "/" + decodeURI(elem)}</Box> : elem ? 
    <Link to={path[index-1] ? `/${path[index-1]}/${elem}` : `/${elem}`} key={index}> 
        <div>{elem.includes("category") ? "/" + decodeURI(elem.replace("category=","")) : "/" + decodeURI(elem)}</div> 
    </Link> :
    <Link  to={`/`} key={index}> 
        <div>Home</div>
    </Link>
    )}
    </Flex>
    </>
    )
}

export default Paths;