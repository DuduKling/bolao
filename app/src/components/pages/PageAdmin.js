import React, { useEffect, useState } from 'react';
import '../../css/pages/admin.css';

import { Link } from 'react-router-dom';

import http from '../../util/http';

import Loading from '../util/Loading';
import AdminSelect from '../util/AdminSelect';

function PageAdmin() {
    const [campeonatos, setCampeonatos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cachedCampeonatos = localStorage.getItem('campeonatos');
        if (cachedCampeonatos) {
            setCampeonatos(JSON.parse(cachedCampeonatos));
        }

        getCampeonatos();
    }, []);

    const getCampeonatos = async () => {
        setLoading(true);

        const dataString = JSON.stringify({});

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/campeonato/getCampeonatos.php`,
            data: dataString,
            thenCallback: (response) => {
                setCampeonatos(response);
                setLoading(false);

                localStorage.setItem('campeonatos', JSON.stringify(response));
            },
            catchCallback: () => {
                setLoading(false);
            },
        });
    };

    const showCampeonatos = (campeonato, index) => {
        return (
            <li key={index}>
                <div className="adminCampeonatos-campeonato">{campeonato.nomeCampeonato}</div>
                <div className="adminCampeonatos-fase">
                    {
                        campeonato.fases.map(function (fase, index) {
                            return showFases(fase, index);
                        }, this)
                    }
                </div>
            </li>
        );
    };

    const showFases = (fase, index) => {
        return (
            <div key={index}>
                <div>{fase.nomeFase}</div>
                <div className="adminCampeonatos-parte">
                    {
                        fase.partes.map(function (parte, index) {
                            return showPartes(parte, index, fase.id);
                        }, this)
                    }
                </div>
            </div>
        );
    };

    const showPartes = (parte, index, faseID) => {
        return (
            <div key={index}>
                <div>{parte.nomeParte}</div>

                <div className="adminCampeonatos-actions">
                    {checkIfShowLinks(parte, faseID)}
                    <AdminSelect parteID={parte.id} selected={parte.statusParte} />
                    <div className={'statusMark -' + parte.statusParte}></div>
                </div>
            </div>
        );
    };

    const checkIfShowLinks = (parte, faseID) => {
        if (parte.statusParte === 'aberto') {
            return (
                <div className="links">
                    <Link to={'/' + faseID + '/adminapostas'}>
                        Apostas
                    </Link>
                    <Link to={'/' + parte.id + '/adminscore'}>
                        Resultados
                    </Link>
                </div>
            );
        } else if (parte.statusParte === 'aposta') {
            return (
                <div className="links">
                    <Link to={'/' + parte.id + '/adminviewapostas'}>
                        Apostas
                    </Link>
                </div>
            );
        }
    };

    return (
        <div className="userPage-container">
            <div className="userPage-userCampeonatos">
                <h3 className="page-title -admin">
                    Admin
                    <Loading loading={loading} localstorage="-withLocalStorage" />
                </h3>
                <ul className="adminCampeonatos-container">
                    {
                        campeonatos.map(function (campeonato, index) {
                            return showCampeonatos(campeonato, index);
                        }, this)
                    }
                </ul>
            </div>
        </div>

    );
}

export default PageAdmin;
