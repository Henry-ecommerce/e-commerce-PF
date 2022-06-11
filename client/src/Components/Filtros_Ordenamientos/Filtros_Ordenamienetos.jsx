import { useState, useEffect } from "react";
import estilos from "../Filtros_Ordenamientos/Filtros_Ordenamientos.module.css"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {get_filter_products, get_product_by_name } from "../../Redux/Actions";

const Filtros_Ordenamientos = () => {
    const [seleccionado, setSeleccionado] = useState([]);
    const [ordenado, setOrdenado] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const {categoriaobusqueda} = useParams();
    const {filtrados, searched_products} = useSelector(state => state)
    
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!searched_products.length)  dispatch(get_product_by_name(categoriaobusqueda))
        
        if(!marcas.length){let marcasAux = searched_products.map(e => e.marca);
        setMarcas([...new Set(marcasAux)])};

        dispatch(get_filter_products(categoriaobusqueda,seleccionado,ordenado[0] || "nombre",ordenado[1] || "ASC"))

    },[marcas,categoriaobusqueda,dispatch,searched_products,seleccionado,ordenado]);
    
    const onCheck = (e) => {
        if(e.target.checked){
            !seleccionado.includes(e.target.name) && setSeleccionado([...seleccionado,e.target.name])        
        } else { setSeleccionado(seleccionado.filter(elem => elem !== e.target.name)) }

    }
    const ordenamineto = (e) => {
        if(e.target.value === "Nombre") setOrdenado(["nombre", "DESC"])
        if(e.target.value === "Menor precio") setOrdenado(["precio", "ASC"])
        if(e.target.value === "Mayor precio") setOrdenado(["precio", "DESC"])
        if(e.target.value === "Descuento") setOrdenado(["precio", "ASC"])
        if(e.target.value === "Calificacion") setOrdenado(["nombre", "DESC"])
}

/* <p className={estilos.tipo_filtro}>Tipo</p>
                {filtros.funciones?.map((e,i) => (<label key={i}><input onChange={e=>onCheck(e)} name={e} type="checkbox"></input> {e}</label>))}
                <p className={estilos.tipo_filtro}>Marca</p>
                {filtros.marca?.map((e,i) => (<label key={i}><input onChange={e=>onCheck(e)} name={e} type="checkbox"></input> {e}</label>))} */


    return(
    <>
    <div className={estilos.container}>
        <div className={estilos.contenedor_elementos}>
            <p className={estilos.productos}>{categoriaobusqueda}</p>
            <p className={estilos.resultados}>{filtrados.length || searched_products.length} <label>Resultados</label></p>
            <label className={estilos.ordenar_por}>Ordenar por:
                <select onChange={e => ordenamineto(e)}>
                    <option></option>
                    <option>Nombre</option>
                    <option>Menor precio</option>
                    <option>Mayor precio</option>
                    <option>Descuento</option>
                    <option>Calificacion</option>
                </select>
            </label>
            <div className={estilos.contenedor_inputs}>
                <p>Marca</p>
                {marcas?.map((e,i) => <label key={i}><input onChange={e=>onCheck(e)} name={e} type="checkbox"></input> {e}</label>)}
            </div> 
        </div>
    </div>
    </>
    )
    
}

export default Filtros_Ordenamientos;