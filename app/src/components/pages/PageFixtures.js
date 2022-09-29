import React, { Component } from 'react';
import '../../css/pages/pageInside.css';

import http from '../../util/http';

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

    async componentDidMount(){
        this.setState({ loading: true });

        const campeonatoID = this.props.match.params.campeonato;
        const faseID = this.props.match.params.fase;

        let dataString = JSON.stringify({
            faseID
        });

        // Fixtures
        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/fixture/getFixturesFromCampeonato.php`,
            data: dataString,
            thenCallback: (response) => {
                this.setState({
                    loading: false,
                    fixtures: response.fixtures
                });

                localStorage.setItem(campeonatoID+faseID+'fixtures', JSON.stringify(response.fixtures));
            },
            catchCallback: ({ message }) => {
                this.setState({ error: message });
            }
        });


        dataString = JSON.stringify({
            campeonatoID
        });

        // Campeonato
        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/campeonato/getCampeonatoInfo.php`,
            data: dataString,
            thenCallback: (response) => {
                this.setState({
                    campeonato: response.campeonato
                });

                localStorage.setItem(campeonatoID+faseID+'campeonato', JSON.stringify(response.campeonato));
            },
            catchCallback: ({ message }) => {
                this.setState({ error: message });
            }
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