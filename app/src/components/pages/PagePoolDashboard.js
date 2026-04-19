import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../css/pages/pageInside.css';

import http from '../../util/http';
import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';
import RankListItem from '../util/RankListItem';

function PagePoolDashboard() {
    const [fixtures, setFixtures] = useState([]);
    const [rank, setRank] = useState([]);
    const [campeonato, setCampeonato] = useState({});
    const [userHasPlacedBet, setUserHasPlacedBet] = useState(false);

    const [loading, setLoading] = useState(false);

    const params = useParams();
    const poolUuid = params.poolUuid;

    const userUuid = useSelector((state) => state.auth.userUuid);

    const dataFetchedRef = useRef(false);

    const LOCAL_STORAGE_ITEM_RANK = `rank#${poolUuid}`;

    useEffect(() => {
        const cachedRank = localStorage.getItem(LOCAL_STORAGE_ITEM_RANK);
        if (cachedRank) {
            setRank(JSON.parse(cachedRank));
        }
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        setLoading(true);
        getFixtures();
        getRank();
    }, []);

    const getFixtures = async () => {
        const dataString = JSON.stringify({
            poolUuid,
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/fixture/getPoolFixtures.php`,
            data: dataString,
            withCredentials: true,
        })
            .then((response) => {
                setCampeonato(response.poolChampionshipInfo);

                let fixtures = response.poolFixtures;
                if (response.userPlacedBets && response.userPlacedBets.length > 0) {
                    setUserHasPlacedBet(true);
                    mergeFixturesAndBets(fixtures, response.userPlacedBets);
                }
                setFixtures(fixtures);

                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const mergeFixturesAndBets = (fixtures, userBetsToMerge) => {
        const bets = userBetsToMerge.reduce((acc, b) => {
            acc[b.id] = b;
            return acc;
        }, {});
        for (const fixture of fixtures) {
            fixture.awayTeamScoreBet = bets[fixture.id].awayTeamScoreBet;
            fixture.homeTeamScoreBet = bets[fixture.id].homeTeamScoreBet;
        }
    };

    const getRank = async () => {
        const dataString = JSON.stringify({
            poolUuid,
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/fixture/getRank.php`,
            data: dataString,
            withCredentials: true,
        })
            .then((response) => {
                setLoading(false);
                setRank(response.rank);

                localStorage.setItem(LOCAL_STORAGE_ITEM_RANK, JSON.stringify(response.rank));
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const checkStatus = () => {
        if (campeonato.status === 'finished') {
            return (
                <div className="dashboard-statusFase -finalizado">
                    <p>
                        Campeonato finalizado
                    </p>
                </div>
            );
        }

        if (campeonato.status === 'open' && !userHasPlacedBet) {
            return (
                <div className="dashboard-statusFase">
                    <Link to={`/pools/${campeonato.id}`} >
                        Aposte agora!
                    </Link>
                </div>
            );
        }

        return (
            <div className="dashboard-statusFase -aberto">
                <p>
                    Campeonato em andamento
                </p>
            </div>
        );
    };

    const showNextFixtures = () => {
        if (fixtures) {
            const nextFixtures = fixtures
                .filter((fixture) => fixture.homeTeamScore === null && fixture.awayTeamScore === null)
                .slice(0, 5);

            if (nextFixtures.length > 0) {
                return (
                    nextFixtures.map((fixture, index) => {
                        return (
                            <PartidaListItem
                                key={index}
                                fixture={fixture}
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
            const lastFixtures = fixtures
                .filter((fixture) => fixture.homeTeamScore !== null && fixture.awayTeamScore !== null)
                .reverse()
                .slice(0, 5);

            if (lastFixtures.length > 0) {
                return (
                    lastFixtures.map((fixture, index) => {
                        return (
                            <PartidaListItem
                                key={index}
                                fixture={fixture}
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
                rank.map((rank, index) => {
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
                    }

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

                }, this)
            );
        } else {
            return <tr></tr>;
        }
    };

    return (
        <section className="main-container">
            <div className="main-dashboard">

                <div className="dashboard-top">
                    <h2>{campeonato ? campeonato.name : ''}</h2>
                    <h4>{campeonato ? campeonato.championshipName + ' | ' + campeonato.phaseName : ''}</h4>
                    <div className='bets'>
                        <Link to={`/pools/${poolUuid}/user/${userUuid}`}>
                            Minhas apostas
                        </Link>
                    </div>
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
                                <div>
                                    <h3 className="pageTitle">Próximos Jogos</h3>
                                    <Link className="allFixturesLink" to={`/campeonato/${campeonato.championshipId}`}>Campeonato &gt;</Link>
                                </div>

                                {showNextFixtures()}

                            </ul>

                        </div>

                        <div className="main-partidaForm">

                            <ul className="partidaLista">
                                <div>
                                    <h3 className="pageTitle">Últimos Jogos</h3>
                                    <Link className="allFixturesLink" to={`/campeonato/${campeonato.championshipId}`}>Campeonato &gt;</Link>
                                </div>

                                {showLastFixtures()}

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PagePoolDashboard;
