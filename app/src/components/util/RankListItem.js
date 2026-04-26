import React from 'react';
import '../../css/util/rankListItem.css';

import { Link } from 'react-router-dom';

import routes from '../util/Routes';

import PropTypes from 'prop-types';

function RankListItem(props) {
    const podiumMap = {
        1: '-gold',
        // 2: '-silver',
        // 3: '-bronze',
    };

    const showPodiumColors = () => {
        if (!props.rank.points) { return ''; }
        return podiumMap[props.position] || '';
    };

    const send = () => {
        return routes.sendToPoolUserBets(props.poolUuid, props.rank.uuid);
    };

    return (
        <tr className={showPodiumColors()} key={props.index}>
            <td className="positionColumn">
                <Link to={send()}>{props.positionIgual ? '' : props.position}</Link>
            </td>
            <td className="nameColumn">
                <Link to={send()}>{props.rank.name}</Link>
            </td>
            <td className="pointsColumn">
                <Link to={send()}>{props.rank.points}</Link>
            </td>
        </tr>
    );
}

RankListItem.propTypes = {
    position: PropTypes.number,
    poolUuid: PropTypes.string,
    index: PropTypes.string,
    rank: PropTypes.object,
    positionIgual: PropTypes.string,
};

export default RankListItem;
