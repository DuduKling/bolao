import React, { useState } from 'react';
import '../../css/util/partidaPlacar.css';

import PropTypes from 'prop-types';

function PartidaPlacarInput(props) {
    const scoreString = typeof props.score === 'number' ? String(props.score) : '';

    const [scoreValue, setScoreValue] = useState(scoreString);

    const handleInputChange = (event) => {
        const { value, classList } = event.target;

        const regex = /^[0-9]{1,2}$/gi;
        let isValid = value === '' || regex.test(value);

        if (isValid) {
            classList.remove('error');
        } else {
            classList.add('error');
        }

        updateScore(value);
    };

    const increment = () => {
        let newValue = Number(scoreValue) + 1;
        if (scoreValue === '') newValue = 0;

        updateScore(String(newValue));
    };

    const decrement = () => {
        let newValue = Number(scoreValue) - 1;
        if (newValue < 0) newValue = 0;

        updateScore(String(newValue));
    };

    const updateScore = (newValue) => {
        setScoreValue(newValue);
        props.setScoreStateHandler(newValue);
    };

    const checkType = () => {
        if (props.viewType === 'edit') {
            return (
                <div>
                    <div className="input-container">
                        <input
                            type="number"
                            placeholder="X"
                            name={props.fixture.idfixture}
                            onInput={handleInputChange}
                            required={props.isAdmin ? '' : 'required'}
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

        return (
            <p className="plac-num">{props.score}</p>
        );
    };

    return (
        <>
            {checkType()}
        </>
    );
}

PartidaPlacarInput.propTypes = {
    viewType: PropTypes.string,
    fixture: PropTypes.object,
    setScoreStateHandler: PropTypes.func,
    isAdmin: PropTypes.string,

    score: PropTypes.string,
};

export default PartidaPlacarInput;
