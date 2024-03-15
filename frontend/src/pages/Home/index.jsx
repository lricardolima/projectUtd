import React from 'react';
import Navbar from '../Navbar/index.jsx';
import '../../style/style.css'

function Home() {
    return (
        <>
            <Navbar/> {/* Adicione a barra de navegação aqui */}
            <h1 className="title">Home</h1>
        </>
    );
}

export default Home;
