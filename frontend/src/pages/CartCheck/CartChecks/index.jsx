import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Navbar/index.jsx';
function CartCheck() {
    return (
        <>
            <Navbar />

            <Outlet />
        </>
    );
}

export default CartCheck;
