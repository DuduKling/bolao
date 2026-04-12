import React, { useEffect, useRef, useState } from 'react';
import '../../css/pages/pools.css';

import { useSelector } from 'react-redux';

import http from '../../util/http';

import Loading from '../util/Loading';
import PoolListItem from '../util/PoolListItem';

function PagePools() {
    const [pools, setPools] = useState([]);
    const [joinedPools, setJoinedPools] = useState([]);
    const [loading, setLoading] = useState(false);

    const uuid = useSelector((state) => state.auth.userUuid);

    const dataFetchedRef = useRef(false);

    useEffect(() => {
        const cachedPools = localStorage.getItem('pools');
        if (cachedPools) {
            setPools(JSON.parse(cachedPools));
        }

        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        getPools();
    }, []);

    const getPools = async () => {
        setLoading(true);

        const dataString = JSON.stringify({
            uuid,
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/campeonato/getPools.php`,
            data: dataString,
            withCredentials: true,
        })
            .then((response) => {
                setPools(response.allPools);
                setJoinedPools(response.joinedPools);
                setLoading(false);

                localStorage.setItem('campeonatos', JSON.stringify(response));
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div className="page-container">

            <div className="page-block">
                <h3 className="page-block-title">
                    Bolões
                    <Loading loading={loading} localstorage="-withLocalStorage" />
                </h3>

                <div className="pools-container">
                    <ul className="pools-list">
                        {
                            pools.map(function (pool) {
                                return (
                                    <PoolListItem key={pool.uuid} pool={pool} joinedPools={joinedPools} />
                                );
                            }, this)
                        }
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default PagePools;
