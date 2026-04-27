import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../../css/pages/pageInside.css';
import '../../css/util/formMessage.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import ChampionshipPhase from '../util/ChampionshipPhase';

function PagePoolBet() {
    const [fixtures, setFixtures] = useState([]);
    const [poolChampionshipInfo, setPoolChampionshipInfo] = useState('');

    const [userBets, setUserBets] = useState({});
    const [userHasPlacedBet, setUserHasPlacedBet] = useState(false);
    const [userBetParticipation, setUserBetParticipation] = useState([]);

    const [error, setError] = useState('');
    const [resp, setResp] = useState('');

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const params = useParams();
    const poolUuid = params.poolUuid;

    useEffect(() => {
        getFixtures();
    }, []);

    const registerBet = (b) => {
        const newValue = {
            [b.fixture]: b.score === 'empty' ? undefined : b.score
        };
        setUserBets({ ...userBets, ...newValue });
    };

    const getFixtures = async () => {
        setLoading(true);

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
            .catch(({ message }) => {
                setLoading(false);
                setError(message);
            });
    };

    const mergeFixturesAndBets = (fixtures, userBetsToMerge) => {
        const bets = userBetsToMerge.reduce((acc, b) => {
            acc[b.id] = b;
            return acc;
        }, {});
        for (const fixture of fixtures) {
            fixture.awayTeamScore = null;
            fixture.homeTeamScore = null;

            if (bets[fixture.id]) {
                const { homeTeamScoreBet, awayTeamScoreBet } = bets[fixture.id];

                fixture.homeTeamScore = homeTeamScoreBet;
                fixture.awayTeamScore = awayTeamScoreBet;
            }
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
                setUserBetParticipation(response.userBetParticipation);

                const fix = response.poolFixtures;
                mergeFixturesAndBets(fix, response.userPlacedBets);
                setFixtures(fix);

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

    const showUserMessages = () => {
        const messages = [];

        if (userHasPlacedBet) {
            messages.push({
                color: '-success',
                text: 'Você já está participando deste campeonato!',
            });
        }

        const userHasMissingPartsToBet = userBetParticipation.filter((b) => b.countBets === 0).length;
        if (userHasMissingPartsToBet > 0) {
            const text = userHasMissingPartsToBet === 1 ?
                `Existe ${userHasMissingPartsToBet} parte pendente para apostar` :
                `Existem ${userHasMissingPartsToBet} partes pendentes para apostar`;

            messages.push({
                color: '-warning',
                text,
            });
        }

        return (<>
            {
                messages.map((m, i) => (
                    <p key={i} className={`FormMessage ${m.color}`}>{m.text}</p>
                ))
            }
        </>);
    };

    const showButton = () => {
        const hasFixtures = Object.keys(fixtures).length !== 0;
        const userHasMissingPartsToBet = userBetParticipation.filter((b) => b.countBets === 0).length;
        if (hasFixtures && userHasMissingPartsToBet > 0) {
            return (
                <>
                    {/* <p className="sendButtonMessage">Lembre-se que, ao enviar suas apostas não será mais possível modificá-las.</p> */}
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
        return groupFixtures(fixtures).map(function ([phaseName, fixtures], index) {
            return (
                <ChampionshipPhase
                    key={index}
                    phaseName={phaseName}
                    fixtures={fixtures}
                    viewType={userHasPlacedBet ? '' : 'edit'}
                    setScoreController={registerBet}
                    partViewTypeEditList={userBetParticipation.map((b) => b.countBets === 0 ? b.part : '')}
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
                        <h2>Aposte agora!</h2>
                        <Loading loading={loading} />
                    </div>
                    <p className="metadata">
                        {poolChampionshipInfo ? poolChampionshipInfo.name : ''}
                        <br />
                        {poolChampionshipInfo.championshipName}
                    </p>

                    {showUserMessages()}

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
            </div>
        </section>
    );
}

export default PagePoolBet;
