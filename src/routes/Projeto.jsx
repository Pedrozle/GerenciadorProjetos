import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../components/layout/Loading';
import Message from '../components/Message';
import ProjectForm from './../form/ProjectForm';

import styles from './css/Projeto.module.css'

const Project = () => {

    const { id } = useParams()
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projeto, setProjeto] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState()

    useEffect(() => {

        fetch(`http://192.168.100.196:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(response => response.json())
        .then((data) => {
            setProjeto(data)
            setRemoveLoading(true)
        })
        .catch((error) => console.log(error))

    },[id])


    function toggleProjetoForm(e){
        e.preventDefault()
        setShowProjectForm(!showProjectForm)
    }

    function editPost(projeto){

        if(projeto.orcamento < projeto.costs){
            setMessage('O Orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://192.168.100.196:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(projeto)
        })
        .then((response) => response.json())
        .then((data) => {
            setProjeto(data)
            setShowProjectForm(false)
            setMessage('Projeto Atualizado!')
            setType('success')
        })
        .catch(error => console.log(error))

    }

    return ( 
        <>
            {projeto.titulo ? (
                <main className='container'>
                    {message && <Message type={type} msg={message} />}
                    <section className={styles.projetoContainer}>
                        <h1>Projeto: {projeto.titulo}</h1>
                        <button className={styles.btn} onClick={toggleProjetoForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.projetoDetails}>
                                <p>
                                    <span>Categoria: </span> 
                                    {projeto.category.name}
                                </p>
                                <p>
                                    <span>Orçamento: </span>  R$ {projeto.orcamento}
                                </p>
                                <p>
                                    <span>Total Utilizado: </span>  R$ {projeto.costs}
                                </p>
                                <p>
                                    <span>Motivo: </span>{projeto.motivo}
                                </p>
                            </div>
                        ) : (
                            <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={projeto} />
                        )}
                    </section>
                </main>
            ) : (
                <>
                    {!removeLoading && <Loading />}
                </>
            )}
        </>
    );
    
}
 
export default Project;