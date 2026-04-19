import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import '../../css/pages/pageInside.css';

import http from '../../util/http';
import routes from '../util/Routes';

import Loading from '../util/Loading';
import ChampionshipPhase from '../util/ChampionshipPhase';
import Avatar from '../util/Avatar';

function PagePoolUserBet() {
    const [user, setUser] = useState([]);
    const [fixtures, setFixtures] = useState([]);
    const [poolChampionshipInfo, setPoolChampionshipInfo] = useState('');

    const [loading, setLoading] = useState(false);

    const params = useParams();
    const poolUuid = params.poolUuid;
    const userUuid = params.userUuid;

    const dataFetchedRef = useRef(false);

    const LOCAL_STORAGE_ITEM = `bets#${poolUuid}#${userUuid}`;

    useEffect(() => {
        const cachedFixtures = localStorage.getItem(LOCAL_STORAGE_ITEM);
        if (cachedFixtures) {
            const data = JSON.parse(cachedFixtures);

            let fixtures = data.poolFixtures;
            if (data.userPlacedBets && data.userPlacedBets.length > 0) {
                mergeFixturesAndBets(fixtures, data.userPlacedBets);
            }
            setFixtures(fixtures);

            setPoolChampionshipInfo(data.poolChampionshipInfo);
            setUser(data.userData);
        }

        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        getBets();
    }, []);

    const getBets = async () => {
        setLoading(true);

        const data = {
            poolUuid,
            userUuid,
        };

        await http.getBetsFromUser(data)
            .then((response) => {
                setLoading(false);

                let fixtures = response.poolFixtures;
                if (response.userPlacedBets && response.userPlacedBets.length > 0) {
                    mergeFixturesAndBets(fixtures, response.userPlacedBets);
                }
                setFixtures(fixtures);

                setPoolChampionshipInfo(response.poolChampionshipInfo);
                setUser(response.userData);

                localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(response));
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const mergeFixturesAndBets = (fixtures, userBetsToMerge) => {
        const bets = userBetsToMerge.reduce((acc, b) => {
            acc[b.id] = b;
            return acc;
        }, {});
        for (const fixture of fixtures) {
            fixture.awayTeamScore = bets[fixture.id].awayTeamScoreBet;
            fixture.homeTeamScore = bets[fixture.id].homeTeamScoreBet;
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
                    typeAll={'ReadOnly'}
                />
            );
        });
    };

    return (
        <section className="main-container">
            <div className="main-content">

                <div className="main-partidaForm" >

                    <div className="userImage-container">
                        <div className="userImage">
                            <Avatar userName={user.name || ''} />
                        </div>
                    </div>

                    <ul className="partidaLista -apostado">
                        <h3 className="pageTitle">
                            {user.name}

                            <br />
                            <br />
                            <span className="mainTitle">
                                {poolChampionshipInfo.championshipName}
                            </span>
                            <br />
                            <span className="subTitle">
                                Bolão: <Link to={routes.sendToPoolDashboard(poolChampionshipInfo.uuid)}>{poolChampionshipInfo ? poolChampionshipInfo.name : ''}</Link>
                            </span>

                            <Loading loading={loading} localstorage="-withLocalStorage2" />
                        </h3>

                        {showFixtures()}

                    </ul>

                </div>
            </div>
        </section>
    );
}

export default PagePoolUserBet;
