import React, { useEffect, useState } from 'react';
import '../../css/util/partidaPlacar.css';

import PropTypes from 'prop-types';
import PartidaPlacarInput from './PartidaPlacarInput';

function PartidaPlacar(props) {
    const [betHome, setBetHome] = useState('');
    const [betAway, setBetAway] = useState('');

    useEffect(() => {
        props.setBets({
            [props.fixture.id]: [betHome, betAway],
        });
    }, [betHome, betAway]);

    return (
        <span className="placar">

            <PartidaPlacarInput
                fixture={props.fixture}
                score={props.fixture.homeTeamScore}
                readOnly={props.readOnlyHomeScore || props.readOnly}
                isAdmin={props.isAdmin}
                setBetScore={setBetHome}
            />

            <p className="x">X</p>

            <PartidaPlacarInput
                fixture={props.fixture}
                score={props.fixture.awayTeamScore}
                readOnly={props.readOnlyAwayScore || props.readOnly}
                isAdmin={props.isAdmin}
                setBetScore={setBetAway}
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
    setBets: PropTypes.func,
};

export default PartidaPlacar;
