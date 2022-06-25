import React from 'react';
import { useLocation } from 'react-router-dom';

import Message from '../components/layout/Message';

const Projects = () => {

    const {state} = useLocation()
    let message = ''

    if(state){
        console.log("o state " + state.message)
        message = state.message
    }else{
        console.log("deu ruim " + state)
    }

    return ( 
        <main>
            <div className="container">
                <h1>Meus Projetos</h1>
                {message && <Message type="success" msg={message} />}
            </div>
        </main>
     );
}
 
export default Projects;