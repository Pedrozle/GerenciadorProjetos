import React from 'react';
import {useState, useEffect} from 'react';

import { useLocation } from 'react-router-dom';

import Message from '../components/Message';
import LinkButton from '../components/LinkButton';

import styles from './css/Projects.module.css'
import ProjectCard from '../components/ProjectCard';

const Projects = () => {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/projects", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setProjects(data)
        })
        .catch(err => console.log(err))
    }, []);



    const {state} = useLocation()
    let message = ''

    if(state){
        message = state.message
    }

    return ( 
        <main className="container">
            <section className={styles.projectContainer}>
                    {message && <Message type="success" msg={message} />}
                    <div className={styles.titleContainer}>
                        <h1>Meus Projetos</h1>
                        <LinkButton to="/novoprojeto" text="Criar Projeto"/>
                    </div>
                    <p>Projetos</p>
                    <div className={styles.projectsList}>
                        {projects.length > 0 &&(
                            projects.map((project) => 
                                <ProjectCard
                                    id={project.id}
                                    name={project.titulo}
                                    motivo={project.motivo}
                                    orcamento={project.orcamento}
                                    categoria={project.category.name}
                                    key={project.id}
                                />
                            )
                        )}
                    </div>
            </section>
        </main>
     );
}
 
export default Projects;