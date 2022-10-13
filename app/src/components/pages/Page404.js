import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/pages/page404.css';
import logoCrownCry from '../../imgs/logo-crown-cry.png';

function Page404() {
    const navigate = useNavigate();

    return (
        <div className="page404-container">
            <img src={logoCrownCry} alt="Logo do bolão" />
            <h2>Erro 404</h2>
            <p>Desculpe, mas esta página não existe.</p>
            <p>Clique no botão abaixo para voltar para a página anterior:</p>
            <a onClick={() => navigate(-1)}>Voltar</a>
        </div>
    );
}

export default Page404;
