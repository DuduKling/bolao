import React from 'react';
import '../../css/util/partidaListItem.css';
import { Link } from 'react-router-dom';

import PartidaTeam from './PartidaTeam';
import PartidaPlacar from './PartidaPlacar';

import PropTypes from 'prop-types';

function PartidaListItem(props) {

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
        if (props.team.home_score) {
            return 'ReadOnly';
        } else {
            return '';
        }
    };

    const checkIfAwayNeedsInput = () => {
        if (props.team.away_score) {
            return 'ReadOnly';
        } else {
            return '';
        }
    };

    const checkIfShowUsernames = () => {
        if (props.users) {
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
                                            <Link to={'../apostado/' + name}>{name}</Link>
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

    const checkIfShowPorcent = () => {
        if (props.porcent) {
            return (
                <div className="users-porcent">
                    <div className="porcent-triangle"></div>
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
        if (props.link !== undefined) {
            return (
                <Link to={'../../' + props.link.fase + '/jogo/' + props.team.idfixture}>
                    {insideStuff()}
                </Link>
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

                {checkIfShowUsernames()}

                {checkIfShowPoints()}

                {checkIfShowPorcent()}

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
    team: PropTypes.string,
    isAdmin: PropTypes.string,
    users: PropTypes.string,
    porcent: PropTypes.string,
    link: PropTypes.object,
    index: PropTypes.string,
};

export default PartidaListItem;
