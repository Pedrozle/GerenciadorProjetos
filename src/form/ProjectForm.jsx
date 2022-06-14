import React from 'react';
import { useEffect, useState} from 'react';

import styles from './css/ProjectForm.module.css'
import Input from './Input';
import Select from './Select';
import SubmitButton from './SubmitButton';



const ProjectForm = ( {btnText} ) => {

    const [categories, setCategories] = useState([])

    useEffect( () => { //useEffect carrega os dados somente uma vez ao invés de um loop infinito
        fetch("http://localhost:5000/categories", { //faz uma requisição ao "backend" com os dados
            method: 'GET',
            header:{
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json()) //transforma a resposta em JSON
            .then((data) => { //atribui os dados do JSON à variável categories
                setCategories(data)
            })
            .catch((error) => console.log(error))
    }, [])

    return ( 
        <form >
            <Input type="text" text="Título do Projeto:" name="titulo" placeholder="Insira o Titulo do Projeto" handleOnChange="" value="" />
            <Input type="text" text="Orçamento Total:" name="orcamento" placeholder="Insira o Orçamento do Projeto" handleOnChange="" value="" />
            <Select name="category_id" text="Selecione a Categoria" options={categories}/>
            <SubmitButton  text={btnText}/>
        </form>
     );
}
 
export default ProjectForm;