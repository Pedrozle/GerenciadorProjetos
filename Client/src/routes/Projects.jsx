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
    const [projectMessage, setProjectMessage] = useState('')

    useEffect(() => {
        fetch("http://192.168.100.196:5000/projects", {
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


    function removeProject(id) {
        setProjectMessage('')
        fetch(`http://192.168.100.196:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    let message = ''

    if(state){
        message = state.message
    }



    return ( 
        <main className="container">
            <section className={styles.projectContainer}>
                    {message && <Message type="success" msg={message} />}
                    {projectMessage && <Message type="success" msg={projectMessage} />}
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
                                    handleRemove={removeProject}
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