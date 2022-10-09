import React from 'react';
import '../../css/home/nextBolao.css';

import Count from './Count';

import PropTypes from 'prop-types';

function NextAndTimer(props) {
    const checkDate = () => {
        let hoje = Date.now();
        let final = new Date(props.dataFinal);
        let distancia = final.getTime() - hoje;
        if (distancia > 0) {
            return (
                <Count dataFinal={props.dataFinal} />
            );
        }
    };

    return (
        <div className="nextBolao-container">
            <h2>Próximos bolões</h2>

            <div className="nextBolao-logos">
                <div className="nextBolao-logosEqual">
                    <div className="nextBolao-logoContainer">
                        <img className="nextBolao-logo" alt="" src={'/imagens/campeonatos/russia_2018.png'} />
                    </div>
                </div>
                <div className="nextBolao-logosEqual">
                    <div className="nextBolao-logoContainer">
                        <img className="nextBolao-logo" alt="" src={'/imagens/campeonatos/copa_america_2019.png'} />
                    </div>
                </div>
                <div className="nextBolao-logosEqual">
                    <div className="nextBolao-logoContainer">
                        <img className="nextBolao-logo" alt="" src={'/imagens/campeonatos/qatar_2022.png'} />
                    </div>
                </div>
            </div>

            <div className="nextBolao-timerContainer">
                {checkDate()}
            </div>

        </div>
    );
}

NextAndTimer.propTypes = {
    dataFinal: PropTypes.string,
};

export default NextAndTimer;
