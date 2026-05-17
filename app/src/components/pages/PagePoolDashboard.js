import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../css/pages/pageInside.css';

import http from '../../util/http';
import routes from '../util/Routes';
import parser from '../util/Parser';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';
import RankListItem from '../util/RankListItem';

function PagePoolDashboard() {
    const [fixtures, setFixtures] = useState([]);
    const [rank, setRank] = useState([]);
    const [poolChampionshipInfo, setPoolChampionshipInfo] = useState({});
    const [userHasPlacedBet, setUserHasPlacedBet] = useState(false);
    const [userBetParticipation, setUserBetParticipation] = useState([]);

    const [loading, setLoading] = useState(false);

    const params = useParams();
    const poolUuid = params.poolUuid;

    const userUuid = useSelector((state) => state.auth.userUuid);

    const dataFetchedRef = useRef(false);

    const LOCAL_STORAGE_ITEM_RANK = `rank#${poolUuid}`;

    useEffect(() => {
        const cachedRank = localStorage.getItem(LOCAL_STORAGE_ITEM_RANK);
        if (cachedRank) {
            const data = parser.json(cachedRank);
            if (data) {
                setRank(data);
            }
        }
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        setLoading(true);
        getFixtures();
        getRank();
    }, []);

    const getFixtures = async () => {
        const data = {
            poolUuid,
        };

        await http.getPoolFixtures(data)
            .then((response) => {
                setPoolChampionshipInfo(response.poolChampionshipInfo);
                setUserBetParticipation(response.userBetParticipation);

                if (response.userPlacedBets && response.userPlacedBets.length > 0) {
                    setUserHasPlacedBet(true);
                }

                const fix = response.poolFixtures;
                mergeFixturesAndBets(fix, response.userPlacedBets);
                setFixtures(fix);

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
            if (bets[fixture.id]) {
                const { homeTeamScoreBet, awayTeamScoreBet, points } = bets[fixture.id];

                fixture.points = points;
                fixture.homeTeamScoreBet = homeTeamScoreBet;
                fixture.awayTeamScoreBet = awayTeamScoreBet;
            }
        }
    };

    const getRank = async () => {
        const data = {
            poolUuid,
        };

        await http.getRank(data)
            .then((response) => {
                setLoading(false);
                setRank(response.rank);

                if (response.rank) {
                    localStorage.setItem(LOCAL_STORAGE_ITEM_RANK, JSON.stringify(response.rank));
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const checkStatus = () => {
        const status = poolChampionshipInfo.status;

        if (status === 'finished') {
            return (
                <div className="dashboard-statusFase -finalizado">
                    <p>Campeonato finalizado</p>
                </div>
            );
        }

        const userHasMissingPartsToBet = userBetParticipation.filter((b) => b.countBets === 0).length;
        if (userHasMissingPartsToBet > 0) {
            return (
                <div className="dashboard-statusFase">
                    <Link to={routes.sendToPoolBet(poolChampionshipInfo.uuid)} >
                        Novas apostas disponíveis!
                    </Link>
                </div>
            );
        }

        if (status === 'open' && !userHasPlacedBet) {
            return (
                <div className="dashboard-statusFase">
                    <Link to={routes.sendToPoolBet(poolChampionshipInfo.uuid)} >
                        Aposte agora!
                    </Link>
                </div>
            );
        }

        if (userHasPlacedBet) {
            return (
                <div className="dashboard-statusFase -aberto">
                    <p>Veja o seu rank abaixo</p>
                </div>
            );
        }

        return (
            <div className="dashboard-statusFase -aberto">
                <p>Campeonato em andamento</p>
            </div>
        );
    };

    const showNextFixtures = () => {
        const nextFixtures = fixtures
            .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
            .filter((fixture) => fixture.homeTeamScore === null && fixture.awayTeamScore === null)
            .slice(0, 5);

        if (nextFixtures.length > 0) {
            return (
                nextFixtures.map((fixture, index) => {
                    return (
                        <PartidaListItem
                            key={index}
                            fixture={fixture}
                            shows={['showAsLink', 'showBetAndPoints']}
                            poolUuid={poolUuid}
                        />
                    );
                }, this)
            );
        }

        return (
            <div className="errorMessage">
                <p>Não há próximos jogos</p>
            </div>
        );
    };

    const showLastFixtures = () => {
        const lastFixtures = fixtures
            .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
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
                            shows={['showAsLink', 'showBetAndPoints']}
                            poolUuid={poolUuid}
                        />
                    );
                }, this)
            );
        }

        return (
            <div className="errorMessage">
                <p>Ainda não há jogos finalizados</p>
            </div>
        );
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
                                poolUuid={poolUuid}
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
                            poolUuid={poolUuid}
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
                    <h2>{poolChampionshipInfo ? poolChampionshipInfo.name : ''}</h2>
                    <h4>{poolChampionshipInfo ? poolChampionshipInfo.championshipName + ' | ' + poolChampionshipInfo.phaseName : ''}</h4>
                    <div className="dashboard-statusFase -aberto">
                        <p>Veja o rank abaixo</p>
                    </div>
                    <div className='bets'>
                        {
                            userHasPlacedBet ? (
                                <Link to={routes.sendToPoolUserBets(poolUuid, userUuid)}>
                                    Minhas apostas
                                </Link>
                            ) : 'Você não está participando deste bolão'
                        }
                    </div>
                    <Loading loading={loading} />
                </div>

                <div>
                    <div className="dashboard-main">

                        <div className="main-partidaForm">
                            <table className="rankTable">
                                <caption>
                                    <h3 className="pageTitle">Rank</h3>
                                    {poolChampionshipInfo ? checkStatus() : ''}
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
                                    <Link className="allFixturesLink" to={routes.sendToChampionship(poolChampionshipInfo.championshipId)}>Campeonato &gt;</Link>
                                </div>

                                {showNextFixtures()}

                            </ul>

                        </div>

                        <div className="main-partidaForm">

                            <ul className="partidaLista">
                                <div>
                                    <h3 className="pageTitle">Últimos Jogos</h3>
                                    <Link className="allFixturesLink" to={routes.sendToChampionship(poolChampionshipInfo.championshipId)}>Campeonato &gt;</Link>
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
