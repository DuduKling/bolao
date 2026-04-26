import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../util/Loading';
import http from '../../util/http';

function PageAdminPoolUserParticipation() {
    const [pool, setPool] = useState({});
    const [parts, setParts] = useState('');
    const [participation, setParticipation] = useState('');

    const [loading, setLoading] = useState(false);

    const params = useParams();
    const poolUuid = params.poolUuid;

    useEffect(() => {
        getApostas();
    }, []);

    const getApostas = async () => {
        setLoading(true);

        const data = {
            poolUuid,
        };

        await http.getApostasRealizadas(data)
            .then((response) => {
                setPool(response.poolInfo);
                setParts(response.poolParts);
                setParticipation(response.usersPoolParticipation);

                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const showHeader = () => {
        if (parts) {
            return parts.map((parte, index) => {
                return <td key={index} className="markColumn">{parte.name}</td>;
            });
        }
    };

    const showList = () => {
        if (participation) {
            const participationByUser = participation.reduce((acc, p) => {
                if (!acc[p.name]) { acc[p.name] = []; }
                acc[p.name].push(p);
                return acc;
            }, {});

            console.log(participationByUser);

            return Object.entries(participationByUser).map(([user, p], index) => {
                return (
                    <tr key={index}>
                        <td className="nameColumn">{user}</td>
                        {
                            p.map((parte, index) => {
                                const complete = parte.countBets === parte.countFixtures;
                                return <td key={index} className="markColumn">
                                    <div className={`statusMark ${complete ? '-complete' : '-incomplete'}`}>
                                        {`${parte.countBets} / ${parte.countFixtures}`}
                                    </div>
                                </td>;
                            })
                        }
                    </tr>
                );
            });
        }
    };

    return (
        <div className="userPage-container">
            <div className="userPage-userCampeonatos">

                <div className="main-partidaForm">
                    <table className="adminTable">
                        <caption>
                            <h3 className="page-title -admin">
                                Admin: Participação {pool.name}
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

export default PageAdminPoolUserParticipation;
