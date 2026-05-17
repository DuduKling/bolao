import React, { useEffect, useRef, useState } from 'react';
import '../../css/pages/pools.css';

import http from '../../util/http';
import parser from '../util/Parser';

import Loading from '../util/Loading';
import PoolListItem from '../util/PoolListItem';

function PagePools() {
    const [groupedPools, setGroupedPools] = useState({});

    const [loading, setLoading] = useState(false);

    const dataFetchedRef = useRef(false);

    const LOCAL_STORAGE_ITEM = 'pools';

    useEffect(() => {
        const cachedPools = localStorage.getItem(LOCAL_STORAGE_ITEM);
        if (cachedPools) {
            const data = parser.json(cachedPools);
            if (data) {
                const grPools = groupPools(data.allPools, data.joinedPools);
                setGroupedPools(grPools);
            }
        }

        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        getPools();
    }, []);

    const getPools = async () => {
        setLoading(true);

        await http.getPools()
            .then((response) => {
                const grPools = groupPools(response.allPools, response.joinedPools);
                setGroupedPools(grPools);

                setLoading(false);

                if (response) {
                    localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(response));
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const groupPools = (allPools, joinedPools) => {
        const groups = {
            joined: { name: 'Participando', pools: [] },
            tba: { name: 'Fechado', pools: [] },
            open: { name: 'Aberto', pools: [] },
            onGoing: { name: 'Em andamento', pools: [] },
            finished: { name: 'Finalizado', pools: [] },
        };
        for (const pool of allPools) {
            if (joinedPools.includes(pool.uuid)) {
                groups.joined.pools.push(pool);
                continue;
            }
            groups[pool.status].pools.push(pool);
        }
        return groups;
    };

    const showPoolGroups = ([groupType, { name, pools }]) => {
        if (pools.length === 0) { return ''; }

        return (<>
            <h3 className="page-block-title">
                {name}
                <Loading loading={loading} localstorage="-withLocalStorage" />
            </h3>
            <div className="pools-container">
                <ul className="pools-list">
                    {
                        pools.map(function (pool) {
                            return (
                                <PoolListItem
                                    key={pool.uuid}
                                    pool={pool}
                                    groupType={groupType}
                                />
                            );
                        })
                    }
                </ul>
            </div>
            <br />
        </>);
    };

    return (
        <div className="page-container">
            <div className="page-block">
                <h2 className="title">Bolões</h2>
                {
                    groupedPools ? Object.entries(groupedPools).map((gPool) => showPoolGroups(gPool)) : ''
                }
            </div>
        </div>
    );
}

export default PagePools;
