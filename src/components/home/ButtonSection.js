import React, { Component } from 'react';
import '../../css/home/buttonSection.css'

import { Link } from 'react-router-dom';

class ButtonSection extends Component {
    // TODO revisar esta parte de data aqui:
    checkDate(){
        let hoje = Date.now();
        let final  = new Date(this.props.dataFinal);
        let distancia = final.getTime() - hoje;
        if(distancia <= 0) {
            return (
                <div className="linksContainer">
                    <Link to="1/dashboard">Classificação (Fase Final)</Link>
                    <Link to="0/dashboard">Classificação (Fase de Grupos)</Link>
                </div>
            );
        }else {
            return (
                <div className="linksContainer">
                    <Link to="4/apostar">Apostar (Final)</Link>
                    <Link to="1/dashboard">Classificação (Fase Final)</Link>
                    <Link to="0/dashboard">Classificação (Fase de Grupos)</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <section className="home-btn">
                {this.checkDate()}
                {/*<Link to="1/dashboard">Classificação e resultados (Eliminatórias)</Link>*/}
            </section>
        );
    }
}

export default ButtonSection;