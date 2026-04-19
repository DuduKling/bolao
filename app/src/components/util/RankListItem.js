import React from 'react';
import '../../css/util/rankListItem.css';

import { Link } from 'react-router-dom';

import routes from '../util/Routes';

import PropTypes from 'prop-types';

function RankListItem(props) {
    const params = props.params;

    const podiumMap = {
        1: '-gold',
        // 2: '-silver',
        // 3: '-bronze',
    };

    return (
        <tr className={podiumMap[props.position] || ''} key={props.index}>
            <td className="positionColumn">
                <Link to={routes.sendToPoolUserBets(params.poolUuid, props.rank.uuid)}>
                    {props.positionIgual ? '' : props.position}
                </Link>
            </td>
            <td className="nameColumn">
                <Link to={routes.sendToPoolUserBets(params.poolUuid, props.rank.uuid)}>
                    {props.rank.name}
                </Link>
            </td>
            <td className="pointsColumn">
                <Link to={routes.sendToPoolUserBets(params.poolUuid, props.rank.uuid)}>
                    {props.rank.points}
                </Link>
            </td>
        </tr>
    );
}

RankListItem.propTypes = {
    position: PropTypes.number,
    params: PropTypes.object,
    index: PropTypes.string,
    rank: PropTypes.object,
    positionIgual: PropTypes.string,
};

export default RankListItem;
