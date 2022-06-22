import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Filtros_Ordenamientos from "../Filtros_Ordenamientos/Filtros_Ordenamienetos";
import Product from "../Product/Product";
import SearchBar from "../SearchBar/SearchBar";
import Paginado from "../Paginado/Paginado";

import estilo from "../Tienda/Tienda.module.css"
import Paths from "../Paths/Paths";


const Tienda = () => {

    const allProducts = useSelector ((state) => state.filtrados);

    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPage] = useState(12);
    const indexLastProduct = currentPage * productsPage;
    const indexFirsProduct = indexLastProduct - productsPage;
    const currentProducts = allProducts.slice(indexFirsProduct, indexLastProduct)
    const {page} = useParams();

    const paginado = (totalPages) => {
        setCurrentPage(totalPages)
    }

    useEffect(()=>{
        paginado(page || 1)
    },[paginado])


    return (
    <>
    <SearchBar/>

    

    <div className={estilo.paths}><Paths></Paths></div>

       <div className={estilo.paginado}>
        <Paginado 
            productsPage={productsPage}
            allProducts={allProducts.length}
            paginado={paginado}
    />
    </div>
    <div className={estilo.contenedor_general}>
       <div className={estilo.contenedor_filtros}><Filtros_Ordenamientos/></div>
    

       {/* <div className={estilo.contenedor_productos}>{(filtrados).map((e,i) => <div className={estilo.producto} key={i}><Product {...e}/></div>)}</div> */}
    { loading ? "Cargando" /* aca podria ir un gif de cargando o algo asi... */:
        <ul>
        {  currentProducts?.map((e,i) => (

        <div className={estilo.producto} key={i}><Product {...e}/></div>

        ))}
        </ul>
    }
        <div className={!currentProducts.length ? estilo.sin_resultados : estilo.display_none}>"No hay productos"</div>
    </div>
    <div className={estilo.paginado}>
        <Paginado 
            productsPage={productsPage}
            allProducts={allProducts.length}
            paginado={paginado}
    />
    </div>

    </>
    )
}

export default Tienda;