import React, { useEffect, useState } from 'react';
import '../../css/util/partidaPlacar.css';

import PropTypes from 'prop-types';
import PartidaPlacarInput from './PartidaPlacarInput';

function PartidaPlacar(props) {
    const [scoreHome, setScoreHome] = useState('');
    const [scoreAway, setScoreAway] = useState('');

    useEffect(() => {
        props.setScoreController({
            [props.fixture.id]: [scoreHome, scoreAway],
        });
    }, [scoreHome, scoreAway]);

    return (
        <span className="placar">

            <PartidaPlacarInput
                fixture={props.fixture}
                score={props.fixture.homeTeamScore}
                readOnly={props.readOnlyHomeScore || props.readOnly}
                isAdmin={props.isAdmin}
                setScoreStateHandler={setScoreHome}
            />

            <p className="x">X</p>

            <PartidaPlacarInput
                fixture={props.fixture}
                score={props.fixture.awayTeamScore}
                readOnly={props.readOnlyAwayScore || props.readOnly}
                isAdmin={props.isAdmin}
                setScoreStateHandler={setScoreAway}
            />

        </span>
    );
}

PartidaPlacar.propTypes = {
    readOnly: PropTypes.bool,
    fixture: PropTypes.object,
    readOnlyHomeScore: PropTypes.bool,
    isAdmin: PropTypes.bool,
    readOnlyAwayScore: PropTypes.bool,
    setScoreController: PropTypes.func,
};

export default PartidaPlacar;
