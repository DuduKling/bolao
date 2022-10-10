import React, { useEffect, useRef, useState } from 'react';
import '../../css/pages/campeonato.css';

import http from '../../util/http';

import CampeonatoCard from '../util/CampeonatoCard';
import Loading from '../util/Loading';

/* Status:
    finalizado - Vai para dashboard (sem aposta lá).
    aberto - Vai para dashboard (com aposta lá).
    aposta - Vai para tela de Apostas.
    tba - Sem link (Mostra data de início).
*/

function PageCampeonatos() {
    const [campeonatos, setCampeonatos] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataFetchedRef = useRef(false);

    useEffect(() => {
        const cachedCampeonatos = localStorage.getItem('campeonatos');
        if (cachedCampeonatos) {
            setCampeonatos(JSON.parse(cachedCampeonatos));
        }

        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

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

    //TODO Fazer uma área "meus campeonatos" para os campeonatos que a pessoa já está participando..
    return (
        <div className="userPage-container">

            <div className="userPage-userCampeonatos">
                <h3 className="page-title">
                    Campeonatos
                    <Loading loading={loading} localstorage="-withLocalStorage" />
                </h3>
                <div className="userCampeonatos-container">
                    {
                        campeonatos.map(function (campeonato, index) {
                            return (
                                <CampeonatoCard
                                    key={index}
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

export default PageCampeonatos;
