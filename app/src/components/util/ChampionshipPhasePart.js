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
                                readOnly={props.readOnly}
                                setBets={props.setBets}
                                isAdmin={props.isAdmin}
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
    readOnly: PropTypes.bool,
    setBets: PropTypes.func,
    isAdmin: PropTypes.bool,
};

export default ChampionshipPhasePart;
