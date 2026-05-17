import React, { useEffect, useRef, useState } from 'react';
import '../../css/pages/campeonato.css';

import http from '../../util/http';
import parser from '../util/Parser';

import CampeonatoCard from '../util/CampeonatoCard';
import Loading from '../util/Loading';

function PageChampionships() {
    const [campeonatos, setCampeonatos] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataFetchedRef = useRef(false);

    const LOCAL_STORAGE_ITEM = 'championships';

    useEffect(() => {
        const cachedCampeonatos = localStorage.getItem(LOCAL_STORAGE_ITEM);
        if (cachedCampeonatos) {
            const data = parser.json(cachedCampeonatos);
            if (data) {
                setCampeonatos(data);
            }
        }

        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        getCampeonatos();
    }, []);

    const getCampeonatos = async () => {
        setLoading(true);

        await http.getCampeonatos()
            .then((response) => {
                setCampeonatos(response);
                setLoading(false);

                if (response) {
                    localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(response));
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div className="userPage-container">

            <div className="userPage-userCampeonatos">
                <h3 className="page-title">
                    Campeonatos
                    <Loading loading={loading} localstorage="-withLocalStorage" />
                </h3>
                <div className="userCampeonatos-container">
                    {
                        campeonatos.map(function (campeonato) {
                            return (
                                <CampeonatoCard
                                    key={campeonato.id}
                                    campeonato={campeonato}
                                />
                            );
                        }, this)
                    }
                </div>
            </div>

        </div>
    );
}

export default PageChampionships;
