import React from 'react';
import {Link} from 'react-router-dom'

import styles from './css/Card.module.css'

const ServiceCard = ( {id, name, custo, descricao, key, handleRemove} ) => {
    
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, custo)
    }

    return ( 
        <div className={styles.card}>
            <h4>{name}</h4>
                <p className="">
                    <span>Custo: R$ </span> {custo}
                </p>
                <p className="card-text">{descricao}</p>
                <div className={styles.cardActions}>
                    <button  onClick={remove} className={styles.btn} >
                        Apagar
                    </button>
                </div>
        </div> 
    );
}
 
export default ServiceCard;