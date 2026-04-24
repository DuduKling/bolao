import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import '../../css/pages/admin.css';

import http from '../../util/http';
import routes from '../util/Routes';

import Loading from '../util/Loading';

function PageAdmin() {
    const [pools, setPools] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataFetchedRef = useRef(false);

    const LOCAL_STORAGE_ITEM = 'pools';

    useEffect(() => {
        const cachedPools = localStorage.getItem(LOCAL_STORAGE_ITEM);
        if (cachedPools) {
            const data = JSON.parse(cachedPools);
            setPools(data.allPools);
        }

        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        getPools();
    }, []);

    const getPools = async () => {
        setLoading(true);

        await http.getPools()
            .then((response) => {
                setPools(response.allPools);

                setLoading(false);
                localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(response));
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const showCampeonatos = (pool, index) => {
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
                    <Link to={routes.sendToAdminPool(pool.uuid)}>
                        Gerenciar
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
                        pools.map((pool, index) => showCampeonatos(pool, index))
                    }
                </ul>
            </div>
        </div>

    );
}

export default PageAdmin;
