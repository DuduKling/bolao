import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const userId = useSelector((state) => state.auth.userId);

    const params = useParams();

    useEffect(() => {
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
            },
        });
    };

    const enviaAposta = async (evento) => {
        evento.preventDefault();

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
                setResp(response);
                setLoading2(false);
            },
            catchCallback: ({ message }) => {
                setLoading2(false);
                setError(message);
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
                    <input type="submit" className="SendButton" value="Enviar" />
                    <Loading loading={loading2} />
                </div>
            );
        }
    };

    return (
        <section className="main-container">
            <div className="main-content">

                <form
                    className="main-partidaForm"
                    onSubmit={(event) => enviaAposta(event)}
                    method="post"
                >

                    <ul className="partidaLista">
                        <h3 className="pageTitle">
                            Aposte: {campeonato ? campeonato : ''}{fase ? ' - ' + fase : ''}{parte ? '/' + parte : ''}
                        </h3>
                        <Loading loading={loading} />
                        {
                            fixtures.map(function (team, index) {
                                return (

                                    <PartidaListItem
                                        key={index}
                                        team={team}
                                    />

                                );
                            }, this)
                        }

                    </ul>

                    {showButton()}

                </form>

                {AJAXresp()}
            </div>
        </section>
    );
}

export default PageApostar;
