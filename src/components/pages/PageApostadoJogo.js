import React, { Component } from 'react';
import '../../css/pages/pageInside.css';
import $ from 'jquery';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

class PageApostadoJogo extends Component {
    constructor() {
        super();
        this.state = {
            fixtures: [
                // {
                //     "usernames": "Nome completo 1234,Nome completo 2,Nome,Nome completo 4",
                //     "idfixture": "1",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "0",
                //     "away_score": "0",
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": "",
                //     "porcentagem": "3"
                // },
                // {
                //     "usernames": "Nome completo 4,Nome completo 3,Nome completo 2,Nome completo 1",
                //     "idfixture": "2",
                //     "datetime": "Date Time",
                //     "local": "Russia",
                //     "home_score": "3",
                //     "away_score": "2",
                //     "home_team_name": "Time 1",
                //     "home_path": "",
                //     "away_team_name": "Time 2",
                //     "away_path": "",
                //     "porcentagem": "3,11"
                // }
            ]
        };
    }

    componentDidMount(){
        this.setState({loadingFixture: true});
        this.setState({loadingRank: true});

        var fixtureID = this.props.match.params.fixture;


        // Fixtures
        var textJSON = `{
            "fixtureID":"${fixtureID}"
        }`;
        var textJSON2 = JSON.parse(textJSON);
        var dataString = JSON.stringify(textJSON2);

        $.ajax({
            url:"../../rest-api/getBetsFromFixture.php",
            type: 'post',
            data: dataString,
            dataType: 'json',
            success: function(resposta){
                this.setState({
                    loadingFixture: false,
                    fixtures: resposta.fixtures
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                // console.log(JSON.parse(xhr.responseText));
                this.setState({loadingFixture: false});
                this.setState({error: JSON.parse(xhr.responseText).message});
            }.bind(this)
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
                            <h3 className="pageTitle">Apostas para este jogo</h3>
                            <Loading loading={this.state.loading}/>
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