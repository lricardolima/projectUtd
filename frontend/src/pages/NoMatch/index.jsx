import React from 'react';
import Navbar from '../Navbar/index.jsx';
import { Link } from 'react-router-dom';
import '../../style/noMatch.css';
import {FaArrowLeft} from "react-icons/fa";

function NoMatch() {
    return (
        <>
            <Navbar />
            <div className="container">
                <fieldset className="error-container">
                    <legend className="title">Erro 404 - Página não encontrada</legend>
                    <p>A página que você está procurando não pôde ser encontrada.</p>
                    <p>Por favor, verifique o URL ou retorne à página inicial.</p>
                    <Link to="/" className="btn-home"> <FaArrowLeft/>  Voltar à Página Inicial</Link>
                </fieldset>
            </div>
        </>
    );
}

export default NoMatch;
