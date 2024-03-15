import React from 'react';
import Navbar from '../Navbar/index.jsx';
import '../../style/style.css'
function NoMatch() {
    return (
        <>
            <Navbar /> {/* Adicione a barra de navegação aqui */}
            <h1 className="title">NoMatch</h1>
        </>
    );
}

export default NoMatch;