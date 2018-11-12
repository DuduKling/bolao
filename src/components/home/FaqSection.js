import React, { Component } from 'react';
import '../../css/home/faqSection.css';

import { Link } from 'react-router-dom';

class FaqSection extends Component {
    render() {
        return (
            <div className="FaqSection-container">
                <h2>FAQ</h2>
                <div className="FaqSection-regulamento">
                    <h3>O que é o Bolão do Gui?</h3>
                    <p>É uma plataforma online para brincar do popular "bolão da copa" com amigos e familiares. Foi criado com o intuito de aprendizado no desenvolvimento da plataforma e, também, para facilitar e melhorar a forma como era feito os bolões do Gui. Resumindo, nada mais de fazer as apostas no papel ou em planilhas no Excel!</p>

                    <h3>Como participar?</h3>
                    <p>Basta fazer o cadastro na plataforma e esperar a data de início para poder fazer as apostas. Também é necessário entrar em contato com um dos representantes do bolão, como informado no <Link to="/regulamento">Regulamento</Link>.</p>

                    <h3>Quais prêmios posso ganhar?</h3>
                    <p>O objetivo da plataforma é promover o entretenimento e a diversão com os amigos durante as competições. Os prêmios são definidos de acordo com a quantidade de participantes. Leia o <Link to="/regulamento">Regulamento</Link> para saber mais!</p>
                </div>
            </div>
        );
    }
}

export default FaqSection;