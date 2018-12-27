import React, { Component } from 'react';
import '../../css/pages/pageInside.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';
import RankListItem from '../util/RankListItem';

class PageDashboard extends Component {
    constructor() {
        super();
        this.state = {
            lastFixtures: [
                {
                    "idfixture": "1",
                    "datetime": "Date Time",
                    "local": "Russia",
                    "home_score": "0",
                    "away_score": "0",
                    "home_team_name": "Time 1",
                    "home_path": "",
                    "away_team_name": "Time 2",
                    "away_path": ""
                },
                {
                    "idfixture": "2",
                    "datetime": "Date Time",
                    "local": "Russia",
                    "home_score": "0",
                    "away_score": "0",
                    "home_team_name": "Time 1",
                    "home_path": "",
                    "away_team_name": "Time 2",
                    "away_path": ""
                }
            ], 
            nextFixtures: [
                {
                    "idfixture": "11",
                    "datetime": "Date Time",
                    "local": "Russia",
                    "home_score": null,
                    "away_score": null,
                    "home_team_name": "Time 1",
                    "home_path": "",
                    "away_team_name": "Time 2",
                    "away_path": ""
                },
                {
                    "idfixture": "12",
                    "datetime": "Date Time",
                    "local": "Russia",
                    "home_score": null,
                    "away_score": null,
                    "home_team_name": "Time 1",
                    "home_path": "",
                    "away_team_name": "Time 2",
                    "away_path": ""
                }
            ],
            rank: [
                {
                    "position": "0",
                    "name": "Nome completo 1234",
                    "points": "25"
                },
                {
                    "position": "1",
                    "name": "Nome completo 2",
                    "points": "25"
                },
                {
                    "position": "0",
                    "name": "Nome completo 1234",
                    "points": "25"
                },
                {
                    "position": "0",
                    "name": "Nome completo 2",
                    "points": "23"
                },
                {
                    "position": "5",
                    "name": "Nome completo 1234",
                    "points": "23"
                },
                {
                    "position": "0",
                    "name": "Nome completo 2",
                    "points": "11"
                },
                {
                    "position": "0",
                    "name": "Nome completo 1234",
                    "points": "8"
                },
                {
                    "position": "0",
                    "name": "Nome completo 2",
                    "points": "0"
                }
            ],
            campeonato: {
                "nomeCampeonato": "Copa do Mundo Catar 2022",
                "logoCampeonato": "qatar_2022.png",
                "dataInicioCampeonato": "88/88/888",
                "statusCampeonato": "finalizado",
                "idCampeonato": "3",
                "participacaoCampeonato": "no",
                "fase": {
                    "id": "1",
                    "nomeFase": "Grupos",
                    "apostaFase": true
                }
            }
        };
    }

    componentWillMount(){
        var campoonatoID = this.props.match.params.campeonato;
        
        
        var textJSON = `{
            "id":"${campoonatoID}"
        }`;
        var textJSON2 = JSON.parse(textJSON);
        var dataString = JSON.stringify(textJSON2);

        $.ajax({
            url:"../rest-api/getCampeonatos.php",
            type: 'post',
            contentType : 'application/json',
            data: dataString,
            success: function(resposta){
                console.log("oi");
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                console.log(JSON.parse(xhr.responseText));
            }.bind(this)
        });
    }

    render() {
        return (
            <section className="main-container">
                <div className="main-dashboard">

                    <div className="dashbord-top">
                        <h2>{this.state.campeonato.nomeCampeonato}</h2>
                        <p className="dashboard-statusFase">
                            Status: {this.state.campeonato.statusCampeonato}
                        </p>
                    </div>

                    <div>
                        <div className="dashboard-main">

                            <div className="main-partidaForm">
                                <table className="rankTable">
                                    <caption>
                                        <h3 className="pageTitle">Rank</h3>
                                    </caption>
                                    <thead>
                                        <tr>
                                            <td className="positionColumn">#</td>
                                            <td className="nameColumn">Nome</td>
                                            <td className="pointsColumn">Pontos</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        this.state.rank.map(function(rank, index){
                                            return(

                                                <RankListItem 
                                                    key={index}
                                                    rank={rank} 
                                                    link={this.props.match.params}
                                                    />
                                                
                                            );
                                        }, this)
                                        }
                                    </tbody>
                                </table>
                                <Loading loading={this.state.loading}/>
                            </div>
                        </div>

                        <div className="dashboard-aside">

                            <div className="main-partidaForm">
                                <ul className="partidaLista">
                                    <h3 className="pageTitle">Próximos Jogos</h3>
                                    <Link className="allFixturesLink" to={"../"+this.props.match.params.fase+"/jogos"}>Todos ></Link>
                                    <Loading loading={this.state.loading}/>
                                    {
                                    this.state.nextFixtures.map(function(team, index){
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

                            <div className="main-partidaForm">

                                <ul className="partidaLista">
                                    <h3 className="pageTitle">Últimos Jogos</h3>
                                    <Link className="allFixturesLink" to={"../"+this.props.match.params.fase+"/jogos"}>Todos ></Link>
                                    <Loading loading={this.state.loading}/>
                                    {
                                    this.state.lastFixtures.map(function(team, index){
                                        return(

                                            <PartidaListItem
                                                key={index}
                                                team={team} 
                                                typeAll={"ReadOnly"}
                                                link={true}
                                                />
                                            
                                        );
                                    }, this)
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default PageDashboard;