import React from 'react';
import styles from "./Paginado.module.css"
import { Link, useParams } from "react-router-dom";

export default function Paginado ({productsPage, allProducts, paginado}) {

    const pageNumber = []
    const {categoriaobusqueda,page} = useParams()
    for (let i = 1; i <= Math.ceil(allProducts/productsPage); i++) {
        pageNumber.push(i);
        
    }

    return(
        <nav className={styles.pageNumbers}>
            <ul className={styles.paginado}>
                {pageNumber && 
                    pageNumber.map(number => (
                        <li className={styles.numbers} key={number}>
                            <Link to={`/products/${categoriaobusqueda}/${number}`} onClick={e => window.scrollTo({ top: 0 })}><button className={styles.number} >{number}</button></Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )

}