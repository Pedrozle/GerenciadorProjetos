
//FALTA CONSERTAR A LINHA 44 COM ESSE LINK https://www.youtube.com/watch?v=gIWmB3EV4Bo&list=PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO&index=25





import React from 'react';
import { useEffect, useState} from 'react';

import styles from './css/ProjectForm.module.css'
import Input from './Input';
import Select from './Select';
import SubmitButton from './SubmitButton';


const ProjectForm = ( {handleSubmit, btnText, projectData} ) => {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

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

    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject( {...project, [e.target.name]: e.target.value} )
        console.log(project)
    }

    function handleCategory(e){
        setProject( {
            ...project, 
            category:{
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }
        } )
    }

    return ( 
        <form onSubmit={submit}>
            <Input type="text" text="Título do Projeto:" name="titulo" 
                placeholder="Insira o Titulo do Projeto" handleOnChange={handleChange}
                value={project.titulo ? project.titulo : ''}
            />

            <Input type="text" text="Orçamento Total:" name="orcamento" 
                placeholder="Insira o Orçamento do Projeto" handleOnChange={handleChange}
                value={project.orcamento ? project.orcamento : ''}
            />
            
            <Input type="text" text="Motivo:" name="motivo" 
                placeholder="Insira o Motivo do Projeto" handleOnChange={handleChange}
                value={project.motivo ? project.motivo : ''}
            />

            <Select name="category_id" text="Selecione a Categoria" 
                handleOnChange={handleCategory} options={categories} 
                value={ project.category ? project.category.id : '' }
            />
            <SubmitButton  text={btnText}/>
        </form>
     );
}
 
export default ProjectForm;