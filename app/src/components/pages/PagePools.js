import React, { useEffect, useRef, useState } from 'react';
import '../../css/pages/pools.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import PoolListItem from '../util/PoolListItem';

function PagePools() {
    const [pools, setPools] = useState([]);
    const [joinedPools, setJoinedPools] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataFetchedRef = useRef(false);

    const LOCAL_STORAGE_ITEM = 'pools';

    useEffect(() => {
        const cachedPools = localStorage.getItem(LOCAL_STORAGE_ITEM);
        if (cachedPools) {
            const data = JSON.parse(cachedPools);
            setPools(data.allPools);
            setJoinedPools(data.joinedPools);
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
                setJoinedPools(response.joinedPools);
                setLoading(false);

                localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(response));
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
