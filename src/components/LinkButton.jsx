import React from 'react';
import { Link } from 'react-router-dom';

import styles from './css/LinkButton.module.css'

const LinkButton = ( { to, text } ) => {
    return ( 
        <Link to={to} className={styles.btn}>
            {text}
        </Link>
     );
}
 
export default LinkButton;