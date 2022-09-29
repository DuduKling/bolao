import React, { Component } from 'react';
import '../../css/pages/pageInside.css';
import { Link } from 'react-router-dom';

import http from '../../util/http';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';
import RankListItem from '../util/RankListItem';

class PageDashboard extends Component {
    constructor() {
        super();
        this.state = {
            fixtures: [
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": null,
                //     "away_score": null,
                //     "home_team_name": "Time AAA",
                //     "home_path": "",
                //     "away_team_name": "Arábia Saudita",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "2",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": null,
                //     "away_score": null,
                //     "home_team_name": "Time AAA",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": null,
                //     "away_score": null,
                //     "home_team_name": "Time AAA",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "2",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": null,
                //     "away_score": null,
                //     "home_team_name": "Time AAA",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": null,
                //     "away_score": null,
                //     "home_team_name": "Time AAA",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": null,
                //     "away_score": null,
                //     "home_team_name": "Time AAA",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "0",
                //     "away_score": "0",
                //     "home_team_name": "Time BBB",
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
                //     "home_team_name": "Time BBB",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "0",
                //     "away_score": "0",
                //     "home_team_name": "Time BBB",
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
                //     "home_team_name": "Time BBB",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "0",
                //     "away_score": "0",
                //     "home_team_name": "Time BBB",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "0",
                //     "away_score": "0",
                //     "home_team_name": "Time JJJ",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "0",
                //     "away_score": "0",
                //     "home_team_name": "Time JJJ",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "0",
                //     "away_score": "0",
                //     "home_team_name": "Time JJJa",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": null,
                //     "away_score": null,
                //     "home_team_name": "Time 11",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // },
                // {
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": null,
                //     "away_score": null,
                //     "home_team_name": "Time 11",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": ""
                // }
            ],
            rank: [
            //     {
            //         "position": "0",
            //         "name": "Nome completo 1234",
            //         "points": "40"
            //     },
            //     {
            //         "position": "1",
            //         "name": "Nome completo 2",
            //         "points": "30"
            //     },
            //     {
            //         "position": "0",
            //         "name": "Nome completo 1234",
            //         "points": "23"
            //     },
            //     {
            //         "position": "0",
            //         "name": "Nome completo 2",
            //         "points": "23"
            //     },
            //     {
            //         "position": "5",
            //         "name": "Nome completo 1234",
            //         "points": "11"
            //     },
            //     {
            //         "position": "0",
            //         "name": "Nome completo 2",
            //         "points": "8"
            //     },
            //     {
            //         "position": "0",
            //         "name": "Nome completo 1234",
            //         "points": "8"
            //     },
            //     {
            //         "position": "0",
            //         "name": "Nome completo 2",
            //         "points": "0"
            //     }
            ],
            campeonato: {
                "nomeCampeonato": "",
                "logoCampeonato": "",
                "dataInicioCampeonato": "",
                // "statusCampeonato": "finalizado",
                "idCampeonato": "1",
                // "participacaoCampeonato": "yes",
                "fases": [
                    {
                        "id": "1",
                        "nomeFase": "",
                        // "apostaFase": true,
                        "partes": [
                            {
                                "id": 1,
                                "nomeParte": "",
                                "statusParte": ""
                            }
                        ]
                    },
                    {
                        "id": "2",
                        "nomeFase": "",
                        // "apostaFase": true,
                        "partes": [
                            {
                                "id": 1,
                                "nomeParte": "",
                                "statusParte": ""
                            },
                            {
                                "id": 2,
                                "nomeParte": "",
                                "statusParte": ""
                            }
                        ]
                    }
                ]
            }
        };
    }

    componentWillMount(){
        var campeonatoID = this.props.match.params.campeonato;
        var faseID = this.props.match.params.fase;

        // campeonato rank fixtures
        const cachedCampeonato = localStorage.getItem(campeonatoID+faseID+'campeonato');
        if(cachedCampeonato){
            this.setState({
                campeonato: JSON.parse(cachedCampeonato)
            });
        }

        const cachedRank = localStorage.getItem(campeonatoID+faseID+'rank');
        if(cachedRank){
            this.setState({
                rank: JSON.parse(cachedRank)
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
                this.setState({ loading: false });
                this.setState({ error: message });
            }
        });

        // Rank
        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/fixture/getRank.php`,
            data: dataString,
            thenCallback: (response) => {
                this.setState({
                    loading: false,
                    rank: response.rank,
                });

                localStorage.setItem(campeonatoID+faseID+'rank', JSON.stringify(response.rank));
            },
            catchCallback: ({ message }) => {
                this.setState({ loading: false });
                this.setState({ error: message });
            }
        });

        dataString = JSON.stringify({
            campeonatoID
        });

        //TODO Rever que com o id da fase da pra pegar essas informações do campeonato....
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

    checkStatus(){
        var campeonato = this.state.campeonato;
        var faseID = this.props.match.params.fase;
        
        var qtdAposta = campeonato.fases
            .filter(function(fase){
                return fase.id === faseID;
            })
            .reduce(function(acc, currValue){
                return acc.concat(currValue.partes);
            }, [])
            .filter(function(parte){
                return parte.statusParte === "aposta";
            })
            .length;

        var qtdAberto = campeonato.fases
            .filter(function(fase){
                return fase.id === faseID;
            })
            .reduce(function(acc, currValue){
                return acc.concat(currValue.partes);
            }, [])
            .filter(function(parte){
                return parte.statusParte === "aberto";
            })
            .length;

        var qtdFinalizado = campeonato.fases
            .filter(function(fase){
                return fase.id === faseID;
            })
            .reduce(function(acc, currValue){
                return acc.concat(currValue.partes);
            }, [])
            .filter(function(parte){
                return parte.statusParte === "finalizado";
            })
            .length;

        var totalPartes = qtdAposta+ qtdAberto + qtdFinalizado;


        var parteAberta = campeonato.fases
            .filter(function(fase){
                return fase.id === faseID;
            })
            .reduce(function(acc, currValue){
                return acc.concat(currValue.partes);
            }, [])
            .filter(function(parte){
                return parte.statusParte === "aposta";
            });

        if(qtdFinalizado === totalPartes){ 
            return(
                <div className="dashboard-statusFase -finalizado">
                    <p>
                        Campeonato finalizado
                    </p>
                </div>
            );

        }else if(qtdAposta > 0){
            return(
                <div className="dashboard-statusFase">
                    <Link
                        to={"/"+parteAberta[0].id+"/apostar"}
                    >
                        Aposte: {parteAberta[0].nomeParte}
                    </Link>
                </div>
            );
        }else{
            return(
                <div className="dashboard-statusFase -aberto">
                    <p>
                        Campeonato em andamento
                    </p>
                </div>
            );
        }
    }

    checkFaseName(){
        const faseID = this.props.match.params.fase;

        const fase = this.state.campeonato.fases
            .filter((fase) => fase.id === faseID);

        return fase[0] ? fase[0].nomeFase : '';
    }

    showNextFixtures(){
        if(this.state.fixtures){
            var qtdNextFixtures = this.state.fixtures
                .filter(function(fixture){
                    return fixture.home_score === null;
                })
                .filter(function(fixture){
                    return fixture.away_score === null;
                })
                .slice(0, 5)
                .length;

            if(qtdNextFixtures > 0){
                return(
                    this.state.fixtures
                    .filter(function(fixture){
                        return fixture.home_score === null;
                    })
                    .filter(function(fixture){
                        return fixture.away_score === null;
                    })
                    .slice(0, 5)
                    .map(function(team, index){
                        return(
            
                            <PartidaListItem
                                key={index}
                                team={team} 
                                typeAll={"ReadOnly"}
                                link={this.props.match.params}
                            />
                            
                        );
                    }, this)
                );
            }else{
                return(
                    <div className="errorMessage">
                        <p>Não há próximos jogos</p>
                    </div>
                );
            }
            
        }
    }

    showLastFixtures(){
        if(this.state.fixtures){
            var qtdLastFixtures = this.state.fixtures
                .filter(function(fixture){
                    return fixture.home_score !== null;
                })
                .filter(function(fixture){
                    return fixture.away_score !== null;
                })
                .reverse()
                .slice(0, 5)
                .length;
            
            if(qtdLastFixtures > 0){
                return(
                    this.state.fixtures
                    .filter(function(fixture){
                        return fixture.home_score !== null;
                    })
                    .filter(function(fixture){
                        return fixture.away_score !== null;
                    })
                    .reverse()
                    .slice(0, 5)
                    .map(function(team, index){
                        return(

                            <PartidaListItem
                                key={index}
                                team={team} 
                                typeAll={"ReadOnly"}
                                link={this.props.match.params}
                            />
                            
                        );
                    }, this)
                );
            }else{
                return(
                    <div className="errorMessage">
                        <p>Ainda não há jogos finalizados</p>
                    </div>
                );
            }
            
        }
    }

    showRank(){
        if(this.state.rank){
            var lastPoints = -1;
            var rankPosition = 0;

            return(

                this.state.rank
                .map(function(rank, index){
                    if(lastPoints !== rank.points){
                        rankPosition = rankPosition + 1;
                        lastPoints = rank.points;
                        return(
                            <RankListItem 
                                key={index}
                                rank={rank}
                                position={rankPosition} 
                                link={this.props.match.params}
                            />
                        );
                    }else{
                        lastPoints = rank.points;
                        return(
                            <RankListItem 
                                key={index}
                                rank={rank}
                                position={rankPosition}
                                positionIgual={true}
                                link={this.props.match.params}
                            />
                        );
                    }
                    
                }, this)
            );
        }else{
            return <tr></tr>
        }
    }

    render() {
        return (
            <section className="main-container">
                <div className="main-dashboard">

                    <div className="dashbord-top">
                        <h2>{this.state.campeonato?this.state.campeonato.nomeCampeonato:""}</h2>
                        <h4>{this.state.campeonato?this.checkFaseName():""}</h4>

                        <Loading loading={this.state.loading}/>
                    </div>

                    <div>
                        <div className="dashboard-main">

                            <div className="main-partidaForm">
                                <table className="rankTable">
                                    <caption>
                                        <h3 className="pageTitle">Rank</h3>
                                        {this.state.campeonato?this.checkStatus():""}
                                    </caption>
                                    <thead>
                                        <tr>
                                            <td className="positionColumn">#</td>
                                            <td className="nameColumn">Nome</td>
                                            <td className="pointsColumn">Pontos</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showRank()}
                                    </tbody>
                                </table>
                                
                            </div>
                        
                        </div>

                        <div className="dashboard-aside">

                            <div className="main-partidaForm">
                                <ul className="partidaLista">
                                    <h3 className="pageTitle">Próximos Jogos</h3>
                                    <Link className="allFixturesLink" to={"../"+this.props.match.params.fase+"/jogos"}>Todos &gt;</Link>
                                    
                                    
                                    {this.showNextFixtures()}

                                </ul>
                                
                            </div>

                            <div className="main-partidaForm">

                                <ul className="partidaLista">
                                    <h3 className="pageTitle">Últimos Jogos</h3>
                                    <Link className="allFixturesLink" to={"../"+this.props.match.params.fase+"/jogos"}>Todos &gt;</Link>
                                    

                                    {this.showLastFixtures()}

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