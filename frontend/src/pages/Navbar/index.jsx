import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../style/navbar.css';
import '../../style/style.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <img src="../../assets/OIP.jpg" alt="Logo" className="navbar-logo" />
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
                <li className="nav-item">
                    <NavLink to="/client/view" activeClassName="active">
                        Listados
                    </NavLink>
                </li>
                {/* Adicione mais itens de menu conforme necessário */}
            </ul>
        </nav>
    );
};

export default Navbar;