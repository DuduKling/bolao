import React, { useEffect, useState } from 'react';
import '../../css/util/partidaPlacar.css';

import PropTypes from 'prop-types';

function PartidaPlacarInput(props) {
    const [scoreValue, setScoreValue] = useState('');

    useEffect(() => {
        props.setBetScore(scoreValue);
    }, [scoreValue]);

    const handleInputChange = (event) => {
        const { value, classList } = event.target;

        const regex = /^[0-9]{1,2}$/gi;
        let isValid = value === '' || regex.test(value);

        if (isValid) {
            classList.remove('error');
        } else {
            classList.add('error');
        }

        setScoreValue(value);
        props.setBetScore(value);
    };

    const increment = () => {
        let newValue = Number(scoreValue) + 1;
        if (scoreValue === '') newValue = 0;
        setScoreValue(String(newValue));
    };

    const decrement = () => {
        let newValue = Number(scoreValue) - 1;
        if (newValue < 0) newValue = 0;
        setScoreValue(String(newValue));
    };

    const checkType = () => {
        if (props.type === 'ReadOnly') {
            return (
                <p className="plac-num">{props.score}</p>
            );
        } else if (props.isAdmin === 'admin') {
            return (
                <div>
                    <div className="input-container">
                        <input
                            type="number"
                            placeholder="X"
                            name={props.fixture.idfixture + '_away'}
                            onInput={handleInputChange}
                            maxLength="2"
                            pattern="^[0-9]{1,2}$"
                            value={scoreValue}
                        />
                        <label></label>
                    </div>
                    <div className="button-container">
                        <button type="button" tabIndex="-1" onClick={() => decrement()}>-</button>
                        <button type="button" tabIndex="-1" onClick={() => increment()}>+</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="input-container">
                        <input
                            type="number"
                            placeholder="X"
                            name={props.fixture.idfixture + '_away'}
                            onInput={handleInputChange}
                            required="required"
                            maxLength="2"
                            pattern="^[0-9]{1,2}$"
                            value={scoreValue}
                        />
                        <label></label>
                    </div>
                    <div className="button-container">
                        <button type="button" tabIndex="-1" onClick={() => decrement()}>-</button>
                        <button type="button" tabIndex="-1" onClick={() => increment()}>+</button>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            {checkType()}
        </>
    );
}

PartidaPlacarInput.propTypes = {
    type: PropTypes.string,
    fixture: PropTypes.object,
    score: PropTypes.string,
    isAdmin: PropTypes.string,
    setBetScore: PropTypes.func,
};

export default PartidaPlacarInput;
