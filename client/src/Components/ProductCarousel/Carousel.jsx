import { useRef } from "react";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import estilo from "./Carousel.module.css";
import Product from "../Product/Product";
import CategoryCard from "../CategoryCard/CategoryCard";
import MiniCard from "../MiniCard/MiniCard";

//RECIBE POR PROPS UN ARRAY DE OBJETOS CON LOS PRODUCTOS NECESARIOS, PARA RENDERIZAR LAS CARTAS (USA EL COMPONENTE PRODUCT).
const Carousel = ({ items, type }) => {
	const scrl = useRef();

	if (!Array.isArray(items)) return <></>;

	const desplazar_pagina = (direcion) => {
		if (direcion === "izq")
			scrl.current.scrollLeft += -scrl.current.clientWidth;
		if (direcion === "der") scrl.current.scrollLeft += scrl.current.clientWidth;
	};

	

	return (
		<>
			<div className={estilo.carousel}>
				<BsChevronLeft
					className={estilo.btn_izq}
					onClick={(e) => desplazar_pagina("izq")}
				></BsChevronLeft>
				<div ref={scrl} className={estilo.card_container}>
					{items?.map((product) => {
						return (
							<div key={product.id} className={estilo.card}>
								{type === "miniCard"? <MiniCard {...product}/> :(type === "images" ? <CategoryCard {...product}/> : <Product {...product} />)}
							</div>
						);
					})}
				</div>
				<BsChevronRight
					className={estilo.btn_der}
					onClick={(e) => desplazar_pagina("der")}
				>
					BTN
				</BsChevronRight>
			</div>
		</>
	);
};

export default Carousel;
