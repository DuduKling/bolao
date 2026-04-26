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
                    return (
                        <ChampionshipPhasePart
                            key={index}
                            partName={partName}
                            fixtures={fixtures}
                            viewType={props.viewType}
                            setScoreController={props.setScoreController ? props.setScoreController : () => { }}
                            isAdmin={props.isAdmin}
                        />
                    );
                })
            }
        </div>
    );
}

ChampionshipPhase.propTypes = {
    phaseName: PropTypes.string,
    fixtures: PropTypes.object,
    viewType: PropTypes.string,
    setScoreController: PropTypes.func,
    isAdmin: PropTypes.bool,
};

export default ChampionshipPhase;
