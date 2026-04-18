import React from 'react';
import '../../css/util/partidaListItem.css';

import PartidaListItem from './PartidaListItem';

import PropTypes from 'prop-types';

function ChampionshipPhasePart(props) {

    return (
        <div className="partContainer">
            <h4 className="partTitle">{props.partName}</h4>
            {
                props.fixtures.map(function (fixture) {
                    return (
                        <div key={fixture.id}>
                            <PartidaListItem
                                key={fixture.id}
                                fixture={fixture}
                                typeAll={props.typeAll}
                                setBets={props.setBets}
                            />
                        </div>
                    );
                }, this)
            }
        </div>
    );
}

ChampionshipPhasePart.propTypes = {
    partName: PropTypes.string,
    fixtures: PropTypes.object,
    typeAll: PropTypes.string,
    setBets: PropTypes.func,
};

export default ChampionshipPhasePart;
