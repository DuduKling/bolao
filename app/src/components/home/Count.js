import React, { useEffect, useState } from 'react';
import '../../css/home/timer.css';

import PropTypes from 'prop-types';

// TODO não deixar aparecer NaN qnd a data tiver passado.
function Count(props) {
    const [dias, setDias] = useState('-');
    const [horas, setHoras] = useState('-');
    const [minutos, setMinutos] = useState('-');
    const [segundos, setSegundos] = useState('-');
    const [countInterval, setCountInterval] = useState(0);

    useEffect(() => {
        setCountInterval(setInterval(() => startTimer(), 1000));

        // returned function will be called on component unmount
        return () => {
            clearInterval(countInterval);
        };
    }, []);

    const startTimer = () => {
        let hoje = Date.now();
        let final = new Date(props.dataFinal);
        let distancia = final.getTime() - hoje;

        let dias = '';
        let horas = '';
        let minutos = '';
        let segundos = '';

        if (distancia <= 0) {
            dias = 0;
            horas = 0;
            minutos = 0;
            segundos = 0;
        } else {
            dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
            horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            segundos = Math.floor((distancia % (1000 * 60)) / 1000);
        }

        setDias(dias);
        setHoras(horas);
        setMinutos(minutos);
        setSegundos(segundos);
    };

    return (
        <div id="timer-wrapper">
            <div className="fundo-num" >
                <p className="num-title">Dias</p>
                <div className="num" id="dias">{dias}</div>
            </div>

            <div className="fundo-num" >
                <p className="num-title">Horas</p>
                <div className="num" id="hrs">{horas}</div>
            </div>

            <div className="fundo-num" >
                <p className="num-title">Minutos</p>
                <div className="num" id="min">{minutos}</div>
            </div>

            <div className="fundo-num">
                <p className="num-title">Segundos</p>
                <div className="num" id="seg">{segundos}</div>
            </div>
        </div>
    );
}

Count.propTypes = {
    dataFinal: PropTypes.string,
};

export default Count;
