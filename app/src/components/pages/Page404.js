import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/pages/page404.css';

function Page404() {
    const navigate = useNavigate();

    return (
        <div className="page404-container">
            <h2>Erro 404</h2>
            <p>Desculpe, mas esta página não existe.</p>
            <p>Clique no botão abaixo para voltar para a página inicial:</p>
            <a onClick={() => navigate(-1)}>Voltar</a>
        </div>
    );
}

export default Page404;
