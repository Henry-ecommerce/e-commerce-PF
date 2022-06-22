import { useState, useEffect, useRef } from "react";
import estilos from "../Filtros_Ordenamientos/Filtros_Ordenamientos.module.css"
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {get_filter_products, get_product_by_name } from "../../Redux/Actions";

const Filtros_Ordenamientos = () => {
    const [seleccionado, setSeleccionado] = useState([]);
    const [ordenado, setOrdenado] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [minmax, setMinmax] = useState({});
    const [errormm, setErrormm] = useState("");
    const [ver, setVer] = useState(false);
    const {categoriaobusqueda,page} = useParams();
    const {filtrados, searched_products} = useSelector(state => state)
    const navigate = useNavigate()
    
    const dispatch = useDispatch();

    useEffect(()=>{
    
        dispatch(get_product_by_name(categoriaobusqueda))
        
        let marcasAux = searched_products.map(e => e.marca);
        setMarcas([...new Set(marcasAux)]);

        dispatch(get_filter_products(categoriaobusqueda,seleccionado,ordenado[0] || "nombre",ordenado[1] || "ASC",
        minmax.min && minmax.max ? `${minmax.min}-${minmax.max}` : ""))

    },[categoriaobusqueda,dispatch,seleccionado.length,ordenado,searched_products.length]);

    useEffect(()=>{
        setSeleccionado([])
    },[marcas.length])

    useEffect(()=>{
        if(page !== "1") navigate(`../products/${categoriaobusqueda}/1`)
    },[seleccionado.length])
    
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
    const handleOnChange = (e) => {
        setMinmax({
            ...minmax,
            [e.target.name]: e.target.value,
        })
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if((minmax.min && minmax.max) && ( minmax.min*1 <= minmax.max*1 )) {
            setErrormm("");
            dispatch(get_filter_products(
                categoriaobusqueda,
                seleccionado,
                ordenado[0] || "nombre",
                ordenado[1] || "ASC",
                `${minmax.min}-${minmax.max}`
                 ));
        }
        if(minmax.min*1 >= minmax.max*1) {
            setErrormm("Complete los datos correctamente");
        }
    }

/* <p className={estilos.tipo_filtro}>Tipo</p>
                {filtros.funciones?.map((e,i) => (<label key={i}><input onChange={e=>onCheck(e)} name={e} type="checkbox"></input> {e}</label>))}
                <p className={estilos.tipo_filtro}>Marca</p>
                {filtros.marca?.map((e,i) => (<label key={i}><input onChange={e=>onCheck(e)} name={e} type="checkbox"></input> {e}</label>))} */


    return(
    <>
    <div className={estilos.container}>
        <div className={estilos.contenedor_elementos}>
            <p className={estilos.productos}>{categoriaobusqueda?.split("category=")[1] || categoriaobusqueda}</p>
            <p className={estilos.resultados}>{filtrados.length || searched_products.length} <label>Resultados</label></p>
            <label className={estilos.ordenar_por}>Ordenar por:
                <select onChange={e => ordenamineto(e)}>
                    <option></option>
                    <option>Nombre</option>
                    <option>Menor precio</option>
                    <option>Mayor precio</option>
                    {/* <option>Descuento</option> */}
                    {/* <option>Calificacion</option> */}
                </select>
            </label>
            <div className={estilos.contenedor_inputs}>
                <p>Marca</p>
                {marcas?.map((e,i) => { return i >= 5 ?
                <label className={ver ? null : estilos.no_visible} key={i}><input onChange={e=>onCheck(e)} name={e} type="checkbox"></input> {e}</label> : 
                <label key={i}><input onChange={e=>onCheck(e)} name={e} type="checkbox"></input> {e}</label>})}
                {marcas?.length >= 5 ? <span className={estilos.boton_ver} onClick={e=> setVer(ver ? false : true)}>{ver ? "Ocultar" : "Ver todos"}</span> : null}
            </div>
            <form onSubmit={e => handleOnSubmit(e)}>
                <br/>
                <p>Precio: </p>
            <input className={estilos.inputs} placeholder="minimo" name="min" onChange={e => handleOnChange(e)} required></input>
            <span> - </span>
            <input className={estilos.inputs} placeholder="maximo" name="max" onChange={e => handleOnChange(e)} required></input>
            <div className={estilos.button_contenedor}><button type="submit">enviar</button></div>
            <p>{errormm}</p>
            </form>
        </div>
    </div>
    </>
    )
    
}

export default Filtros_Ordenamientos;