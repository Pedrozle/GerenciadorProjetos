import React from 'react';
import { useState } from 'react'

import Input from './Input';
import SubmitButton from './SubmitButton';

const ServiceForm = ( {handleSubmit, textBtn, projectData} ) => {

    const [service, setService] = useState({})

    function handleChange(e){
        setService({ ... service, [e.target.name]: e.target.value })
    }

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    return ( 
        <form onSubmit={submit}>
            <Input 
                type="text" text="Titulo do Serviço" placeholder="Título do serviço" 
                name="titulo" handleOnChange={handleChange}
            />
            <Input 
                type="number" text="Custo do Serviço" placeholder="R$ 1000" 
                name="custo" handleOnChange={handleChange}
            />
            <Input 
                type="text" text="Descrição do Serviço" placeholder="Descreva do serviço" 
                name="descricao" handleOnChange={handleChange}
            />
            <SubmitButton text={textBtn}/>
        </form>
    );
}
 
    export default ServiceForm;