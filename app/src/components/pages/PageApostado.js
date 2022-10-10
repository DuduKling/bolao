import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../../css/pages/pageInside.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

import Avatar from '../../imgs/avatar.png';

function PageApostar() {
    const [fixtures, setFixtures] = useState([]);
    const [userImage, setUserImage] = useState('');
    const [campeonato, setCampeonato] = useState('');
    const [fase, setFase] = useState('');

    const [loading, setLoading] = useState(false);

    const params = useParams();

    useEffect(() => {
        const userName = params.nome;
        const faseID = params.fase;

        const cachedFixtures = localStorage.getItem(userName + faseID + 'fixtures');
        if (cachedFixtures) {
            setFixtures(JSON.parse(cachedFixtures));
        }

        getBets();
    }, []);

    const getBets = async () => {
        setLoading(true);

        const faseID = params.fase;
        const userName = params.nome;

        const dataString = JSON.stringify({
            faseID,
            userName,
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/bets/getBetsFromUser.php`,
            data: dataString,
            thenCallback: (response) => {
                setLoading(false);

                setFixtures(response.fixtures);
                setUserImage(response.userImage);
                setCampeonato(response.campeonato);
                setFase(response.fase);

                localStorage.setItem(userName + faseID + 'fixtures', JSON.stringify(response.fixtures));
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

                    <div className="userImage-container">
                        <div className="userImage">
                            <img src={userImage ?
                                userImage
                                : Avatar}
                            alt="Avatar do usuário" />
                        </div>
                    </div>

                    <ul className="partidaLista -apostado">
                        <h3 className="pageTitle">
                            {params.nome}

                            <br />
                            <span className="subTitle">
                                {campeonato ? campeonato : ''}

                                {fase ? ' - ' + fase : ''}
                            </span>

                            <Loading loading={loading} localstorage="-withLocalStorage2" />
                        </h3>
                        {
                            fixtures.map(function (team, index) {
                                return (

                                    <PartidaListItem
                                        key={index}
                                        team={team}
                                        typeAll={'ReadOnly'}
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

export default PageApostar;
