import React from 'react';
import '../../css/util/partidaTeam.css';

import PropTypes from 'prop-types';

function PartidaTeam(props) {

    const setImage = (imageName) => {
        if (imageName === '') {
            return '/imagens/flags/default_flag.png';
        } else {
            return '/imagens/flags/' + imageName;
        }
    };

    const checkIfHomeOrAway = () => {
        if (props.type === '-Home') {
            return (
                <div className={'time ' + props.type}>
                    <p>{props.fixture.homeTeamName}</p>
                    <div>
                        <img src={setImage(props.fixture.homeTeamImagePath)} alt={props.fixture.homeTeamName} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={'time ' + props.type}>
                    <p>{props.fixture.awayTeamName}</p>
                    <div>
                        <img src={setImage(props.fixture.awayTeamImagePath)} alt={props.fixture.awayTeamName} />
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            {checkIfHomeOrAway()}
        </div>
    );
}

PartidaTeam.propTypes = {
    type: PropTypes.string,
    fixture: PropTypes.object,
};

export default PartidaTeam;
