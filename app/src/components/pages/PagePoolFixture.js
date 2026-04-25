import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../../css/pages/pageInside.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

function PagePoolFixture() {
    const [fixtures, setFixtures] = useState([]);
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
                const fixtures = mergeFixturesAndBets(response.fixture, response.fixtureBets);
                setFixtures(fixtures);

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

    return (
        <section className="main-container">
            <div className="main-content">

                <div className="main-partidaForm" >

                    <ul className="partidaLista">
                        <div>
                            <h3 className="pageTitle">
                                Apostas para este jogo
                                <Loading loading={loading} localstorage="-withLocalStorage2" />
                            </h3>
                        </div>
                        {
                            fixtures.map((fixture, index) => {
                                return (
                                    <PartidaListItem
                                        key={index}
                                        fixture={fixture}
                                        readOnly={true}
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

export default PagePoolFixture;
