import React from 'react';
import '../../css/util/partidaListItem.css';
import { Link } from 'react-router-dom';

import routes from '../util/Routes';

import PartidaTeam from './PartidaTeam';
import PartidaPlacar from './PartidaPlacar';

import PropTypes from 'prop-types';

function PartidaListItem(props) {
    const shows = props.shows || [];

    const show = {
        asLink: 'showAsLink',
        percent: 'showPercent',
        resultAndPoints: 'showResultAndPoints',
        betAndPoints: 'showBetAndPoints',
        users: 'showUsers',
    };

    const checkIfShowUsers = () => {
        if (shows.includes(show.users)) {
            const { frontId, users } = props.fixture;

            return (
                <div className="users-container">
                    <label htmlFor={'toggleUsernames' + frontId}>
                        {`${users.length} apostador${users.length > 1 ? 'es' : ''}`}
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
                                            <Link to={routes.sendToPoolUserBets(props.poolUuid, uuid)}>{name}</Link>
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
        if (shows.includes(show.percent)) {
            return (
                <div className="users-percent">
                    <div className="percent-triangle"></div>
                    <p>{props.fixture.porcentagem}%</p>
                </div>
            );
        }
    };

    const checkIfShowResultAndPoints = () => {
        if (shows.includes(show.resultAndPoints)) {
            const { homeTeamScoreBet, awayTeamScoreBet, points } = props.fixture;

            const pointsText = (points !== undefined && points !== null) ? `| Pontos: ${points}` : '';

            return (
                <div className="users-points">
                    {`Resultado: ${homeTeamScoreBet}x${awayTeamScoreBet} ${pointsText}`}
                </div>
            );
        }
    };

    const checkIfShowBetAndPoints = () => {
        if (shows.includes(show.betAndPoints)) {
            const { homeTeamScoreBet, awayTeamScoreBet, points } = props.fixture;

            const pointsText = (points !== undefined && points !== null) ? `| Pontos: ${points}` : '';
            const betText = (homeTeamScoreBet === undefined) ? '' : `Minha aposta: ${homeTeamScoreBet}x${awayTeamScoreBet}`;

            return (
                <div className="users-points">
                    {`${betText}${pointsText}`}
                </div>
            );
        }
    };

    const checkIfShowAsLink = () => {
        if (shows.includes(show.asLink)) {
            return (
                <Link to={routes.sendToPoolFixture(props.poolUuid, props.fixture.id)}>
                    {insideStuff()}
                </Link>
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

                    <PartidaPlacar
                        fixture={props.fixture}
                        viewType={props.viewType}
                        setScoreController={props.setScoreController ? props.setScoreController : () => { }}
                        isAdmin={props.isAdmin}
                    />

                    <PartidaTeam
                        extraClass="-Away"
                        teamName={props.fixture.awayTeamName}
                        imagePath={props.fixture.awayTeamImagePath}
                    />

                </div>

                {checkIfShowResultAndPoints()}
                {checkIfShowPercent()}
                {checkIfShowBetAndPoints()}

            </div>
        );
    };

    return (
        <li className="partidaListItem -apostadoJogo" key={props.index}>

            {checkIfShowAsLink()}
            {checkIfShowUsers()}

        </li>
    );
}

PartidaListItem.propTypes = {
    viewType: PropTypes.string,
    fixture: PropTypes.object,
    setScoreController: PropTypes.func,
    isAdmin: PropTypes.bool,

    shows: PropTypes.array,
    poolUuid: PropTypes.string,
    index: PropTypes.string,
};

export default PartidaListItem;
