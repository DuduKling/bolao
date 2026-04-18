import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../css/pages/pageInside.css';
import '../../css/util/formMessage.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import ChampionshipPhase from '../util/ChampionshipPhase';

function PageCampeonatoApostar() {
    const [fixtures, setFixtures] = useState([]);
    const [campeonato, setCampeonato] = useState('');

    const [userBets, setUserBets] = useState({});
    const [userHasPlacedBet, setUserHasPlacedBet] = useState(false);

    const [error, setError] = useState('');
    const [resp, setResp] = useState('');

    const [isBet, setIsBet] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const userName = useSelector((state) => state.auth.userName);

    const params = useParams();

    useEffect(() => {
        getFixtures();
    }, []);

    const registerBet = (b) => {
        setUserBets({ ...userBets, ...b });
    };

    const getFixtures = async () => {
        setLoading(true);

        const dataString = JSON.stringify({
            poolUuid: params.poolUuid,
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/fixture/getPoolFixtures.php`,
            data: dataString,
            withCredentials: true,
        })
            .then((response) => {
                setCampeonato(response.championshipInfo);

                let fixtures = response.poolFixtures;
                if (response.userPlacedBets && response.userPlacedBets.length > 0) {
                    setUserHasPlacedBet(true);
                    mergeFixturesAndBets(fixtures, response.userPlacedBets);
                }
                setFixtures(fixtures);

                setLoading(false);
            })
            .catch(({ message }) => {
                setLoading(false);
                setError(message);

                if (message.includes('#FGF1')) {
                    setIsBet(true);
                }
            });
    };

    const mergeFixturesAndBets = (fixtures, userBetsToMerge) => {
        console.log(userBetsToMerge);
        const bets = userBetsToMerge.reduce((acc, b) => {
            acc[b.id] = b;
            return acc;
        }, {});
        console.log(bets);
        for (const fixture of fixtures) {
            fixture.awayTeamScore = bets[fixture.id].awayTeamScoreBet;
            fixture.homeTeamScore = bets[fixture.id].homeTeamScoreBet;
        }
    };

    const sendBets = async (event) => {
        event.preventDefault();

        setError('');
        setResp('');
        setLoading2(true);

        const dataString = JSON.stringify({
            poolUuid: params.poolUuid,
            userBets,
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/bets/makeBets.php`,
            data: dataString,
            withCredentials: true,
        })
            .then((response) => {
                setResp(response.message);
                setLoading2(false);
            })
            .catch(({ message }) => {
                setError(message);
                setLoading2(false);
            });
    };

    const AJAXresp = () => {
        if (error === '' && resp === '') {
            return '';
        } else if (resp !== '') {
            return (
                <div className="message">
                    <p className="FormMessage -success">
                        {resp}
                    </p>
                </div>
            );
        } else if (error !== '') {
            if (isBet) {
                return showButtonToUserBets();
            }

            return (
                <div className="message">
                    <p className="FormMessage -error">
                        {error}
                    </p>
                </div>
            );
        }
    };

    const showButtonToUserBets = () => {
        const { campeonato, fase } = params;

        const buttonLink = `/campeonato/${campeonato}/${fase}/apostado/${userName}`;
        return (
            <div className="multipleMessage">
                <p className="FormMessage -success">
                    Você já apostou para esta parte do campeonato!
                </p>
                <Link className="SendButton" to={buttonLink}>
                    Veja sua aposta
                </Link>
            </div>
        );
    };

    const showButton = () => {
        if (!userHasPlacedBet && Object.keys(fixtures).length !== 0) {
            return (
                <>
                    <p className="sendButtonMessage">Lembre-se que, ao enviar suas apostas não será mais possível modificá-las.</p>
                    <div className="EnviarAposta">
                        <input type="submit" className="SendButton" value="Enviar" />
                        <Loading loading={loading2} />
                    </div>
                </>
            );
        }
    };

    const showWarning = () => {
        if (userHasPlacedBet) {
            return (
                <p className="warningMessage">Você já está participando deste bolão.</p>
            );
        }
    };

    const groupFixtures = (fixtures) => {
        const fix = fixtures.reduce((acc, fixture) => {
            if (!acc[fixture.phaseName]) { acc[fixture.phaseName] = []; }
            acc[fixture.phaseName].push(fixture);
            return acc;
        }, {});

        return Object.entries(fix);
    };

    const showFixtures = () => {
        return groupFixtures(fixtures).map(function ([phaseName, fixtures], index) {
            return (
                <ChampionshipPhase
                    key={index}
                    phaseName={phaseName}
                    fixtures={fixtures}
                    typeAll={userHasPlacedBet ? 'ReadOnly' : ''}
                    setBets={registerBet}
                />
            );
        });
    };

    return (
        <section className="main-container">
            <div className="main-content">

                <form
                    className="main-partidaForm"
                    onSubmit={async (event) => await sendBets(event)}
                    method="post"
                >

                    <ul className="partidaLista">
                        <div className="dashbord-top">
                            <h2>{campeonato.championshipName}</h2>
                            <Loading loading={loading} />
                        </div>
                        <h3 className="pageTitle">
                            Bolão: {campeonato ? campeonato.name : ''}
                        </h3>

                        {showWarning()}

                        {showFixtures()}

                    </ul>

                    {showButton()}

                </form>

                {AJAXresp()}
            </div>
        </section>
    );
}

export default PageCampeonatoApostar;
