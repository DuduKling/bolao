import React from 'react';
import '../../css/util/partidaPlacar.css';

import PropTypes from 'prop-types';

function PartidaPlacar(props) {

    const handleInputChange = (event) => {
        const inputValue = event.target.value;

        let regx = new RegExp('^[0-9]{1,2}$', 'gi');
        let resultado = regx.test(inputValue);

        if (!resultado) {
            event.target.classList.add('error');
        } else {
            event.target.classList.remove('error');

        }
    };

    const checkTypeHomeTeam = () => {
        if (props.typeAll === 'ReadOnly') {
            return (
                <p className="plac-num1">{props.team.home_score}</p>
            );

        } else {

            if (props.typeHome === 'ReadOnly') {
                return (
                    <p className="plac-num1">{props.team.home_score}</p>
                );

            } else {
                if (props.isAdmin === 'admin') {
                    return (
                        <div>
                            <input
                                type="text"
                                placeholder="X"
                                name={props.team.idfixture + '_home'}
                                onChange={handleInputChange}
                                maxLength="2"
                                pattern="^[0-9]{1,2}$"
                            />
                            <label></label>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <input
                                type="text"
                                placeholder="X"
                                name={props.team.idfixture + '_home'}
                                onChange={handleInputChange}
                                required="required"
                                maxLength="2"
                                pattern="^[0-9]{1,2}$"
                            />
                            <label></label>
                        </div>
                    );
                }
            }
        }
    };

    const checkTypeAwayTeam = () => {
        if (props.typeAll === 'ReadOnly') {
            return (
                <p className="plac-num2">{props.team.away_score}</p>
            );

        } else {

            if (props.typeAway === 'ReadOnly') {
                return (
                    <p className="plac-num2">{props.team.away_score}</p>
                );

            } else {

                if (props.isAdmin === 'admin') {
                    return (
                        <div>
                            <input
                                type="text"
                                placeholder="X"
                                name={props.team.idfixture + '_away'}
                                onChange={handleInputChange}
                                maxLength="2"
                                pattern="^[0-9]{1,2}$"
                            />
                            <label></label>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <input
                                type="text"
                                placeholder="X"
                                name={props.team.idfixture + '_away'}
                                onChange={handleInputChange}
                                required="required"
                                maxLength="2"
                                pattern="^[0-9]{1,2}$"
                            />
                            <label></label>
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
    team: PropTypes.object,
    typeHome: PropTypes.string,
    isAdmin: PropTypes.string,
    typeAway: PropTypes.string,
};

export default PartidaPlacar;
