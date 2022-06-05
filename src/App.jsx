import React from 'react';

import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import './App.css'

const App = () => {
    return ( 
        <>
            <BrowserRouter>
                <Header/>
                <Routes>

                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    );
}
 
export default App;