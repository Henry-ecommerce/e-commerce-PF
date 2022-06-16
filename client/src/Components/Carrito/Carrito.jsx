import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_products } from "../../Redux/Actions";
import Carousel from "../ProductCarousel/Carousel";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import {Link} from "react-router-dom";
import styles from "./Carrito.module.css";
import {
    add_quantity_in_cart_local_storage,
    subtract_quantity_in_cart_local_storage,
    delete_product_in_cart_local_storage,
} from "../../Redux/Actions";




const Carrito = () => {
    
    const { products_in_cart_local_storage } = useSelector((state) => state);
    const {products} = useSelector(state => state);
    const division = [products?.slice(0,12),products?.slice(12,24),products?.slice(24,36)]

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(get_all_products())
    },[dispatch])

    let localStor = JSON.parse(localStorage.getItem("productos_carrito"))

    let sum = products_in_cart_local_storage?.length > 0 &&
        products_in_cart_local_storage.reduce(
            (a, b) =>
                Number(b.cantidad) <= 1
                ? a + Number(b.precio.PesosArg)
                : a +
                    Number(b.precio.PesosArg) * b.cantidad,
            0
        )



        

    return (
        <>
        
        {/* 
        flexWrap='wrap'
        spacing='24px'
        gap='16px'
        justifyContent='space-evenly'
        */}

        <Box width="70vw" fontSize="2.5em" fontWeight="550" ml="auto" mr="auto">
            <div><p textStyle="p">Mi carrito</p></div>
        </Box>
            { 
            <Box>
                {  
                localStor[0] ? (
                    <Box>
                        <Box width="28vw" height="20vw" marginLeft="66%" bg="#f1f1f9"  px={1} >
                            <Text fontSize="1em" fontWeight="550" color="#666">Subtotal________________________$ {sum}</Text><br/>
                            <Text fontSize="1.5em" fontWeight="550">TOTAL______________$ {sum}</Text><br/>
                            <Link to="/">
                            <Button borderRadius={"full"} width="28vw" height="4vw" bg="#242525" color="#FFFF">Finalizar compra</Button><br/><br/>
                            </Link>
                            <Link to="/">
                            <Button borderRadius={"full"} width="28vw" height="4vw" bg="#242525" color="#FFFF">Continuar comprando</Button>
                            </Link>
                        </Box>
                        <Box mt="-20vw">
                            {localStor?.map(el => {
                                return (
                                    <Box width="50vw" fontSize="1em" fontWeight="540" ml="8%" mr="auto" >
                                        
                                        <Box>
                                            <hr/><hr/>
                                            <Image src={el.imagen0} boxSize='100px' borderRadius="10%" />                         
                                            <Text ml="15%" mt="-12%" mb="8%" fontSize="1em" fontWeight="550">{el.nombre}</Text>
                                            <Text ml="50%" mt="0%" mb="3%" fontSize="1.3em" fontWeight="550">ARS$ {el.precio.PesosArg}</Text>
                                            
                                            
                                            <Button
                                                ml="16%"
                                                mt="-22%"
                                                bg="#242525"
                                                borderRadius={"full"}
                                                color="#FFFF"
                                                _hover={{ bg: "#242525", color: "#FFFF" }}
                                                onClick={() =>
                                                    dispatch(
                                                        add_quantity_in_cart_local_storage(
                                                            el
                                                        )
                                                    )
                                                }
                                            >
                                            +  
                                            </Button> 
                                            <Button
                                                ml="5%"
                                                mt="-22%"
                                                borderRadius={"full"}
                                                w="2px"
                                                bg="#242525"
                                                color="#FFFF"
                                                _hover={{ bg: "#242525", color: "#FFFF" }}
                                                onClick={() =>
                                                    dispatch(
                                                        subtract_quantity_in_cart_local_storage(
                                                        el
                                                        )
                                                    )
                                                }
                                            >
                                            -
                                            </Button>
                                            <Text ml="23.5%"
                                                mt="-14.5%" fontSize="1em" fontWeight="550">{el.cantidad}</Text>
                                            <Button
                                                ml="90%"
                                                bg="transparent"
                                                onClick={() =>
                                                    dispatch(
                                                        delete_product_in_cart_local_storage(
                                                            el
                                                        )
                                                    )}
                                                >
                                                    Eliminar
                                                </Button>
                                        </Box>
                                        <br/>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                )
                :  
                <Box width="70vw" fontSize="1.5em" fontWeight="550" ml="auto" mr="auto">
                    <div><p textStyle="p">Su carrito está vacio</p></div><br/>
                    <div><p textStyle="p" className={styles.p}>Para seguir comprando, navegue por las categorías en el sitio, o busque su producto.</p></div>
                    <br/>
                    <Link to="/">
                        <button className={styles.button}> Elegir Productos </button>
                    </Link>
                </Box>
                
            } 
            </Box> 
            }
            
            
        <Box mt="12%">
        <hr/>
        <Box width="70vw" fontSize="1.5em" fontWeight="550" ml="auto" mr="auto">
            <div><p textStyle="p">Personas que compraron este producto también compraron:</p></div>
        </Box>
            <Box mt="0%" mb="25px"><Carousel items={division[0]} /></Box>
        </Box>
        </>
    )
}

export default Carrito



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