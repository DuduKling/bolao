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
                    <p>{props.team.home_team_name}</p>
                    <div>
                        <img src={setImage(props.team.home_path)} alt={props.team.home_team_name} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={'time ' + props.type}>
                    <p>{props.team.away_team_name}</p>
                    <div>
                        <img src={setImage(props.team.away_path)} alt={props.team.away_team_name} />
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
    team: PropTypes.object,
};

export default PartidaTeam;
