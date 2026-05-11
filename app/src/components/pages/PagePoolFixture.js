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
                let fixtures = mergeFixturesAndBets(response.fixture, response.fixtureBets);
                fixtures = calculateBetsPercentages(fixtures);
                setFixtures(fixtures);

                setWinPercentages(calculateWinPercentages(fixtures));

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

    const calculateBetsPercentages = (fixtures) => {
        const totalBets = fixtures.reduce((acc, fix) => acc + fix.users.length, 0);

        return fixtures.map((fixture) => ({
            ...fixture,
            porcentagem: totalBets > 0 ? Math.round((fixture.users.length / totalBets) * 100) : 0,
        })).sort((a, b) => b.porcentagem - a.porcentagem);
    };

    const calculateWinPercentages = (fixtures) => {
        const totalBets = fixtures.reduce((acc, fix) => acc + fix.users.length, 0);

        const result = {
            homeTeamWinPercentage: 0,
            drawPercentage: 0,
            awayTeamWinPercentage: 0,
        };

        fixtures.forEach((fixture) => {
            const isHomeTeamWin = fixture.homeTeamScoreBet > fixture.awayTeamScoreBet;
            const isDraw = fixture.homeTeamScoreBet === fixture.awayTeamScoreBet;
            const isAwayTeamWin = fixture.homeTeamScoreBet < fixture.awayTeamScoreBet;

            if (isHomeTeamWin) {
                result.homeTeamWinPercentage += fixture.users.length;
            } else if (isDraw) {
                result.drawPercentage += fixture.users.length;
            } else if (isAwayTeamWin) {
                result.awayTeamWinPercentage += fixture.users.length;
            }
        });

        if (totalBets > 0) {
            result.homeTeamWinPercentage = Math.round((result.homeTeamWinPercentage / totalBets) * 100);
            result.drawPercentage = Math.round((result.drawPercentage / totalBets) * 100);
            result.awayTeamWinPercentage = Math.round((result.awayTeamWinPercentage / totalBets) * 100);
        }

        return result;
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
                            <span>{winPercentages.homeTeamWinPercentage}</span> %
                        </p>
                    </div>
                    <div className="card -empate">
                        Empate
                        <p className="percentage">
                            <span>{winPercentages.drawPercentage}</span> %
                        </p>
                    </div>
                    <div className="card">
                        {fixtures[0].awayTeamName}
                        <p className="percentage">
                            <span>{winPercentages.awayTeamWinPercentage}</span> %
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
