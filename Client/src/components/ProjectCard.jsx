import React from 'react';
import {Link} from 'react-router-dom'

import styles from './css/Card.module.css'

const ProjectCard = ( {id, name, motivo, orcamento, categoria, handleRemove} ) => {
    
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return ( 
        <div className={styles.card}>
            <h4>{name}</h4>
                <p className={styles.categoryText}>
                    <span className={`${styles[categoria.toLowerCase()]}`}></span>
                    {categoria}
                </p>
                <p className="card-text">{motivo}</p>
                <p>
                    <span>Orçamento: </span> R$ {orcamento}
                </p>
                <div className={styles.cardActions}>
                    <Link to={`/projeto/${id}`} className>Acessar</Link>
                    <button  onClick={remove} className={styles.btn} >
                        Apagar
                    </button>
                </div>
        </div> 
    );
}
 
export default ProjectCard;