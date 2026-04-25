import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../css/pages/pageInside.css';
import '../../css/util/formMessage.css';

import http from '../../util/http';
import routes from '../util/Routes';

import Loading from '../util/Loading';
import ChampionshipPhase from '../util/ChampionshipPhase';

function PagePoolBet() {
    const [fixtures, setFixtures] = useState([]);
    const [poolChampionshipInfo, setPoolChampionshipInfo] = useState('');

    const [userBets, setUserBets] = useState({});
    const [userHasPlacedBet, setUserHasPlacedBet] = useState(false);

    const [error, setError] = useState('');
    const [resp, setResp] = useState('');

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const userUuid = useSelector((state) => state.auth.userUuid);

    const params = useParams();
    const poolUuid = params.poolUuid;

    useEffect(() => {
        getFixtures();
    }, []);

    const registerBet = (b) => {
        setUserBets({ ...userBets, ...b });
    };

    const getFixtures = async () => {
        setLoading(true);

        const data = {
            poolUuid,
        };

        await http.getPoolFixtures(data)
            .then((response) => {
                setPoolChampionshipInfo(response.poolChampionshipInfo);

                let fixtures = response.poolFixtures;
                if (response.userPlacedBets && response.userPlacedBets.length > 0) {
                    setUserHasPlacedBet(true);
                } else {
                    removeFixturesScores(fixtures);
                }
                setFixtures(fixtures);

                setLoading(false);
            })
            .catch(({ message }) => {
                setLoading(false);
                setError(message);
            });
    };

    const removeFixturesScores = (fixtures) => {
        for (const fixture of fixtures) {
            fixture.awayTeamScore = null;
            fixture.homeTeamScore = null;
        }
    };

    const sendBets = async (event) => {
        event.preventDefault();

        setError('');
        setResp('');
        setLoading2(true);

        const data = {
            poolUuid,
            userBets,
        };

        await http.makeBets(data)
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
        if (userHasPlacedBet) {
            return (
                <div className="multipleMessage">
                    <p className="FormMessage -success">
                        Você já apostou para esta parte do campeonato!
                    </p>
                    <Link className="SendButton" to={routes.sendToPoolUserBets(poolUuid, userUuid)}>
                        Veja sua aposta
                    </Link>
                </div>
            );
        }
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

    const groupFixtures = (fixtures) => {
        const fix = fixtures.reduce((acc, fixture) => {
            if (!acc[fixture.phaseName]) { acc[fixture.phaseName] = []; }
            acc[fixture.phaseName].push(fixture);
            return acc;
        }, {});

        return Object.entries(fix);
    };

    const showFixtures = () => {
        if (userHasPlacedBet) {
            return (
                <div className="phaseContainer">
                    <h3 className="pageTitle">{fixtures[0].phaseName}</h3>
                </div>
            );
        }

        return groupFixtures(fixtures).map(function ([phaseName, fixtures], index) {
            return (
                <ChampionshipPhase
                    key={index}
                    phaseName={phaseName}
                    fixtures={fixtures}
                    readOnly={userHasPlacedBet}
                    setBets={registerBet}
                />
            );
        });
    };

    const showFixturesToBet = () => {
        return (<>
            <form
                className="main-partidaForm"
                onSubmit={async (event) => await sendBets(event)}
                method="post"
            >

                <ul className="partidaLista">
                    <div className="dashboard-top">
                        <h2>{poolChampionshipInfo.championshipName}</h2>
                        <Loading loading={loading} />
                    </div>
                    <h3 className="pageTitle">
                        Bolão: {poolChampionshipInfo ? poolChampionshipInfo.name : ''}
                    </h3>

                    {showFixtures()}

                </ul>

                {showButton()}

            </form>

            {AJAXresp()}
        </>);
    };

    return (
        <section className="main-container">
            <div className="main-content">
                {showFixturesToBet()}
                {showButtonToUserBets()}
            </div>
        </section>
    );
}

export default PagePoolBet;
