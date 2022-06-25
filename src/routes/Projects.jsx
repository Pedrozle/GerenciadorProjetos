import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Message from '../components/layout/Message';
import LinkButton from '../components/LinkButton';

import styles from './css/Projects.module.css'

const Projects = () => {

    const {state} = useLocation()
    let message = ''

    if(state){
        message = state.message
    }

    return ( 
        <main>
            <section className={styles.projectContainer}>
                <Container>
                    {message && <Message type="success" msg={message} />}
                    <div className={styles.titleContainer}>
                        <h1>Meus Projetos</h1>
                        <LinkButton to="/novoprojeto" text="Criar Projeto"/>
                    </div>
                    <p>Projetos</p> 
                </Container>
            </section>
        </main>
     );
}
 
export default Projects;