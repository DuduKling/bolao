import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';

import '../../css/pages/pageInside.css';
import '../../css/util/formMessage.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

function PageAdminScore() {
    const [fixtures, setFixtures] = useState([]);
    const [error, setError] = useState('');
    const [resp, setResp] = useState('');
    const [campeonato, setCampeonato] = useState('');
    const [fase, setFase] = useState('');
    const [parte, setParte] = useState('');

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const params = useParams();
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        getFixtures();
    }, []);

    const enviaResultado = async (evento) => {
        evento.preventDefault();

        setError('');
        setResp('');
        setLoading2(true);

        const data = [];
        $('input[type=\'text\']').each(function (index, item) {
            const val = $(item).val();
            const name = $(item).attr('name');

            const [fixture, type] = name.split('_');

            const resultIndex = data.findIndex((el) => el && el.fixture === fixture);

            if (resultIndex === -1) {
                data.push({
                    fixture,
                    [type]: val,
                });
            } else {
                data[resultIndex] = {
                    ...data[resultIndex],
                    [type]: val,
                };
            }
        });

        const dataFilter = data.filter((el) => el.home && el.away);
        if (dataFilter.length === 0) {
            setError('Preencha ao menos um jogo completo.');
            setLoading2(false);
            return;
        }

        const dataString = JSON.stringify(dataFilter);

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/admin/postResult.php`,
            data: dataString,
            thenCallback: (response) => {
                setResp(response.message);
                setLoading2(false);

                getFixtures();
            },
            catchCallback: ({ message }) => {
                setError(message);
                setLoading2(false);
            },
        });
    };

    const getFixtures = async () => {
        setLoading(true);

        const parteId = params.parte;

        const dataString = JSON.stringify({
            parteId: parteId,
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
                setError(message);
                setLoading(false);
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
                    onSubmit={(event) => enviaResultado(event)}
                    method="post"
                >

                    <ul className="partidaLista -admin">
                        <h3 className="pageTitle">
                            administrador
                            <br />
                            <span className="subTitle">
                                {campeonato ? campeonato + ' - ' : ''}
                                {fase}
                                {parte ? ' / ' + parte : ''}
                            </span>
                        </h3>
                        <Loading loading={loading} />
                        {
                            fixtures.map(function (team, index) {
                                return (

                                    <PartidaListItem
                                        key={index}
                                        team={team}
                                        typeAll={''}
                                        isAdmin={'admin'}
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

export default PageAdminScore;
