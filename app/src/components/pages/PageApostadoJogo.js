import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../../css/pages/pageInside.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

function PageApostadoJogo() {
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(false);

    const params = useParams();

    useEffect(() => {
        const fixtureID = params.fixture;
        const faseID = params.fase;

        const cachedFixtures = localStorage.getItem(faseID + fixtureID + 'campeonatoJogo');
        if (cachedFixtures) {
            setFixtures(JSON.parse(cachedFixtures));
        }

        getBets();
    }, []);

    const getBets = async () => {
        setLoading(true);

        const fixtureID = params.fixture;
        const faseID = params.fase;

        const dataString = JSON.stringify({
            fixtureID,
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/bets/getBetsFromFixture.php`,
            data: dataString,
            thenCallback: (response) => {
                setLoading(false);
                setFixtures(response.fixtures);

                localStorage.setItem(faseID + fixtureID + 'campeonatoJogo', JSON.stringify(response.fixtures));
            },
            catchCallback: () => {
                setLoading(false);
            },
        });
    };

    return (
        <section className="main-container">
            <div className="main-content">

                <div className="main-partidaForm" >

                    <ul className="partidaLista">
                        <h3 className="pageTitle">
                            Apostas para este jogo
                            <Loading loading={loading} localstorage="-withLocalStorage2" />
                        </h3>
                        {
                            fixtures.map(function (team, index) {
                                return (

                                    <PartidaListItem
                                        key={index}
                                        team={team}
                                        typeAll={'ReadOnly'}
                                        showUsers={true}
                                        showPercent={true}
                                        params={params}
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

export default PageApostadoJogo;
