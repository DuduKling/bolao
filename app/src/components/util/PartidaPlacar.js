import React, { useEffect, useState } from 'react';
import '../../css/util/partidaPlacar.css';

import PropTypes from 'prop-types';
import PartidaPlacarInput from './PartidaPlacarInput';

function PartidaPlacar(props) {
    const { homeTeamScore, awayTeamScore, id } = props.fixture;

    const [scoreHome, setScoreHome] = useState(homeTeamScore ? String(homeTeamScore) : '');
    const [scoreAway, setScoreAway] = useState(awayTeamScore ? String(awayTeamScore) : '');

    useEffect(() => {
        const scoresAreEmpty = scoreHome === '' && scoreAway === '';

        props.setScoreController({
            fixture: id,
            score: scoresAreEmpty ? 'empty' : [scoreHome, scoreAway],
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
    isAdmin: PropTypes.bool,
    setScoreController: PropTypes.func,
};

export default PartidaPlacar;
