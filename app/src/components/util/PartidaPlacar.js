import React, { useEffect, useState } from 'react';
import '../../css/util/partidaPlacar.css';

import PropTypes from 'prop-types';
import PartidaPlacarInput from './PartidaPlacarInput';

function PartidaPlacar(props) {
    const { homeTeamScore, awayTeamScore, id } = props.fixture;
    const homeTeamScoreString = typeof homeTeamScore === 'number' ? String(homeTeamScore) : '';
    const awayTeamScoreString = typeof awayTeamScore === 'number' ? String(awayTeamScore) : '';

    const [scoreHome, setScoreHome] = useState(homeTeamScoreString);
    const [scoreAway, setScoreAway] = useState(awayTeamScoreString);

    useEffect(() => {
        const scoresAreEmpty = scoreHome === '' && scoreAway === '';
        const scoresAreTheSame = scoreHome === homeTeamScoreString && scoreAway === awayTeamScoreString;

        props.setScoreController({
            fixture: id,
            score: (scoresAreEmpty || scoresAreTheSame) ? 'empty' : [scoreHome, scoreAway],
        });
    }, [scoreHome, scoreAway]);

    return (
        <span className="placar">

            <PartidaPlacarInput
                fixture={props.fixture}
                score={homeTeamScore}
                viewType={props.viewType}
                isAdmin={props.isAdmin}
                setScoreStateHandler={setScoreHome}
            />

            <p className="x">X</p>

            <PartidaPlacarInput
                fixture={props.fixture}
                score={awayTeamScore}
                viewType={props.viewType}
                isAdmin={props.isAdmin}
                setScoreStateHandler={setScoreAway}
            />

        </span>
    );
}

PartidaPlacar.propTypes = {
    viewType: PropTypes.string,
    fixture: PropTypes.object,
    setScoreController: PropTypes.func,
    isAdmin: PropTypes.bool,
};

export default PartidaPlacar;
