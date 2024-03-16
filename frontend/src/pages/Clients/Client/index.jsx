import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Navbar/index.jsx';
function Client() {
    return (
        <>
            <Navbar />

            <Outlet />
        </>
    );
}

export default Client;
