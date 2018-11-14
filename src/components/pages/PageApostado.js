import React, { Component } from 'react';
// import $ from 'jquery';
import '../../css/pages/pageInside.css';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

import Avatar from '../../imgs/avatar.png';


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

                        <div className="userImage-container">
                            <div className="userImage">
                                <img src={Avatar} alt="avatar"/>
                            </div>
                        </div>


                        <ul className="partidaLista -apostado">
                            <h3 className="pageTitle">{this.props.match.params.nome}</h3>
                            <Loading loading={this.state.loading}/>
                            {
                            this.state.Fixtures.map(function(team, index){
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

                    {/*this.AJAXresp()*/}
                </div>
            </section>      
        );
    }
}

export default PageApostar;