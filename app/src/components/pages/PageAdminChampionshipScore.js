import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../../css/pages/pageInside.css';
import '../../css/util/formMessage.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import ChampionshipPhase from '../util/ChampionshipPhase';

function PageAdminChampionshipScore() {
    const [fixtures, setFixtures] = useState([]);
    const [poolChampionshipInfo, setPoolChampionshipInfo] = useState({});

    const [scores, setScores] = useState({});

    const [error, setError] = useState('');
    const [resp, setResp] = useState('');

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const params = useParams();
    const championshipId = params.championshipId;

    useEffect(() => {
        getFixturesAndCampeonato();
    }, []);

    const registerScore = (b) => {
        const newValue = {
            [b.fixture]: b.score === 'empty' ? undefined : b.score
        };
        setScores({ ...scores, ...newValue });
    };

    const getFixturesAndCampeonato = async () => {
        setLoading(true);

        const data = {
            championshipId: params.championshipId,
        };

        await http.getFixturesFromCampeonato(data)
            .then((response) => {
                setFixtures(response.fixtures);
                setPoolChampionshipInfo(response.poolChampionshipInfo);
                setLoading(false);
            })
            .catch(() => { });
    };

    const sendScores = async (event) => {
        event.preventDefault();

        setError('');
        setResp('');
        setLoading2(true);

        const data = {
            championshipId,
            scores,
        };

        await http.postResult(data)
            .then((response) => {
                setFixtures(response.fixtures);
                setPoolChampionshipInfo(response.poolChampionshipInfo);

                setResp(response.message);
                setLoading2(false);
            })
            .catch(({ message }) => {
                setError(message || 'Ocorreu um erro, contate o Administrador');
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

    const showButton = () => {
        if (Object.keys(fixtures).length !== 0) {
            return (
                <div className="EnviarAposta">
                    <input type="submit" className="SendButton" value="Salvar" />
                    <Loading loading={loading2} />
                </div>
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
                    viewType={'edit'}
                    setScoreController={registerScore}
                    isAdmin={true}
                />
            );
        });
    };

    return (
        <section className="main-container">
            <div className="main-content">

                <form
                    className="main-partidaForm"
                    onSubmit={async (event) => await sendScores(event)}
                    method="post"
                >

                    <ul className="partidaLista">
                        <div className="dashboard-top">
                            <h2>{poolChampionshipInfo ? poolChampionshipInfo.name : ''}</h2>
                            <Loading loading={loading} />
                        </div>

                        {showFixtures()}

                    </ul>

                    {showButton()}

                </form>

                {AJAXresp()}
            </div>
        </section >
    );
}

export default PageAdminChampionshipScore;
