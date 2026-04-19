import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import '../../css/pages/pageInside.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import ChampionshipPhase from '../util/ChampionshipPhase';

function PageChampionshipFixtures() {
    const [fixtures, setFixtures] = useState([]);
    const [campeonato, setCampeonato] = useState({});

    const [loading, setLoading] = useState(false);

    const params = useParams();

    const dataFetchedRef = useRef(false);

    const LOCAL_STORAGE_ITEM = `championship#${params.championshipId}`;

    useEffect(() => {
        const cachedFixtures = localStorage.getItem(LOCAL_STORAGE_ITEM);
        if (cachedFixtures) {
            const data = JSON.parse(cachedFixtures);
            setFixtures(data.fixtures);
            setCampeonato(data.poolChampionshipInfo);
        }

        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        getFixturesAndCampeonato();
    }, []);

    const getFixturesAndCampeonato = async () => {
        setLoading(true);

        const dataString = JSON.stringify({
            championshipId: params.championshipId,
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/fixture/getFixturesFromCampeonato.php`,
            data: dataString,
        })
            .then((response) => {
                setFixtures(response.fixtures);
                setCampeonato(response.poolChampionshipInfo);
                setLoading(false);

                localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(response));
            })
            .catch(() => { });
    };

    const groupFixtures = (fixtures) => {
        const fix = fixtures.reduce((acc, fixture) => {
            if (!acc[fixture.phaseName]) { acc[fixture.phaseName] = []; }
            acc[fixture.phaseName].push(fixture);
            return acc;
        }, {});

        return Object.entries(fix);
    };

    return (
        <section className="main-container">
            <div className="main-content">

                <div className="main-partidaForm">

                    <ul className="partidaLista">
                        <div className="dashboard-top">
                            <h2>{campeonato ? campeonato.name : ''}</h2>
                            <Loading loading={loading} />
                        </div>
                        {
                            groupFixtures(fixtures).map(function ([phaseName, fixtures], index) {
                                return (
                                    <ChampionshipPhase
                                        key={index}
                                        phaseName={phaseName}
                                        fixtures={fixtures}
                                        typeAll={'ReadOnly'}
                                    />
                                );
                            })
                        }
                    </ul>

                </div>

            </div>
        </section>
    );
}

export default PageChampionshipFixtures;
