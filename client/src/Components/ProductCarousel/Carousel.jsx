import { useRef } from "react";

import {BsChevronLeft, BsChevronRight} from "react-icons/bs"

import estilo from "./Carousel.module.css"
import Product from "../Product/Product";

//RECIBE POR PROPS UN ARRAY DE OBJETOS CON LOS PRODUCTOS NECESARIOS, PARA RENDERIZAR LAS CARTAS (USA EL COMPONENTE PRODUCT).
const Carousel = ({items}) => {
    const scrl = useRef();

    if(!items) return (<></>)

    const desplazar_pagina = (direcion) => {
        if(direcion === "izq") scrl.current.scrollLeft +=  -scrl.current.clientWidth;
        if(direcion === "der") scrl.current.scrollLeft +=  scrl.current.clientWidth;
    }
    
    return(
    <>
    <div className={estilo.carousel}>
        <BsChevronLeft className={estilo.btn_izq} onClick={e=> desplazar_pagina("izq")}></BsChevronLeft>
           <div ref={scrl} className={estilo.card_container }>
        
                {items?.map((product) => {
		        	return <div key={product.id} className={estilo.card}><Product  {...product} /></div>;
                })}
                
            </div>
        <BsChevronRight className={estilo.btn_der} onClick={e => desplazar_pagina("der")}>BTN</BsChevronRight> 
    </div>
    </>
    )
}

export default Carousel;