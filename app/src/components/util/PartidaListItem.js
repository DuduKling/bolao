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
                    fixture={props.fixture}
                    typeAll="ReadOnly"
                    typeHome={checkIfHomeNeedsInput()}
                    typeAway={checkIfAwayNeedsInput()}
                />
            );
        } else if (props.isAdmin === 'admin') {
            return (
                <PartidaPlacar
                    fixture={props.fixture}
                    typeHome={checkIfHomeNeedsInput()}
                    typeAway={checkIfAwayNeedsInput()}
                    isAdmin={'admin'}
                />
            );
        } else {
            return (
                <PartidaPlacar
                    fixture={props.fixture}
                    typeHome={checkIfHomeNeedsInput()}
                    typeAway={checkIfAwayNeedsInput()}
                />
            );
        }
    };

    const checkIfHomeNeedsInput = () => {
        return props.fixture.homeTeamScore ? 'ReadOnly' : '';
    };

    const checkIfAwayNeedsInput = () => {
        return props.fixture.awayTeamScore ? 'ReadOnly' : '';
    };

    const checkIfShowUsernames = () => {
        if (props.showUsers) {
            return (
                <div className="users-container">
                    <label htmlFor={'toggleUsernames' + props.fixture.frontID}>
                        Mostrar pessoas
                    </label>
                    <input type="checkbox" id={'toggleUsernames' + props.fixture.frontID} />
                    <div className="users-usernamesList">
                        {
                            props.fixture.usernames ?
                                props.fixture.usernames.split(',').map(function (name, index) {
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
                    <p>{props.fixture.porcentagem}%</p>
                </div>
            );
        }
    };

    const checkIfShowPoints = () => {
        if (props.fixture.points !== undefined) {
            if (props.fixture.points !== null) {
                return (
                    <div className="users-points">
                        Final:
                        {' ' + props.fixture.final_scoreHome}
                        x
                        {props.fixture.final_scoreAway + ' '}
                        | Pontos:
                        {' ' + props.fixture.points}
                    </div>
                );
            }
        }
    };

    const checkIfShowAsLink = () => {
        if (params !== undefined) {
            return (<>
                <Link to={'/campeonato/' + params.campeonato + '/' + params.fase + '/jogo/' + props.fixture.idfixture}>
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
                    {new Date(props.fixture.dateTime).toLocaleString()} | {props.fixture.location}
                </p>

                <div className="match-container">

                    <PartidaTeam
                        type="-Home"
                        fixture={props.fixture}
                    />

                    {checkTypeOfPlacar()}

                    <PartidaTeam
                        type="-Away"
                        fixture={props.fixture}
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
    fixture: PropTypes.object,
    isAdmin: PropTypes.string,
    showUsers: PropTypes.bool,
    showPercent: PropTypes.bool,
    params: PropTypes.object,
    index: PropTypes.string,
};

export default PartidaListItem;
