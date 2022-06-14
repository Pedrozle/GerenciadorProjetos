import React from 'react';

import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './routes/Home';
import NotFound from './routes/NotFound';
import Empresa from './routes/Empresa';
import Contato from './routes/Contato';
import NovoProjeto from './routes/NovoProjeto';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return ( 
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/empresa" element={<Empresa />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/novoprojeto" element={<NovoProjeto />} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    );
}
 
export default App;