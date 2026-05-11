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
                                viewType={props.viewType}
                                fixture={fixture}
                                setScoreController={props.setScoreController}
                                isAdmin={props.isAdmin}
                                shows={props.shows}
                                poolUuid={props.poolUuid}
                            />
                        </div>
                    );
                }, this)
            }
        </div>
    );
}

ChampionshipPhasePart.propTypes = {
    viewType: PropTypes.string,
    fixtures: PropTypes.object,
    setScoreController: PropTypes.func,
    isAdmin: PropTypes.bool,

    shows: PropTypes.array,
    partName: PropTypes.string,
    poolUuid: PropTypes.string,
};

export default ChampionshipPhasePart;
