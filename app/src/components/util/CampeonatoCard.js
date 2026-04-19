import React from 'react';
import '../../css/pages/campeonato.css';

import { Link } from 'react-router-dom';

import routes from '../util/Routes';

import PropTypes from 'prop-types';

function CampeonatoCard(props) {
    const setImage = () => {
        const logo = props.campeonato.logo;

        if (!logo) {
            return '/imagens/campeonatos/default.png';
        }

        return '/imagens/campeonatos/' + logo;
    };

    const checkStatus = () => {
        const campeonato = props.campeonato;
        const today = new Date();

        const startDate = new Date(campeonato.startDate);
        if (today < startDate) {
            return (
                <div className="campeonatoDiv tba">
                    <div className="imagemContainer">
                        <img src={setImage()}
                            alt={'Logo do campeonato ' + campeonato.name} />
                    </div>
                    <h4>{campeonato.name}</h4>
                    <div className="date-container">{startDate.toLocaleDateString()}</div>
                </div>
            );
        }

        const endDate = new Date(campeonato.endDate);
        if (today > endDate) {
            return (
                <div className="campeonatoDiv finalizado">
                    <div className="imagemContainer">
                        <img src={setImage(props.campeonato)}
                            alt={'Logo do campeonato ' + props.campeonato.name} />
                    </div>
                    <h4>{props.campeonato.name}</h4>
                </div>
            );
        }

        return (
            <div className="campeonatoDiv aberto">
                <div className="imagemContainer">
                    <img src={setImage()}
                        alt={'Logo do campeonato ' + campeonato.name} />
                </div>
                <h4>{campeonato.name}</h4>
                <div className="apostar-container">Veja!</div>
            </div>
        );
    };

    return (
        <Link className="campeonatoCard" to={routes.sendToChampionship(props.campeonato.id)}>

            {checkStatus()}

        </Link>
    );
}

CampeonatoCard.propTypes = {
    campeonato: PropTypes.object,
};

export default CampeonatoCard;
