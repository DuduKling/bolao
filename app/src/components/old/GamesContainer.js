import React, { Component } from 'react';
import $ from 'jquery';
import GamesList from './GamesList';
import Loading from './Loading';

import { Link } from 'react-router-dom';

class GamesContainer extends Component {
    constructor() {
        super();
        this.state = {
            LastFixtures: [
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "0",
                //     "away_score": "0",
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "2",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "0",
                //     "away_score": "0",
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // }
            ], 
            NextFixtures: [
                // {
                //     "idfixture": "11",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": null,
                //     "away_score": null,
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "12",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": null,
                //     "away_score": null,
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // }
            ]
        };
    }

    componentDidMount() {
        // var fase = this.props.fase_comp;
        // this.setState({fase: fase});

        var dataString = "fase="+this.props.fase_comp;

        this.setState({loading: true});
        $.ajax({
            url:"../php/getFixtures.php",
            type: 'post',
            data: dataString,
            dataType: 'json',
            success: function(resposta){
                this.setState({loading: false});
                
                var last = [];
                var next = [];
                
                resposta.map(function(team) {
                    if(team.home_score != null){
                        last.push(team);
                    }else{
                        next.push(team);
                    }
                    return true;
                });

                // console.log(last);
                // console.log(last.length - 5);
                // console.log(last.length);
                // console.log(last.slice(last.length - 5,last.length));

                this.setState({LastFixtures: last});
                this.setState({NextFixtures: next});     
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="games-container">
                <ul className="games">
                    <h3>Últimos Jogos <Link to={"jogos/"}>Todos ></Link></h3>
                    <Loading loading={this.state.loading}/>
                    {
                        this.state.LastFixtures.slice(this.state.LastFixtures.length - 5, this.state.LastFixtures.length).map(function(team) {
                            return (
                                <GamesList 
                                key={team.id}
                                dashboard={this.props.dash}
                                link={true}
                                num_jogo={team.idfixture}
                                info={team.datetime} 
                                local={team.local}
                                home_team={team.home_team_name} home_score={team.home_score}
                                home_file={team.home_path} 
                                away_team={team.away_team_name} 
                                away_score={team.away_score}
                                away_file={team.away_path}
                                />
                            );
                        }, this)
                    }
                </ul>
                
                <ul className="games">
                    <h3>Próximos Jogos <Link to={"jogos/"}>Todos ></Link></h3>
                    <Loading loading={this.state.loading}/>
                    {
                        this.state.NextFixtures.slice(0, 5).map(function(team) {
                            return (
                                <GamesList 
                                key={team.id}
                                dashboard={this.props.dash}
                                link={true}
                                num_jogo={team.idfixture}
                                info={team.datetime} 
                                local={team.local}
                                home_team={team.home_team_name} home_score={team.home_score}
                                home_file={team.home_path} 
                                away_team={team.away_team_name} 
                                away_score={team.away_score}
                                away_file={team.away_path}
                                />
                            );
                        }, this)
                    }
                </ul>
            </div>
        );
    }
}

export default GamesContainer;