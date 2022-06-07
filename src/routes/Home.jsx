import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './css/Home.module.css';

import savings from './../img/savings.svg'
import LinkButton from '../components/LinkButon';

const Home = () => {
    return ( 
        
        <main>
            <section className={styles.homeContainer}>
                <Container>
                    <h1>Bem-Vindo ao <span>Costs</span> </h1>
                    <p>Comece a gerenciar os seus projetos!</p>
                    <LinkButton to="/newproject" text="Criar Projeto" />
                    <img src={savings} alt="Costs" />
                </Container>
            </section>
        </main>

     );
}
 
export default Home;