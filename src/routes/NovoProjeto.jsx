import React from 'react';
import ProjectForm from '../form/ProjectForm';

import styles from './css/NovoProjeto.module.css';

const NovoProjeto = () => {
    return ( 
        <main>
            <div className="container">
                <h1>Criar Novo Projeto</h1>
                <p>Crie seus projetos</p>
                <ProjectForm btnText="Criar Projeto"/>
            </div>
        </main>
     );
}
 
export default NovoProjeto;