import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../style/navbar.css';
import '../../style/style.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/" exact activeClassName="active">
                        Início
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/client" activeClassName="active">
                        Clientes
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;