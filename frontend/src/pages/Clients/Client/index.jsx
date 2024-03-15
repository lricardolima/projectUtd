import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Navbar/index.jsx';
function Client() {
    return (
        <>
            <Navbar /> {/* Adicione a barra de navegação aqui */}

            <Outlet />
        </>
    );
}

export default Client;
