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
            <h3 className="pageTitle">{props.phaseName}</h3>
            {
                groupFixtures(props.fixtures).map(function ([partName, fixtures], index) {
                    return (
                        <ChampionshipPhasePart
                            key={index}
                            partName={partName}
                            fixtures={fixtures}
                            typeAll={props.typeAll}
                            setBets={props.setBets ? props.setBets : () => {}}
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
    typeAll: PropTypes.string,
    setBets: PropTypes.func,
};

export default ChampionshipPhase;
