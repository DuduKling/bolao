import React, { Component } from 'react';
import '../../css/home/welcomeSection.css'

import { Link } from 'react-router-dom';

class WelcomeSection extends Component {
    render() {
        return (
            <div className="welcome-container">
                <h2 className="welcome-title">Seja bem-vindo ao <span>Bolão Imperial!</span></h2>

                <p>Participe do bolão de futebol imperial e vença seus amigos! Mostre que você é bom de palpite, que conhece de futebol, ou que é só sortudo mesmo. E, de quebra, ainda pode levar para casa uma bolada de dinheiro!</p>
                
                <p><span>Participe e vença o maior bolão da região!</span><br /> 
                Clique no link abaixo e faça seu cadastro:</p>

                <Link to="/user/cadastrar" className="welcome-button">Quero participar!</Link>
            </div>
        );
    }
}

export default WelcomeSection;