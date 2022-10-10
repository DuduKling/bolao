import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import '../../css/pages/pageInside.css';

import http from '../../util/http';
import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';
import RankListItem from '../util/RankListItem';

function PageDashboard() {
    const [fixtures, setFixtures] = useState([]);
    const [rank, setRank] = useState([]);
    const [campeonato, setCampeonato] = useState({});

    const [loading, setLoading] = useState(false);

    const params = useParams();

    const dataFetchedRef = useRef(false);

    useEffect(() => {
        const campeonatoID = params.campeonato;
        const faseID = params.fase;

        const cachedCampeonato = localStorage.getItem(campeonatoID + faseID + 'campeonato');
        if (cachedCampeonato) {
            setCampeonato(JSON.parse(cachedCampeonato));
        }

        const cachedRank = localStorage.getItem(campeonatoID + faseID + 'rank');
        if (cachedRank) {
            setRank(JSON.parse(cachedRank));
        }

        const cachedFixtures = localStorage.getItem(campeonatoID + faseID + 'fixtures');
        if (cachedFixtures) {
            setFixtures(JSON.parse(cachedFixtures));
        }

        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        getInfo();
    }, []);

    const getInfo = async () => {
        setLoading(true);

        const campeonatoID = params.campeonato;
        const faseID = params.fase;

        let dataString = JSON.stringify({
            faseID,
        });

        // Fixtures
        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/fixture/getFixturesFromCampeonato.php`,
            data: dataString,
            thenCallback: (response) => {
                setLoading(false);
                setFixtures(response.fixtures);

                localStorage.setItem(campeonatoID + faseID + 'fixtures', JSON.stringify(response.fixtures));
            },
            catchCallback: () => {
                setLoading(false);
            },
        });

        // Rank
        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/fixture/getRank.php`,
            data: dataString,
            thenCallback: (response) => {
                setLoading(false);
                setRank(response.rank);

                localStorage.setItem(campeonatoID + faseID + 'rank', JSON.stringify(response.rank));
            },
            catchCallback: () => {
                setLoading(false);
            },
        });

        dataString = JSON.stringify({
            campeonatoID,
        });

        //TODO Rever que com o id da fase da pra pegar essas informações do campeonato....
        // Campeonato
        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/campeonato/getCampeonatoInfo.php`,
            data: dataString,
            thenCallback: (response) => {
                setCampeonato(response.campeonato);

                localStorage.setItem(campeonatoID + faseID + 'campeonato', JSON.stringify(response.campeonato));
            },
            catchCallback: () => {
            },
        });
    };

    const checkStatus = () => {
        const faseID = params.fase;

        if (!campeonato.fases) {
            return '';
        }

        const qtdAposta = campeonato.fases
            .filter(function (fase) {
                return fase.id === faseID;
            })
            .reduce(function (acc, currValue) {
                return acc.concat(currValue.partes);
            }, [])
            .filter(function (parte) {
                return parte.statusParte === 'aposta';
            })
            .length;

        const qtdAberto = campeonato.fases
            .filter(function (fase) {
                return fase.id === faseID;
            })
            .reduce(function (acc, currValue) {
                return acc.concat(currValue.partes);
            }, [])
            .filter(function (parte) {
                return parte.statusParte === 'aberto';
            })
            .length;

        const qtdFinalizado = campeonato.fases
            .filter(function (fase) {
                return fase.id === faseID;
            })
            .reduce(function (acc, currValue) {
                return acc.concat(currValue.partes);
            }, [])
            .filter(function (parte) {
                return parte.statusParte === 'finalizado';
            })
            .length;

        const totalPartes = qtdAposta + qtdAberto + qtdFinalizado;


        const parteAberta = campeonato.fases
            .filter(function (fase) {
                return fase.id === faseID;
            })
            .reduce(function (acc, currValue) {
                return acc.concat(currValue.partes);
            }, [])
            .filter(function (parte) {
                return parte.statusParte === 'aposta';
            });

        if (qtdFinalizado === totalPartes) {
            return (
                <div className="dashboard-statusFase -finalizado">
                    <p>
                        Campeonato finalizado
                    </p>
                </div>
            );

        } else if (qtdAposta > 0) {
            return (
                <div className="dashboard-statusFase">
                    <Link to={'/campeonato/' + params.campeonato + '/' + params.fase + '/' + parteAberta[0].id + '/apostar'} >
                        Aposte: {parteAberta[0].nomeParte}
                    </Link>
                </div>
            );
        } else {
            return (
                <div className="dashboard-statusFase -aberto">
                    <p>
                        Campeonato em andamento
                    </p>
                </div>
            );
        }
    };

    const checkFaseName = () => {
        const faseID = params.fase;

        if (!campeonato.fases) {
            return '';
        }

        const fase = campeonato.fases
            .filter((fase) => fase.id === faseID);

        return fase[0] ? fase[0].nomeFase : '';
    };

    const showNextFixtures = () => {
        if (fixtures) {
            const qtdNextFixtures = fixtures
                .filter(function (fixture) {
                    return fixture.home_score === null;
                })
                .filter(function (fixture) {
                    return fixture.away_score === null;
                })
                .slice(0, 5)
                .length;

            if (qtdNextFixtures > 0) {
                return (
                    fixtures
                        .filter(function (fixture) {
                            return fixture.home_score === null;
                        })
                        .filter(function (fixture) {
                            return fixture.away_score === null;
                        })
                        .slice(0, 5)
                        .map(function (team, index) {
                            return (

                                <PartidaListItem
                                    key={index}
                                    team={team}
                                    typeAll={'ReadOnly'}
                                    params={params}
                                />

                            );
                        }, this)
                );
            } else {
                return (
                    <div className="errorMessage">
                        <p>Não há próximos jogos</p>
                    </div>
                );
            }

        }
    };

    const showLastFixtures = () => {
        if (fixtures) {
            const qtdLastFixtures = fixtures
                .filter(function (fixture) {
                    return fixture.home_score !== null;
                })
                .filter(function (fixture) {
                    return fixture.away_score !== null;
                })
                .reverse()
                .slice(0, 5)
                .length;

            if (qtdLastFixtures > 0) {
                return (
                    fixtures
                        .filter(function (fixture) {
                            return fixture.home_score !== null;
                        })
                        .filter(function (fixture) {
                            return fixture.away_score !== null;
                        })
                        .reverse()
                        .slice(0, 5)
                        .map(function (team, index) {
                            return (

                                <PartidaListItem
                                    key={index}
                                    team={team}
                                    typeAll={'ReadOnly'}
                                    params={params}
                                />

                            );
                        }, this)
                );
            } else {
                return (
                    <div className="errorMessage">
                        <p>Ainda não há jogos finalizados</p>
                    </div>
                );
            }

        }
    };

    const showRank = () => {
        if (rank) {
            let lastPoints = -1;
            let rankPosition = 0;

            return (

                rank
                    .map(function (rank, index) {
                        if (lastPoints !== rank.points) {
                            rankPosition = rankPosition + 1;
                            lastPoints = rank.points;
                            return (
                                <RankListItem
                                    key={index}
                                    rank={rank}
                                    position={rankPosition}
                                    params={params}
                                />
                            );
                        } else {
                            lastPoints = rank.points;
                            return (
                                <RankListItem
                                    key={index}
                                    rank={rank}
                                    position={rankPosition}
                                    positionIgual={true}
                                    params={params}
                                />
                            );
                        }

                    }, this)
            );
        } else {
            return <tr></tr>;
        }
    };

    return (
        <section className="main-container">
            <div className="main-dashboard">

                <div className="dashbord-top">
                    <h2>{campeonato ? campeonato.nomeCampeonato : ''}</h2>
                    <h4>{campeonato ? checkFaseName() : ''}</h4>

                    <Loading loading={loading} />
                </div>

                <div>
                    <div className="dashboard-main">

                        <div className="main-partidaForm">
                            <table className="rankTable">
                                <caption>
                                    <h3 className="pageTitle">Rank</h3>
                                    {campeonato ? checkStatus() : ''}
                                </caption>
                                <thead>
                                    <tr>
                                        <td className="positionColumn">#</td>
                                        <td className="nameColumn">Nome</td>
                                        <td className="pointsColumn">Pontos</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showRank()}
                                </tbody>
                            </table>

                        </div>

                    </div>

                    <div className="dashboard-aside">

                        <div className="main-partidaForm">
                            <ul className="partidaLista">
                                <h3 className="pageTitle">Próximos Jogos</h3>
                                <Link className="allFixturesLink" to={'/campeonato/' + params.campeonato + '/' + params.fase + '/jogos'}>Todos &gt;</Link>

                                {showNextFixtures()}

                            </ul>

                        </div>

                        <div className="main-partidaForm">

                            <ul className="partidaLista">
                                <h3 className="pageTitle">Últimos Jogos</h3>
                                <Link className="allFixturesLink" to={'/campeonato/' + params.campeonato + '/' + params.fase + '/jogos'}>Todos &gt;</Link>


                                {showLastFixtures()}

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PageDashboard;
