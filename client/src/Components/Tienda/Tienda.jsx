import { useSelector } from "react-redux";
import Filtros_Ordenamientos from "../Filtros_Ordenamientos/Filtros_Ordenamienetos";
import Product from "../Product/Product";
import SearchBar from "../SearchBar/SearchBar";

import estilo from "../Tienda/Tienda.module.css"


const Tienda = () => {
    const {filtrados} = useSelector(state => state);


    return (
    <>
    <SearchBar/>
    <div className={estilo.contenedor_general}>
       <div className={estilo.contenedor_filtros}><Filtros_Ordenamientos/></div>
    
       <div className={estilo.contenedor_productos}>{(filtrados).map((e,i) => <div className={estilo.producto} key={i}><Product {...e}/></div>)}</div>
    </div>
    </>
    )
}

export default Tienda;