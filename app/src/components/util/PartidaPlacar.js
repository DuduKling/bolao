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
                type={props.typeHome || props.typeAll}
                isAdmin={props.isAdmin}
                setBetScore={setBetHome}
            />

            <p className="x">X</p>

            <PartidaPlacarInput
                fixture={props.fixture}
                score={props.fixture.awayTeamScore}
                type={props.typeAway || props.typeAll}
                isAdmin={props.isAdmin}
                setBetScore={setBetAway}
            />

        </span>
    );
}

PartidaPlacar.propTypes = {
    typeAll: PropTypes.string,
    fixture: PropTypes.object,
    typeHome: PropTypes.string,
    isAdmin: PropTypes.string,
    typeAway: PropTypes.string,
    setBets: PropTypes.func,
};

export default PartidaPlacar;
