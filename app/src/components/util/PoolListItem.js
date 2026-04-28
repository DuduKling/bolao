import React from 'react';
import '../../css/pages/campeonato.css';

import { Link } from 'react-router-dom';

import routes from '../util/Routes';

import PropTypes from 'prop-types';

function PoolListItem(props) {
    const setImage = () => {
        const logo = props.pool.championshipLogo;

        if (!logo) {
            return '/imagens/campeonatos/default.png';
        }

        return '/imagens/campeonatos/' + logo;
    };

    const setChip = () => {
        const status = props.pool.status;
        const joined = props.groupType === 'joined';

        if (joined && status === 'finished') {
            return (<div className="chip">Finalizado</div>);
        }

        if (status === 'tba') {
            return (<div className="chip warning">Inicia em {props.pool.startDate}</div>);
        }
    };

    const showItem = () => {
        return (
            <div className="pool-item-list">
                <div className="list-main">
                    <div className="list-reference-logo">
                        <img
                            src={setImage()}
                            alt={'Logo do campeonato ' + props.pool.championshipName}
                        />
                    </div>
                    <div className="list-title">
                        <h2>{props.pool.name}</h2>
                        <h4>{props.pool.description}</h4>
                    </div>
                </div>
                <div className="list-action">
                    {setChip()}
                </div>
            </div>
        );
    };

    const showAsLink = () => {
        const status = props.pool.status;
        const joined = props.groupType === 'joined';

        const toDash = routes.sendToPoolDashboard(props.pool.uuid);
        const toPoolBet = routes.sendToPoolBet(props.pool.uuid);

        if (joined) {
            if (status === 'finished') {
                return (<Link to={toDash}>{showItem()}</Link>);
            }

            return (<Link to={toDash}>{showItem()}</Link>);
        }

        if (status === 'open') {
            return (<Link to={toPoolBet}>{showItem()}</Link>);
        }

        if (status === 'onGoing') {
            return (<Link to={toDash}>{showItem()}</Link>);
        }

        if (status === 'finished') {
            return (<Link to={toDash}>{showItem()}</Link>);
        }

        return (<>{showItem()}</>);
    };

    return (
        <li>
            <div className="list-content">
                {showAsLink()}
            </div>
        </li>
    );
}

PoolListItem.propTypes = {
    pool: PropTypes.object,
    groupType: PropTypes.string,
};

export default PoolListItem;
