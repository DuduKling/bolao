import React, { Component } from 'react';
import '../../css/pages/pageInside.css';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

class PageFixtures extends Component {
    constructor() {
        super();
        this.state = {
            fixtures: [
                {
                    "idfixture": "1",
                    "datetime": "Date Time",
                    "local": "Russia",
                    "home_score": "0",
                    "away_score": "",
                    "home_team_name": "Time 1",
                    "home_path": "",
                    "away_team_name": "Time 2",
                    "away_path": ""
                },
                {
                    "idfixture": "2",
                    "datetime": "Date Time",
                    "local": "Russia",
                    "home_score": "",
                    "away_score": "1",
                    "home_team_name": "Time 1",
                    "home_path": "",
                    "away_team_name": "Time 2",
                    "away_path": ""
                },
                {
                    "idfixture": "2",
                    "datetime": "Date Time",
                    "local": "Russia",
                    "home_score": "2",
                    "away_score": "3",
                    "home_team_name": "Time 1",
                    "home_path": "",
                    "away_team_name": "Time 2",
                    "away_path": ""
                },
                {
                    "idfixture": "2",
                    "datetime": "Date Time",
                    "local": "Russia",
                    "home_score": "",
                    "away_score": "",
                    "home_team_name": "Time 1",
                    "home_path": "",
                    "away_team_name": "Time 2",
                    "away_path": ""
                },
                {
                    "idfixture": "2",
                    "datetime": "Date Time",
                    "local": "Russia",
                    "home_score": "",
                    "away_score": "",
                    "home_team_name": "Time 1",
                    "home_path": "",
                    "away_team_name": "Time 2",
                    "away_path": ""
                }
            ],
            error: ''
        };
    }
    
    render() {
        return (
            <section className="main-container">
                <div className="main-content">
                
                    <div className="main-partidaForm">

                        <ul className="partidaLista">
                            <h3 className="pageTitle">Todos os jogos</h3>
                            <Loading loading={this.state.loading}/>
                            {
                            this.state.fixtures.map(function(team, index){
                                return(

                                    <PartidaListItem 
                                        key={index}
                                        team={team} 
                                        typeAll={"ReadOnly"}
                                        link={this.props.match.params}
                                    />
                                    
                                );
                            }, this)
                            }

                        </ul>
                        
                    </div>

                </div>
            </section>
        );
    }
}

export default PageFixtures;