import React from 'react';
import styles from "./Paginado.module.css"

export default function Paginado ({productsPage, allProducts, paginado}) {

    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allProducts/productsPage); i++) {
        pageNumber.push(i);
        
    }

    return(
        <nav className={styles.pageNumbers}>
            <ul className={styles.paginado}>
                {pageNumber && 
                    pageNumber.map(number => (
                        <li className={styles.numbers} key={number}>
                            <button onClick={() => paginado(number)} className={styles.number} >{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )

}