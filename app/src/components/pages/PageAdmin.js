import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../../css/pages/admin.css';

import http from '../../util/http';
import routes from '../util/Routes';

import Loading from '../util/Loading';

function PageAdmin() {
    const [pools, setPools] = useState([]);
    const [campeonatos, setCampeonatos] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    useEffect(() => {
        getPools();
        getCampeonatos();
    }, []);

    const getPools = async () => {
        setLoading(true);

        await http.getPools()
            .then((response) => {
                setPools(response.allPools);

                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const getCampeonatos = async () => {
        setLoading2(true);

        await http.getCampeonatos()
            .then((response) => {
                setCampeonatos(response);

                setLoading2(false);
            })
            .catch(() => {
                setLoading2(false);
            });
    };

    const showPools = (pool, index) => {
        return (
            <li key={index} className="adminPools">
                <div className="adminPools-title">{pool.name}</div>
                <div className="adminPools-details">
                    <div className="phase">{pool.phaseName}</div>
                    <div>{pool.parts}</div>
                    <div><b>Início: </b>{pool.startDate}</div>
                    <div><b>Fim: </b>{pool.endDate}</div>
                    <div><b className="green">Status: </b>{pool.status}</div>
                </div>
                <div className="adminPools-actions">
                    <Link to={routes.sendToAdminPoolParticipation(pool.uuid)}>
                        Participação
                    </Link>
                    <Link to={routes.sendToAdminPool(pool.uuid)}>
                        Gerenciar
                    </Link>
                </div>
            </li>
        );
    };

    const showChampionships = (champ, index) => {
        return (
            <li key={index} className="adminPools">
                <div className="adminPools-title">{champ.name}</div>
                <div className="adminPools-details"></div>
                <div className="adminPools-actions">
                    <Link to={routes.sendToAdminChampionship(champ.id)}>
                        Resultados
                    </Link>
                </div>
            </li>
        );
    };

    return (
        <div className="userPage-container">
            <div className="userPage-userCampeonatos">
                <div>
                    <Link className="SendButton" to={routes.sendToAdminPoolCreate()}>
                        Criar
                    </Link>
                </div>
                <br />
                <h3 className="page-title -admin">
                    Admin: Bolões
                    <Loading loading={loading} localstorage="-withLocalStorage" />
                </h3>
                <ul className="adminPools-container">
                    {
                        pools.map((pool, index) => showPools(pool, index))
                    }
                </ul>
                <br />
                <h3 className="page-title -admin">
                    Admin: Campeonatos
                    <Loading loading={loading2} localstorage="-withLocalStorage" />
                </h3>
                <ul className="adminPools-container">
                    {
                        campeonatos.map((champ, index) => showChampionships(champ, index))
                    }
                </ul>
            </div>
        </div>
    );
}

export default PageAdmin;
