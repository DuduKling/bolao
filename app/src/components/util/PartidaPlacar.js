import React, { useState } from 'react';
import '../../css/util/partidaPlacar.css';

import PropTypes from 'prop-types';

function PartidaPlacar(props) {
    const [awayScoreValue, setAwayScoreValue] = useState('');
    const [homeScoreValue, setHomeScoreValue] = useState('');

    const handleInputChange = (event) => {
        const { value, name, classList } = event.target;

        const regex = /^[0-9]{1,2}$/gi;
        let isValid = value === '' || regex.test(value);

        if (isValid) {
            classList.remove('error');
        } else {
            classList.add('error');
        }

        if (name.endsWith('_home')) {
            setHomeScoreValue(value);
        } else if (name.endsWith('_away')) {
            setAwayScoreValue(value);
        }
    };

    const increment = (home = true) => {
        if (home) {
            setHomeScoreValue(String(Number(homeScoreValue) + 1));
        } else {
            setAwayScoreValue(String(Number(awayScoreValue) + 1));
        }
    };

    const decrement = (home = true) => {
        if (home) {
            let newValue = Number(homeScoreValue) - 1;
            if (newValue < 0) newValue = 0;
            setHomeScoreValue(String(newValue));
        } else {
            let newValue = Number(awayScoreValue) - 1;
            if (newValue < 0) newValue = 0;
            setAwayScoreValue(String(newValue));
        }
    };

    const checkTypeHomeTeam = () => {
        if (props.typeAll === 'ReadOnly') {
            return (
                <p className="plac-num1">{props.fixture.homeTeamScore}</p>
            );

        } else {

            if (props.typeHome === 'ReadOnly') {
                return (
                    <p className="plac-num1">{props.fixture.homeTeamScore}</p>
                );

            } else {
                if (props.isAdmin === 'admin') {
                    return (
                        <div>
                            <div className="input-container">
                                <input
                                    type="number"
                                    placeholder="X"
                                    name={props.fixture.idfixture + '_home'}
                                    onChange={handleInputChange}
                                    maxLength="2"
                                    pattern="^[0-9]{1,2}$"
                                    value={homeScoreValue}
                                />
                                <label></label>
                            </div>
                            <div className="button-container">
                                <button type="button" onClick={() => decrement(true)}>-</button>
                                <button type="button" onClick={() => increment(true)}>+</button>
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
                                    name={props.fixture.idfixture + '_home'}
                                    onChange={handleInputChange}
                                    required="required"
                                    maxLength="2"
                                    pattern="^[0-9]{1,2}$"
                                    value={homeScoreValue}
                                />
                                <label></label>
                            </div>
                            <div className="button-container">
                                <button type="button" onClick={() => decrement(true)}>-</button>
                                <button type="button" onClick={() => increment(true)}>+</button>
                            </div>
                        </div>
                    );
                }
            }
        }
    };

    const checkTypeAwayTeam = () => {
        if (props.typeAll === 'ReadOnly') {
            return (
                <p className="plac-num2">{props.fixture.awayTeamScore}</p>
            );

        } else {

            if (props.typeAway === 'ReadOnly') {
                return (
                    <p className="plac-num2">{props.fixture.awayTeamScore}</p>
                );

            } else {

                if (props.isAdmin === 'admin') {
                    return (
                        <div>
                            <div className="input-container">
                                <input
                                    type="number"
                                    placeholder="X"
                                    name={props.fixture.idfixture + '_away'}
                                    onChange={handleInputChange}
                                    maxLength="2"
                                    pattern="^[0-9]{1,2}$"
                                    value={awayScoreValue}
                                />
                                <label></label>
                            </div>
                            <div className="button-container">
                                <button type="button" onClick={() => decrement(false)}>-</button>
                                <button type="button" onClick={() => increment(false)}>+</button>
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
                                    onChange={handleInputChange}
                                    required="required"
                                    maxLength="2"
                                    pattern="^[0-9]{1,2}$"
                                    value={awayScoreValue}
                                />
                                <label></label>
                            </div>
                            <div className="button-container">
                                <button type="button" onClick={() => decrement(false)}>-</button>
                                <button type="button" onClick={() => increment(false)}>+</button>
                            </div>
                        </div>
                    );
                }
            }
        }
    };

    return (
        <span className="placar">

            {checkTypeHomeTeam()}

            <p className="x">X</p>

            {checkTypeAwayTeam()}

        </span>
    );
}

PartidaPlacar.propTypes = {
    typeAll: PropTypes.string,
    fixture: PropTypes.object,
    typeHome: PropTypes.string,
    isAdmin: PropTypes.string,
    typeAway: PropTypes.string,
};

export default PartidaPlacar;
