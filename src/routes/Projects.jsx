import React from 'react';
import {useState, useEffect} from 'react';

import { useLocation } from 'react-router-dom';

import Message from '../components/Message';
import LinkButton from '../components/LinkButton';
import Loading from '../components/layout/Loading';

import styles from './css/Projects.module.css'
import ProjectCard from '../components/ProjectCard';

const Projects = () => {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const {state} = useLocation()

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
            setRemoveLoading(true)
        })
        .catch(err => console.log(err))
    }, []);



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
                        {!removeLoading && <Loading />}
                        {removeLoading && projects.length === 0 && (
                            <p>Não há projetos cadastrados</p>
                        )}
                    </div>
            </section>
        </main>
     );
}
 
export default Projects;