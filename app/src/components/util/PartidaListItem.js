import React from 'react';
import '../../css/util/partidaListItem.css';
import { Link } from 'react-router-dom';

import routes from '../util/Routes';

import PartidaTeam from './PartidaTeam';
import PartidaPlacar from './PartidaPlacar';

import PropTypes from 'prop-types';

function PartidaListItem(props) {
    const params = props.params;

    const checkTypeOfPlacar = () => {
        return (
            <PartidaPlacar
                fixture={props.fixture}
                readOnly={props.readOnly}
                readOnlyHomeScore={typeof props.fixture.homeTeamScore === 'number'}
                readOnlyAwayScore={typeof props.fixture.awayTeamScore === 'number'}
                setBets={props.setBets ? props.setBets : () => { }}
                isAdmin={props.isAdmin}
            />
        );
    };

    const checkIfShowUsernames = () => {
        if (props.showUsers) {
            const { frontId, users } = props.fixture;

            return (
                <div className="users-container">
                    <label htmlFor={'toggleUsernames' + frontId}>
                        Apostadores ({users.length})
                    </label>
                    <input type="checkbox" id={'toggleUsernames' + frontId} />
                    <div className="users-usernamesList">
                        {
                            users &&
                                users.length > 0 ?
                                users.map((user, index) => {
                                    const [name, uuid] = user.split('#');
                                    return (
                                        <div key={index}>
                                            <Link to={routes.sendToPoolUserBets(params.poolUuid, uuid)}>{name}</Link>
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

    const checkIfShowBets = () => {
        const { homeTeamScoreBet, awayTeamScoreBet } = props.fixture;
        if (homeTeamScoreBet !== undefined || awayTeamScoreBet !== undefined) {
            return (
                <div className="users-points">
                    {`Minha aposta: ${homeTeamScoreBet} x ${awayTeamScoreBet}`}
                </div>
            );
        }
    };

    const checkIfShowAsLink = () => {
        if (params !== undefined) {
            return (<>
                <Link to={routes.sendToPoolFixture(params.poolUuid, props.fixture.id)}>
                    {insideStuff()}
                </Link>
                {checkIfShowUsernames()}
            </>
            );
        }

        return (
            <div>
                {insideStuff()}
            </div>
        );
    };

    const insideStuff = () => {
        return (
            <div>
                <p className="info">
                    {new Date(props.fixture.dateTime).toLocaleString()} | {props.fixture.location}
                </p>

                <div className="match-container">

                    <PartidaTeam
                        extraClass="-Home"
                        teamName={props.fixture.homeTeamName}
                        imagePath={props.fixture.homeTeamImagePath}
                    />

                    {checkTypeOfPlacar()}

                    <PartidaTeam
                        extraClass="-Away"
                        teamName={props.fixture.awayTeamName}
                        imagePath={props.fixture.awayTeamImagePath}
                    />

                </div>

                {checkIfShowPoints()}

                {checkIfShowPercent()}

                {checkIfShowBets()}

            </div>
        );
    };

    return (
        <li className="partidaListItem -apostadoJogo" key={props.index}>

            {checkIfShowAsLink()}

        </li>
    );
}

PartidaListItem.propTypes = {
    readOnly: PropTypes.bool,
    fixture: PropTypes.object,
    showUsers: PropTypes.bool,
    showPercent: PropTypes.bool,
    params: PropTypes.object,
    index: PropTypes.string,
    setBets: PropTypes.func,
    isAdmin: PropTypes.bool,
};

export default PartidaListItem;
