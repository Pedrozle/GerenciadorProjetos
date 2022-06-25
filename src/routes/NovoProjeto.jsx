import React from 'react';
import { useNavigate} from 'react-router-dom'
import ProjectForm from '../form/ProjectForm';

import styles from './css/NovoProjeto.module.css';

const NovoProjeto = () => {

    const navigate = useNavigate()

    function createPost(project) {

        project.costs = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                //redirect
                navigate('/projects', {message: 'Projeto criado com sucesso!'})
            })
            .catch((error) => console.log(error))

    }

    return ( 
        <main>
            <div className="container">
                <h1>Criar Novo Projeto</h1>
                <p>Crie seus projetos</p>
                <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
            </div>
        </main>
     );
}
 
export default NovoProjeto;