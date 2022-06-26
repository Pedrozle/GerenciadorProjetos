import React from 'react';

import styles from './css/Card.module.css'
import LinkButton from './LinkButton';

const ProjectCard = ( {id, name, motivo, orcamento, categoria, handleRemove} ) => {
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
                    <LinkButton to="/" text="Editar" />
                    <LinkButton to="/" text="Apagar" />
                </div>
        </div> 
    );
}
 
export default ProjectCard;