import React, { Component } from 'react';
import '../../css/pages/page404.css';
import { Link } from 'react-router-dom';

class Page404 extends Component {
    goBack(){
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="page404-container">
                <h2>Erro 404</h2>
                <p>Desculpe, mas esta página não existe.</p>
                <p>Clique no botão abaixo para voltar para a página inicial:</p>
                <a onClick={this.goBack.bind(this)}>Voltar</a>
            </div>
        );
    }
}

export default Page404;