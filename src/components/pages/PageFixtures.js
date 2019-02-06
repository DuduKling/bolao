import React, { Component } from 'react';
import '../../css/pages/pageInside.css';
import $ from 'jquery';


import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

class PageFixtures extends Component {
    constructor() {
        super();
        this.state = {
            fixtures: [
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "0",
                //     "away_score": "",
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "2",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "",
                //     "away_score": "1",
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "2",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "2",
                //     "away_score": "3",
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "2",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "",
                //     "away_score": "",
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "2",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "",
                //     "away_score": "",
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // }
            ],
            campeonato: {
                // "nomeCampeonato": "Copa do Mundo Rússia 2018",
                // "logoCampeonato": "russia_2018.png",
                // "dataInicioCampeonato": "88/88/888",
                // // "statusCampeonato": "finalizado",
                // "idCampeonato": "1",
                // // "participacaoCampeonato": "yes",
                // "fases": [
                //     {
                //         "id": "1",
                //         "nomeFase": "Grupos",
                //         // "apostaFase": true,
                //         "partes": [
                //             {
                //                 "id": 1,
                //                 "nomeParte": "Tabela",
                //                 "statusParte": "finalizado"
                //             }
                //         ]
                //     },
                //     {
                //         "id": "2",
                //         "nomeFase": "Eliminatórias",
                //         // "apostaFase": true,
                //         "partes": [
                //             {
                //                 "id": 1,
                //                 "nomeParte": "Oitavas",
                //                 "statusParte": "finalizado"
                //             },
                //             {
                //                 "id": 2,
                //                 "nomeParte": "Quartas",
                //                 "statusParte": "aposta"
                //             }
                //         ]
                //     }
                // ]
            }
        };
    }

    componentWillMount(){
        var campeonatoID = this.props.match.params.campeonato;
        var faseID = this.props.match.params.fase;

        const cachedCampeonato = localStorage.getItem(campeonatoID+faseID+'campeonato');
        if(cachedCampeonato){
            this.setState({
                campeonato: JSON.parse(cachedCampeonato)
            });
        }

        const cachedFixtures = localStorage.getItem(campeonatoID+faseID+'fixtures');
        if(cachedFixtures){
            this.setState({
                fixtures: JSON.parse(cachedFixtures)
            });
        }
    }

    componentDidMount(){
        this.setState({loading: true});

        var campeonatoID = this.props.match.params.campeonato;
        var faseID = this.props.match.params.fase;

        // Fixtures
        var textJSON = `{
            "faseID":"${faseID}"
        }`;
        var textJSON2 = JSON.parse(textJSON);
        var dataString = JSON.stringify(textJSON2);

        $.ajax({
            url:"../../rest-api/getFixturesFromCampeonato.php",
            type: 'post',
            data: dataString,
            dataType: 'json',
            success: function(resposta){
                this.setState({
                    loading: false,
                    fixtures: resposta.fixtures
                });
                localStorage.setItem(campeonatoID+faseID+'fixtures', JSON.stringify(resposta.fixtures));
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                // console.log(JSON.parse(xhr.responseText));
                // this.setState({loading: false});
                this.setState({error: JSON.parse(xhr.responseText).message});
            }.bind(this)
        });
        


        // Campeonato
        textJSON = `{
            "campeonatoID":"${campeonatoID}"
        }`;
        textJSON2 = JSON.parse(textJSON);
        dataString = JSON.stringify(textJSON2);

        $.ajax({
            url:"../../rest-api/getCampeonatoInfo.php",
            type: 'post',
            data: dataString,
            dataType: 'json',
            success: function(resposta){
                this.setState({
                    campeonato: resposta.campeonato
                });
                localStorage.setItem(campeonatoID+faseID+'campeonato', JSON.stringify(resposta.campeonato));
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                // console.log(JSON.parse(xhr.responseText));
                this.setState({error: JSON.parse(xhr.responseText).message});
            }.bind(this)
        });
    }
    
    checkFaseName(){
        var faseID = this.props.match.params.fase;

        var fase = this.state.campeonato.fases
            .filter(function(fase){
                return fase.id === faseID;
            })
            
        return fase[0].nomeFase;
    }
    
    render() {
        return (
            <section className="main-container">
                <div className="main-content">
                
                    <div className="main-partidaForm">

                        <ul className="partidaLista">
                            <h3 className="pageTitle">
                                Jogos de {this.state.campeonato?this.state.campeonato.nomeCampeonato:""} - {this.state.campeonato?this.checkFaseName():""}
                                <Loading loading={this.state.loading} localstorage="-withLocalStorage2"/>
                            </h3>
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