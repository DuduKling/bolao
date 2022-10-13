import React from 'react';
import '../../css/util/partidaListItem.css';
import { Link } from 'react-router-dom';

import PartidaTeam from './PartidaTeam';
import PartidaPlacar from './PartidaPlacar';

import PropTypes from 'prop-types';

function PartidaListItem(props) {
    const params = props.params;

    const checkTypeOfPlacar = () => {
        if (props.typeAll === 'ReadOnly') {
            return (
                <PartidaPlacar
                    team={props.team}
                    typeAll="ReadOnly"
                    typeHome={checkIfHomeNeedsInput()}
                    typeAway={checkIfAwayNeedsInput()}
                />
            );
        } else if (props.isAdmin === 'admin') {
            return (
                <PartidaPlacar
                    team={props.team}
                    typeHome={checkIfHomeNeedsInput()}
                    typeAway={checkIfAwayNeedsInput()}
                    isAdmin={'admin'}
                />
            );
        } else {
            return (
                <PartidaPlacar
                    team={props.team}
                    typeHome={checkIfHomeNeedsInput()}
                    typeAway={checkIfAwayNeedsInput()}
                />
            );
        }
    };

    const checkIfHomeNeedsInput = () => {
        return props.team.home_score ? 'ReadOnly' : '';
    };

    const checkIfAwayNeedsInput = () => {
        return props.team.away_score ? 'ReadOnly' : '';
    };

    const checkIfShowUsernames = () => {
        if (props.showUsers) {
            return (
                <div className="users-container">
                    <label htmlFor={'toggleUsernames' + props.team.frontID}>
                        Mostrar pessoas
                    </label>
                    <input type="checkbox" id={'toggleUsernames' + props.team.frontID} />
                    <div className="users-usernamesList">
                        {
                            props.team.usernames ?
                                props.team.usernames.split(',').map(function (name, index) {
                                    return (
                                        <div key={index}>
                                            <Link to={'/campeonato/' + params.campeonato + '/' + params.fase + '/apostado/' + name}>{name}</Link>
                                        </div>
                                    );
                                })
                                : null
                        }
                    </div>
                </div>
            );
        }
    };

    const checkIfShowPercent = () => {
        if (props.showPercent) {
            return (
                <div className="users-percent">
                    <div className="percent-triangle"></div>
                    <p>{props.team.porcentagem}%</p>
                </div>
            );
        }
    };

    const checkIfShowPoints = () => {
        if (props.team.points !== undefined) {
            if (props.team.points !== null) {
                return (
                    <div className="users-points">
                        Final:
                        {' ' + props.team.final_scoreHome}
                        x
                        {props.team.final_scoreAway + ' '}
                        | Pontos:
                        {' ' + props.team.points}
                    </div>
                );
            }
        }
    };

    const checkIfShowAsLink = () => {
        if (params !== undefined) {
            return (<>
                <Link to={'/campeonato/' + params.campeonato + '/' + params.fase + '/jogo/' + props.team.idfixture}>
                    {insideStuff()}
                </Link>
                {checkIfShowUsernames()}
            </>
            );
        } else {
            return (
                <div>
                    {insideStuff()}
                </div>
            );
        }
    };

    const insideStuff = () => {
        return (
            <div>
                <p className="info">
                    {props.team.datetime} | {props.team.local}
                </p>

                <div className="match-container">

                    <PartidaTeam
                        type="-Home"
                        team={props.team}
                    />

                    {checkTypeOfPlacar()}

                    <PartidaTeam
                        type="-Away"
                        team={props.team}
                    />

                </div>


                {checkIfShowPoints()}

                {checkIfShowPercent()}

            </div>
        );
    };

    return (
        <li className="-apostadoJogo" key={props.index}>

            {checkIfShowAsLink()}

        </li>
    );
}

PartidaListItem.propTypes = {
    typeAll: PropTypes.string,
    team: PropTypes.object,
    isAdmin: PropTypes.string,
    showUsers: PropTypes.bool,
    showPercent: PropTypes.bool,
    params: PropTypes.object,
    index: PropTypes.string,
};

export default PartidaListItem;
