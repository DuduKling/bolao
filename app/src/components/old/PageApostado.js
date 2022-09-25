import React, { Component } from 'react';
import $ from 'jquery';
import '../css/pages/pageInside.css';
import '../css/pages/pageApostado.css';
import '../css/util/partidaListItem.css';

import GamesList from './GamesList';
import Loading from '../components/util/Loading';



class PageApostado extends Component {
    constructor() {
        super();
        this.state = {Fixtures: [
            {
                "idfixture": "1",
                "datetime": "Date Time",
                "local": "Russia",
                "bet_score_home": "0",
                "bet_score_away": "0",
                "home_team": "Time 1",
                "home_path": "",
                "away_team": "Time 2",
                "away_path": "",
                "points": "3",
                "home_score": "5",
                "away_score": "0"
            },
            {
                "idfixture": "2",
                "datetime": "Date Time",
                "local": "Russia",
                "bet_score_home": "0",
                "bet_score_away": "0",
                "home_team": "Time 1",
                "home_path": "",
                "away_team": "Time 2",
                "away_path": "",
                // "points": "3"
                // "home_score": "5"
                // "away_score:": "0"
			}
        ]};
    }

    componentDidMount() {
        var dataString = "nome="+this.props.match.params.nome+"&fase="+this.props.match.params.fase;
        // console.log(dataString);
        this.setState({loading: true});

        $.ajax({
            url:"../../php/getBets.php",
            type: 'post',
            data: dataString,
            dataType: 'json',
            success: function(resposta){
                // console.log(resposta);
                this.setState({Fixtures: resposta});
                this.setState({loading: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    render() {
        return (
            <section className="main-container">
                <div className="main-content">

                    <ul className="partidaLista">

                        <h3 className="pageTitle">Apostado por <span className="name">{this.props.match.params.nome}</span></h3>
                        <Loading loading={this.state.loading}/>

                        {
                            this.state.Fixtures.map(function(team) {
                                return (

                                    <GamesList 
                                        key={team.id}
                                        team={team}

                                        link={true}

                                        num_jogo={team.idfixture}
                                        info={team.datetime} 
                                        local={team.local}
                                        home_team={team.home_team} 
                                        home_score={team.bet_score_home}
                                        home_file={team.home_path} 
                                        away_team={team.away_team}

                                        away_score={team.bet_score_away}
                                        away_file={team.away_path}

                                        final_home_score={team.home_score}
                                        final_away_score={team.away_score}
                                        points={team.points}
                                    />

                                );
                            })
                        }

                    </ul>
                </div>
            </section>    
        );
    }
}

export default PageApostado;