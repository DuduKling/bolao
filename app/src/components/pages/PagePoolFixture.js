import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import '../../css/pages/pageInside.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';
import routes from '../util/Routes';

function PagePoolFixture() {
    const [fixtures, setFixtures] = useState([]);
    const [winPercentages, setWinPercentages] = useState({});

    const [loading, setLoading] = useState(false);

    const params = useParams();
    const poolUuid = params.poolUuid;
    const fixtureId = params.fixtureId;

    useEffect(() => {
        getBets();
    }, []);

    const getBets = async () => {
        setLoading(true);

        const data = {
            poolUuid,
            fixtureId,
        };

        await http.getBetsFromFixture(data)
            .then((response) => {
                let fixtureBets = mergeFixturesAndBets(response.fixture, response.fixtureBets);
                fixtureBets = calculateBetsPercentages(fixtureBets);
                setFixtures(fixtureBets);

                setWinPercentages(calculateWinPercentages(fixtureBets));

                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const mergeFixturesAndBets = (fixture, fixtureBets) => {
        return fixtureBets.map((fixBet, index) => ({
            ...fixBet,
            homeTeamScoreBet: undefined,
            awayTeamScoreBet: undefined,
            users: fixBet.users.split(','),

            frontId: index,

            ...fixture[0],
            homeTeamScore: fixBet.homeTeamScoreBet,
            awayTeamScore: fixBet.awayTeamScoreBet,
        }));
    };

    const calculateBetsPercentages = (fixtureBets) => {
        const totalBets = fixtureBets.reduce((acc, fix) => acc + fix.users.length, 0);

        return fixtureBets.map((fixture) => ({
            ...fixture,
            porcentagem: totalBets > 0 ? Math.round((fixture.users.length / totalBets) * 100) : 0,
        })).sort((a, b) => b.porcentagem - a.porcentagem);
    };

    const calculateWinPercentages = (fixtureBets) => {
        const totalBets = fixtureBets.reduce((acc, fix) => acc + fix.users.length, 0);

        let qtdHomeBets = 0;
        let qtdDrawBets = 0;
        let qtdAwayBets = 0;

        fixtureBets.forEach((fixture) => {
            const { homeTeamScore, awayTeamScore, users } = fixture;

            if (homeTeamScore > awayTeamScore) {
                qtdHomeBets += users.length;
            } else if (homeTeamScore === awayTeamScore) {
                qtdDrawBets += users.length;
            } else if (homeTeamScore < awayTeamScore) {
                qtdAwayBets += users.length;
            }
        });

        return {
            homeTeam: qtdHomeBets ? Math.round((qtdHomeBets / totalBets) * 100) : 0,
            draw: qtdDrawBets ? Math.round((qtdDrawBets / totalBets) * 100) : 0,
            awayTeam: qtdAwayBets ? Math.round((qtdAwayBets / totalBets) * 100) : 0,
        };
    };

    const showFixtures = () => {
        if (fixtures.length > 0) {
            return (
                fixtures.map((fixture, index) => {
                    return (
                        <PartidaListItem
                            key={index}
                            fixture={fixture}
                            shows={['showUsers', 'showPercent']}
                        />
                    );
                }, this)
            );
        }

        return (
            <div className="errorMessage">
                <p>Ainda não há apostas para este jogo</p>
            </div>
        );
    };

    const showWinPercentages = () => {
        if (fixtures.length > 0) {
            return (
                <div className="winPercentages">
                    <div className="card">
                        {fixtures[0].homeTeamName}
                        <p className="percentage">
                            <span>{winPercentages.homeTeam}</span> %
                        </p>
                    </div>
                    <div className="card -empate">
                        Empate
                        <p className="percentage">
                            <span>{winPercentages.draw}</span> %
                        </p>
                    </div>
                    <div className="card">
                        {fixtures[0].awayTeamName}
                        <p className="percentage">
                            <span>{winPercentages.awayTeam}</span> %
                        </p>
                    </div>
                </div>
            );
        }

        return (<></>);
    };

    return (
        <section className="main-container">
            <div className="main-content">

                <div className="main-partidaForm" >

                    {showWinPercentages()}

                    <ul className="partidaLista">
                        <div>
                            <h3 className="pageTitle">
                                Apostas para este jogo
                                <Loading loading={loading} localstorage="-withLocalStorage2" />
                            </h3>
                            <Link className="allFixturesLink" to={routes.sendToPoolDashboard(poolUuid)}>Dashboard &gt;</Link>
                        </div>
                        {showFixtures()}
                    </ul>

                </div>

            </div>
        </section>
    );
}

export default PagePoolFixture;
