import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import $ from 'jquery';

import '../../css/pages/pageInside.css';
import '../../css/util/formMessage.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

function PageApostar() {
    const [fixtures, setFixtures] = useState([]);
    const [error, setError] = useState('');
    const [resp, setResp] = useState('');
    const [campeonato, setCampeonato] = useState('');
    const [fase, setFase] = useState('');
    const [parte, setParte] = useState('');
    const [isBet, setIsBet] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const userId = useSelector((state) => state.auth.userId);
    const userName = useSelector((state) => state.auth.userName);

    const params = useParams();

    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        getFixtures();
    }, []);

    const getFixtures = async () => {
        setLoading(true);

        const parteId = params.parte;

        const dataString = JSON.stringify({
            parteId,
            userId,
            status: 'aberto',
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/fixture/getFixtures.php`,
            data: dataString,
            thenCallback: (response) => {
                setFixtures(response.fixtures);
                setCampeonato(response.campeonato);
                setFase(response.fase);
                setParte(response.parte);

                setLoading(false);
            },
            catchCallback: ({ message }) => {
                setLoading(false);
                setError(message);

                if (message.includes('#FGF1')) {
                    setIsBet(true);
                }
            },
        });
    };

    const sendBets = async (event) => {
        event.preventDefault();

        setError('');
        setResp('');
        setLoading2(true);

        const data = {
            userId,
        };

        $('input[type=\'text\']').each(function (index, item) {
            const val = $(item).val();
            const name = $(item).attr('name');

            data[name] = val;
        });

        const dataString = JSON.stringify(data);

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/bets/makeBets.php`,
            data: dataString,
            thenCallback: (response) => {
                setResp(response.message);
                setLoading2(false);
            },
            catchCallback: ({ message }) => {
                setError(message);
                setLoading2(false);
            },
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
        const {campeonato, fase } = params;

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
        if (Object.keys(fixtures).length !== 0 && !resp) {
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

    const showFixtures = () => {
        if (!resp) {
            return fixtures.map(function (team, index) {
                return (

                    <PartidaListItem
                        key={index}
                        team={team}
                    />

                );
            }, this);
        }
    };

    return (
        <section className="main-container">
            <div className="main-content">

                <form
                    className="main-partidaForm"
                    onSubmit={(event) => sendBets(event)}
                    method="post"
                >

                    <ul className="partidaLista">
                        <h3 className="pageTitle">
                            Aposte: {campeonato ? campeonato : ''}{fase ? ' - ' + fase : ''}{parte ? '/' + parte : ''}
                        </h3>
                        <Loading loading={loading} />
                        {showFixtures()}

                    </ul>

                    {showButton()}

                </form>

                {AJAXresp()}
            </div>
        </section>
    );
}

export default PageApostar;
