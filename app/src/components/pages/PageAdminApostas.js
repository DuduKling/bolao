import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../util/Loading';
import http from '../../util/http';

function PageAdminApostas() {
    const [partes, setPartes] = useState('');
    const [listNames, setListNames] = useState('');
    const [loading, setLoading] = useState(false);

    const params = useParams();

    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        getApostas();
    }, []);

    const getApostas = async () => {
        setLoading(true);

        const faseID = params.fase;

        const dataString = JSON.stringify({
            faseID,
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/admin/getApostasRealizadas.php`,
            data: dataString,
            thenCallback: (response) => {
                setPartes(response.partes);
                setListNames(response.listNames);
                setLoading(false);
            },
            catchCallback: () => {
                setLoading(false);
            },
        });
    };

    const showHeader = () => {
        if (partes) {
            return partes.split(',').map(function (parte, index) {
                return <td key={index} className="markColumn">{parte}</td>;
            });
        }
    };

    const showList = () => {
        if (listNames) {
            return listNames.map(function (user, index) {
                return (
                    <tr key={index}>
                        <td className="nameColumn">{user.name}</td>

                        {
                            partes.split(',').map(function (parte, index) {
                                if (user.partesApostadas.includes(parte)) {
                                    return <td key={index} className="markColumn">
                                        <div className="statusMark"></div>
                                    </td>;
                                } else {
                                    return <td key={index} className="markColumn"></td>;
                                }
                            }, this)
                        }

                    </tr>
                );
            }, this);
        }
    };

    return (
        <div className="userPage-container">
            <div className="userPage-userCampeonatos">

                <div className="main-partidaForm">
                    <table className="adminTable">
                        <caption>
                            <h3 className="page-title -admin">
                                Apostas realizadas
                                <Loading loading={loading} localstorage="-withLocalStorage3" />
                            </h3>
                        </caption>
                        <thead>
                            <tr>
                                <td className="nameColumn">Nome</td>

                                {showHeader()}

                            </tr>
                        </thead>
                        <tbody>
                            {showList()}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default PageAdminApostas;
