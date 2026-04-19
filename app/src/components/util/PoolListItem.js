import React, { useState } from 'react';
import '../../css/pages/campeonato.css';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

function PoolListItem(props) {
    const [flagDetail, setFlagDetail] = useState('');

    const userUuid = useSelector((state) => state.auth.userUuid);

    const toggleDetails = () => {
        setFlagDetail(!flagDetail);
    };

    const setImage = () => {
        const logo = props.pool.championshipLogo;

        if (!logo) {
            return '/imagens/campeonatos/default.png';
        }

        return '/imagens/campeonatos/' + logo;
    };

    const setAction = () => {
        const status = props.pool.status;
        const joined = props.joinedPools.includes(props.pool.uuid);

        if (status === 'tba') {
            return (
                <div className="chip warning"><span>{props.pool.startDate}</span></div>
            );
        }

        if (status === 'open') {
            if (joined) {
                return (
                    <div className="chip blue">
                        <Link to={'/pools/' + props.pool.uuid + '/' + userUuid}>Participando</Link>
                    </div>
                );
            }
            return (
                <div className="chip green">
                    <Link to={'/pools/' + props.pool.uuid}>Participar!</Link>
                </div>
            );
        }

        if (status === 'onGoing') {
            return (
                <div className="chip"><span>botao VER</span></div>
            );
        }

        if (status === 'finished') {
            if (joined) {
                return (
                    <div className="chip"><span>Participou</span></div>
                );
            }
            return (
                <div className="chip"><span>Finalizado</span></div>
            );
        }
    };

    return (
        <li onClick={toggleDetails}>
            <div className="list-content">
                <div className="list-main">
                    <div className="list-title">
                        <h2>{props.pool.name}</h2>
                        <h4>{props.pool.description}</h4>
                    </div>
                    <div className="list-action">
                        {setAction()}
                    </div>
                </div>
                <div className={flagDetail ? 'list-detail showDetail' : 'list-detail'}>
                    <div className="list-reference">
                        <div className="list-reference-logo">
                            <img
                                src={setImage()}
                                alt={'Logo do campeonato ' + props.pool.championshipName}
                            />
                        </div>
                        <div className="list-reference-data">
                            <h4>{props.pool.championshipName}</h4>
                            <p>{props.pool.phaseName}</p>
                            <p>{props.pool.parts}</p>
                        </div>
                    </div>
                    <div className="list-dates">
                        <p><b>Início: </b>{props.pool.startDate}</p>
                        <p><b>Fim: </b>{props.pool.endDate}</p>
                    </div>
                </div>
            </div>
        </li>
    );
}

PoolListItem.propTypes = {
    pool: PropTypes.object,
    joinedPools: PropTypes.array,
};

export default PoolListItem;
