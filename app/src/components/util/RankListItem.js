import React from 'react';
import '../../css/util/rankListItem.css';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

function RankListItem(props) {
    return (
        <tr className={
            props.position === 1 ? '-gold'
                // :props.position===2?"-silver"
                // :props.position===3?"-bronze"
                : ''
        } key={props.index}>
            <td className="positionColumn">
                <Link to={'/' + props.link.fase + '/apostado/' + props.rank.name}>
                    {props.positionIgual ? '' : props.position}
                </Link>
            </td>
            <td className="nameColumn">
                <Link to={'/' + props.link.fase + '/apostado/' + props.rank.name}>
                    {props.rank.name}
                </Link>
            </td>
            <td className="pointsColumn">
                <Link to={'/' + props.link.fase + '/apostado/' + props.rank.name}>
                    {props.rank.points}
                </Link>
            </td>
        </tr>
    );
}

RankListItem.propTypes = {
    position: PropTypes.number,
    link: PropTypes.object,
    index: PropTypes.string,
    rank: PropTypes.object,
    positionIgual: PropTypes.string,
};

export default RankListItem;
