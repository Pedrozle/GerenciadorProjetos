import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parse, v4 as uuidv4 } from 'uuid';

import Loading from '../components/layout/Loading';
import Message from '../components/Message';
import ProjectForm from './../form/ProjectForm';
import ServiceForm from './../form/ServiceForm';
import ServiceCard from './../components/ServiceCard';

import styles from './css/Projeto.module.css'

const Project = () => {

    const { id } = useParams()
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projeto, setProjeto] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
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
            setServices(data.services)
            setRemoveLoading(true)
        })
        .catch((error) => console.log(error))

    },[id])


    function toggleProjetoForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function editPost(projeto){

        setMessage('')

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

    function createService(projeto) {

        setMessage('')
        const lastService = projeto.services[projeto.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.custo
        const newCost = parseFloat(projeto.costs) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(projeto.orcamento)){
            setMessage('Orçamento ultrapassado, Verifique o valor do Serviço')
            setType('error')
            projeto.services.pop()
            return false
        }

        projeto.costs = newCost

        fetch(`http://192.168.100.196:5000/projects/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(projeto)
        })
        .then((response) => response.json())
        .then((data) => {
            setShowServiceForm(false)
            setMessage('Serviço adicionado com sucesso!')
            setType('success')
            console.log(data)
        })
        .catch((error) => console.log(error))

    }

    function removeService(id, custo){

        setMessage('')

        const servicesUpdated = projeto.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = projeto

        projectUpdated.services = servicesUpdated
        projectUpdated.costs = parseFloat(projectUpdated.costs) - parseFloat(custo)

        fetch(`http://192.168.100.196:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(projeto)
        })
        .then((response) => response.json())
        .then((data) => {
            setProjeto(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
            setType('success')
        })
        .catch((error) => console.log(error))

    }

    return ( 
        <>
            {projeto.titulo ? (
                <main className='container'>
                    
                    <section className={styles.projetoContainer}>
                        {message && <Message type={type} msg={message} />}
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
                            <ProjectForm 
                                handleSubmit={editPost} 
                                btnText="Concluir Edição" 
                                projectData={projeto} 
                            />
                        )}
                    </section>
                    <section className={styles.serviceContainer}>
                        <h2>Serviços:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                        </button>
                        {!showServiceForm ? (
                            <div className={styles.servicesList}>
                                {services.length > 0 ? (
                                    services.map((service) => (
                                        <ServiceCard 
                                            id={service.id}
                                            name={service.titulo}
                                            custo={service.custo}
                                            descricao={service.descricao}
                                            key = {service.id}
                                            handleRemove={removeService}

                                        />
                                    ))
                                ) : (
                                    <p>Não há Serviços cadastrados nesse projeto</p>
                                )}
                            </div>
                        ) : (
                            <div className={styles.serviceDetails}>
                                <ServiceForm 
                                    handleSubmit={createService}
                                    textBtn="Adicionar Serviço"
                                    projectData={projeto}
                                />
                            </div>
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