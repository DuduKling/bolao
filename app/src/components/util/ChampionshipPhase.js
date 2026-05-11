import React from 'react';
import '../../css/util/partidaListItem.css';

import PropTypes from 'prop-types';
import ChampionshipPhasePart from './ChampionshipPhasePart';

function ChampionshipPhase(props) {
    const groupFixtures = (fixtures) => {
        const fix = fixtures.reduce((acc, fixture) => {
            if (!acc[fixture.partName]) { acc[fixture.partName] = []; }
            acc[fixture.partName].push(fixture);
            return acc;
        }, {});

        return Object.entries(fix);
    };

    return (
        <div className="phaseContainer">
            <h3 className={`pageTitle ${props.isAdmin ? '-admin' : ''}`}>
                {props.isAdmin ? 'Admin: ' : ''}{props.phaseName}
            </h3>
            {
                groupFixtures(props.fixtures).map(function ([partName, fixtures], index) {
                    let viewType = props.viewType;
                    if (props.partViewTypeEditList?.includes(partName)) {
                        viewType = 'edit';
                    }

                    return (
                        <ChampionshipPhasePart
                            key={index}
                            viewType={viewType}
                            fixtures={fixtures}
                            setScoreController={props.setScoreController ? props.setScoreController : () => { }}
                            isAdmin={props.isAdmin}
                            shows={props.shows}
                            partName={partName}
                            poolUuid={props.poolUuid}
                        />
                    );
                })
            }
        </div>
    );
}

ChampionshipPhase.propTypes = {
    viewType: PropTypes.string,
    fixtures: PropTypes.object,
    setScoreController: PropTypes.func,
    isAdmin: PropTypes.bool,

    shows: PropTypes.array,
    phaseName: PropTypes.string,
    poolUuid: PropTypes.string,
    partViewTypeEditList: PropTypes.array,
};

export default ChampionshipPhase;
