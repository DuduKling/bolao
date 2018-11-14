import React, { Component } from 'react';
// import $ from 'jquery';
import '../../css/pages/pageInside.css';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

class PageApostar extends Component {
	constructor() {
        super();
        this.state = {Fixtures: [
            {
                "idfixture": "1",
                "datetime": "Date Time",
                "local": "Russia",
                "home_score": "0",
                "away_score": "",
                "home_team_name": "Time 1",
                "home_path": "default_flag",
                "away_team_name": "Time 2",
                "away_path": "default_flag"
            },
            {
                "idfixture": "2",
                "datetime": "Date Time",
                "local": "Russia",
                "home_score": "",
                "away_score": "1",
                "home_team_name": "Time 1",
                "home_path": "default_flag",
                "away_team_name": "Time 2",
                "away_path": "default_flag"
			},
            {
                "idfixture": "2",
                "datetime": "Date Time",
                "local": "Russia",
                "home_score": "2",
                "away_score": "3",
                "home_team_name": "Time 1",
                "home_path": "default_flag",
                "away_team_name": "Time 2",
                "away_path": "default_flag"
			},
            {
                "idfixture": "2",
                "datetime": "Date Time",
                "local": "Russia",
                "home_score": "",
                "away_score": "",
                "home_team_name": "Time 1",
                "home_path": "default_flag",
                "away_team_name": "Time 2",
                "away_path": "default_flag"
			},
            {
                "idfixture": "2",
                "datetime": "Date Time",
                "local": "Russia",
                "home_score": "",
                "away_score": "",
                "home_team_name": "Time 1",
                "home_path": "default_flag",
                "away_team_name": "Time 2",
                "away_path": "default_flag"
			}
        ], nome: '', error: '', resp: ''};
    }
    
    render() {
        return (
            <section className="main-container">
                <div className="main-content">
                
                    <div className="main-partidaForm" >
                        <ul className="partidaLista -admin">
                            <h3 className="pageTitle">administrador</h3>
                            <Loading loading={this.state.loading}/>
                            {
                            this.state.Fixtures.map(function(team, index){
                                return(

                                    <PartidaListItem 
                                        key={index}
                                        team={team} 
                                        typeAll={""}
                                        />
                                    
                                );
                            }, this)
                            }

                        </ul>

                        <div className="EnviarAposta">
                            <input type="submit" className="SendButton" value="Enviar" />
                            <Loading loading={this.state.loading2}/>
                        </div>
                    </div>

                    {/*this.AJAXresp()*/}
                </div>
            </section>      
        );
    }
}

export default PageApostar;