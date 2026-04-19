import React from 'react';
import '../../css/util/rankListItem.css';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

function RankListItem(props) {
    const params = props.params;

    const podiumMap = {
        1: '-gold',
        // 2: '-silver',
        // 3: '-bronze',
    };

    const link = `/pools/${params.poolUuid}/user/${props.rank.uuid}`;

    return (
        <tr className={podiumMap[props.position] || ''} key={props.index}>
            <td className="positionColumn">
                <Link to={link}>
                    {props.positionIgual ? '' : props.position}
                </Link>
            </td>
            <td className="nameColumn">
                <Link to={link}>
                    {props.rank.name}
                </Link>
            </td>
            <td className="pointsColumn">
                <Link to={link}>
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
