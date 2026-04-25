import React from 'react';
import '../../css/util/partidaTeam.css';

import PropTypes from 'prop-types';

function PartidaTeam(props) {

    const setImage = (imageName) => {
        if (imageName) {
            return '/imagens/flags/' + imageName;
        }

        return '/imagens/flags/default_flag.png';
    };

    return (
        <div>
            <div className={'time ' + props.extraClass}>
                <p>{props.teamName}</p>
                <div>
                    <img src={setImage(props.imagePath)} alt={props.teamName} />
                </div>
            </div>
        </div>
    );
}

PartidaTeam.propTypes = {
    extraClass: PropTypes.string,
    teamName: PropTypes.object,
    imagePath: PropTypes.object,
};

export default PartidaTeam;
