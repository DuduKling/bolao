import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../../css/pages/pageInside.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

function PageFixtures() {
    const [fixtures, setFixtures] = useState([]);
    const [campeonato, setCampeonato] = useState({});

    const [loading, setLoading] = useState(false);

    const params = useParams();

    useEffect(() => {
        const campeonatoID = params.campeonato;
        const faseID = params.fase;

        const cachedCampeonato = localStorage.getItem(campeonatoID + faseID + 'campeonato');
        if (cachedCampeonato) {
            setCampeonato(JSON.parse(cachedCampeonato));
        }

        const cachedFixtures = localStorage.getItem(campeonatoID + faseID + 'fixtures');
        if (cachedFixtures) {
            setFixtures(JSON.parse(cachedFixtures));
        }

        getFixturesAndCampeonato();
    }, []);

    const getFixturesAndCampeonato = async () => {
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
                setFixtures(response.fixtures);
                setLoading(false);

                localStorage.setItem(campeonatoID + faseID + 'fixtures', JSON.stringify(response.fixtures));
            },
            catchCallback: () => { },
        });

        dataString = JSON.stringify({
            campeonatoID,
        });

        // Campeonato
        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/campeonato/getCampeonatoInfo.php`,
            data: dataString,
            thenCallback: (response) => {
                setCampeonato(response.campeonato);

                localStorage.setItem(campeonatoID + faseID + 'campeonato', JSON.stringify(response.campeonato));
            },
            catchCallback: () => { },
        });
    };

    const checkFaseName = () => {
        const faseID = params.fase;
        if (!campeonato.fases) {
            return '';
        }

        const fase = campeonato.fases
            .filter(function (fase) {
                return fase.id === faseID;
            });

        return fase[0].nomeFase;
    };

    return (
        <section className="main-container">
            <div className="main-content">

                <div className="main-partidaForm">

                    <ul className="partidaLista">
                        <h3 className="pageTitle">
                            Jogos de {campeonato ? campeonato.nomeCampeonato : ''} - {campeonato ? checkFaseName() : ''}
                            <Loading loading={loading} localstorage="-withLocalStorage2" />
                        </h3>
                        {
                            fixtures.map(function (team, index) {
                                return (

                                    <PartidaListItem
                                        key={index}
                                        team={team}
                                        typeAll={'ReadOnly'}
                                        link={params}
                                    />

                                );
                            }, this)
                        }

                    </ul>

                </div>

            </div>
        </section>
    );
}

export default PageFixtures;
