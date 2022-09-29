import React, { Component } from 'react';
import '../../css/pages/pageInside.css';

import http from '../../util/http';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

class PageApostadoJogo extends Component {
    constructor() {
        super();
        this.state = {
            fixtures: [
                // {
                //     "usernames": "Nome completo 1234,Nome completo 2,Nome,Nome completo 4,Nome completo 1234,Nome completo 2,Nome,Nome completo 4",
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "0",
                //     "away_score": "0",
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": "",
                //     "porcentagem": "3",
                //     "frontID": "1"
                // },
                // {
                //     "usernames": "Nome completo 4,Nome completo 3,Nome completo 2,Nome completo 1",
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "3",
                //     "away_score": "2",
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": "",
                //     "porcentagem": "3,11",
                //     "frontID": "2"
                // }
            ]
        };
    }

    componentWillMount(){
        var fixtureID = this.props.match.params.fixture;
        var faseID = this.props.match.params.fase;

        const cachedFixtures = localStorage.getItem(faseID+fixtureID+'campeonatoJogo');
        if(cachedFixtures){
            this.setState({
                fixtures: JSON.parse(cachedFixtures)
            });
        }
    }

    async componentDidMount(){
        this.setState({ loading: true });

        const fixtureID = this.props.match.params.fixture;
        const faseID = this.props.match.params.fase;

        const dataString = JSON.stringify({
            fixtureID
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/bets/getBetsFromFixture.php`,
            data: dataString,
            thenCallback: (response) => {
                this.setState({
                    loading: false,
                    fixtures: response.fixtures
                });

                localStorage.setItem(faseID+fixtureID+'campeonatoJogo', JSON.stringify(response.fixtures));
            },
            catchCallback: ({ message }) => {
                this.setState({ loading: false });
                this.setState({ error: message });
            }
        });
    }

    render() {
        return (
            <section className="main-container">
                <div className="main-content">
                
                    <form 
                        className="main-partidaForm" 
                        onSubmit={function(event){this.enviaAposta(event, this.state)}.bind(this)} 
                        method="post"
                    >

                        <ul className="partidaLista">
                            <h3 className="pageTitle">
                                Apostas para este jogo
                                <Loading loading={this.state.loading} localstorage="-withLocalStorage2"/>
                            </h3>
                            {
                            this.state.fixtures.map(function(team, index){
                                return(

                                    <PartidaListItem 
                                        key={index}
                                        team={team} 
                                        typeAll={"ReadOnly"}
                                        users={true}
                                        porcent={true}
                                    />
                                    
                                );
                            }, this)
                            }

                        </ul>
                        
                    </form>

                </div>
            </section>
        );
    }
}

export default PageApostadoJogo;