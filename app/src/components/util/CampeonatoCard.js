import React from 'react';
import '../../css/pages/campeonato.css';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

/* Status:
    finalizado - Vai para dashboard (sem aposta lá).
    aberto - Vai para dashboard (com aposta lá).
    aposta - Vai para tela de Apostas.
    tba - Sem link (Mostra data de início).
*/

function CampeonatoCard(props) {
    const setImage = (campeonato) => {
        if (campeonato.logoCampeonato === '') {
            return '/imagens/campeonatos/default.png';
        } else {
            return '/imagens/campeonatos/' + campeonato.logoCampeonato;
        }
    };

    const checkStatus = (campeonato) => {
        const qtdAposta = campeonato.fases
            .reduce(function (acc, currValue) {
                return acc.concat(currValue.partes);
            }, [])
            .filter(function (parte) {
                return parte.statusParte === 'aposta';
            })
            .length;

        const qtdAberto = campeonato.fases
            .reduce(function (acc, currValue) {
                return acc.concat(currValue.partes);
            }, [])
            .filter(function (parte) {
                return parte.statusParte === 'aberto';
            })
            .length;

        const qtdTba = campeonato.fases
            .reduce(function (acc, currValue) {
                return acc.concat(currValue.partes);
            }, [])
            .filter(function (parte) {
                return parte.statusParte === 'tba';
            })
            .length;

        const qtdFinalizado = campeonato.fases
            .reduce(function (acc, currValue) {
                return acc.concat(currValue.partes);
            }, [])
            .filter(function (parte) {
                return parte.statusParte === 'finalizado';
            })
            .length;

        const totalPartes = qtdAposta + qtdAberto + qtdFinalizado + qtdTba;

        if (qtdTba === totalPartes) {
            return (
                <div className="campeonatoDiv tba">
                    <div className="imagemContainer">
                        <img src={setImage(campeonato)}
                            alt={'Logo do campeonato ' + campeonato.nomeCampeonato} />
                    </div>
                    <h4>{campeonato.nomeCampeonato}</h4>
                    <div className="date-container">{campeonato.dataInicioCampeonato}</div>
                </div>
            );
        } else if (qtdFinalizado === totalPartes) {
            return (
                <div className="campeonatoDiv finalizado">
                    <div className="imagemContainer">
                        <img src={setImage(props.campeonato)}
                            alt={'Logo do campeonato ' + props.campeonato.nomeCampeonato} />
                    </div>
                    <h4>{props.campeonato.nomeCampeonato}</h4>
                </div>
            );

        } else if (qtdAposta > 0) {
            return (
                <div className="campeonatoDiv aberto">
                    <div className="imagemContainer">
                        <img src={setImage(campeonato)}
                            alt={'Logo do campeonato ' + campeonato.nomeCampeonato} />
                    </div>
                    <h4>{campeonato.nomeCampeonato}</h4>
                    <div className="apostar-container aposte">Aposte!</div>
                </div>
            );
        } else {
            return (
                <div className="campeonatoDiv aberto">
                    <div className="imagemContainer">
                        <img src={setImage(campeonato)}
                            alt={'Logo do campeonato ' + campeonato.nomeCampeonato} />
                    </div>
                    <h4>{campeonato.nomeCampeonato}</h4>
                    <div className="apostar-container">Veja!</div>
                </div>
            );
        }
    };

    const checkFases = (campeonato, fase, index) => {
        const qtdFinalizado = fase.partes
            .reduce(function (acc, currValue) {
                return acc.concat(currValue);
            }, [])
            .filter(function (parte) {
                return parte.statusParte === 'finalizado';
            })
            .length;

        const qtdApostar = fase.partes
            .reduce(function (acc, currValue) {
                return acc.concat(currValue);
            }, [])
            .filter(function (parte) {
                return parte.statusParte === 'aposta';
            })
            .length;

        const qtdAberto = fase.partes
            .reduce(function (acc, currValue) {
                return acc.concat(currValue);
            }, [])
            .filter(function (parte) {
                return parte.statusParte === 'aberto';
            })
            .length;

        const total = qtdFinalizado + qtdAberto + qtdApostar;

        const parteAberta = fase.partes
            .reduce(function (acc, currValue) {
                return acc.concat(currValue);
            }, [])
            .filter(function (parte) {
                return parte.statusParte === 'aposta';
            });

        if (
            (qtdFinalizado > 0 && qtdFinalizado === total) ||
            (qtdAberto > 0 && qtdApostar === 0)
        ) {
            return (
                <Link
                    key={index}
                    className="campeonatoFases"
                    to={'/' + campeonato.idCampeonato + '/' + fase.id + '/dashboard'}
                >
                    {fase.nomeFase}
                </Link>
            );
        } else if (qtdAberto === 0 && qtdApostar > 0) {
            return (
                <Link
                    className="campeonatoFases apostar"
                    to={'/' + parteAberta[0].id + '/apostar'}
                >
                    {fase.nomeFase + ' / ' + parteAberta[0].nomeParte}
                </Link>
            );
        } else if (qtdAberto > 0 && qtdApostar > 0) {
            return (
                <div key={index}>
                    <Link
                        className="campeonatoFases"
                        to={'/' + campeonato.idCampeonato + '/' + fase.id + '/dashboard'}
                    >
                        {fase.nomeFase}
                    </Link>

                    <Link
                        className="campeonatoFases apostar"
                        to={'/' + parteAberta[0].id + '/apostar'}
                    >
                        {fase.nomeFase + ' / ' + parteAberta[0].nomeParte}
                    </Link>
                </div>
            );
        }
    };

    return (
        <div className="campeonatoCard">

            {checkStatus(props.campeonato)}

            <div className="campeonatoFases-container">
                {
                    props.campeonato.fases.map(function (fase, index) {
                        return checkFases(props.campeonato, fase, index);
                    }, this)
                }
            </div>
        </div>
    );
}

CampeonatoCard.propTypes = {
    campeonato: PropTypes.object,
};

export default CampeonatoCard;
