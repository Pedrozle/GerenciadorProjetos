import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from './../../img/costs_logo.png';

import styles from './../css/Header.module.css';

const Header = () => {
    return ( 
        <header className={styles.header}>
            
            <nav className={styles.navbar}>
                    
                <Container className={styles.container}>
                <Link to="/">
                        <img src={logo} alt="Costs"/>
                    </Link>
                    <ul className={styles.list}>
                    <li className={styles.item}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/projetos">Projetos</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/empresa">Empresa</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/contato">Contato</Link>
                        </li>
                    </ul>
            </Container>
                </nav>
            
        </header>
     );
}
 
export default Header;


