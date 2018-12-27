import React, { Component } from 'react';
import $ from 'jquery';

import SiteHeader from './common/SiteHeader';
import SiteFooter from './common/SiteFooter';
import GamesList from './GamesList';
import Loading from './Loading';

import Flag_of_Argentina from '../flags/Flag_of_Argentina.svg';
import Flag_of_Australia from '../flags/Flag_of_Australia.svg';
import Flag_of_Belgium from '../flags/Flag_of_Belgium.svg';
import Flag_of_Brazil from '../flags/Flag_of_Brazil.svg';
import Flag_of_Colombia from '../flags/Flag_of_Colombia.svg';
import Flag_of_Costa_Rica from '../flags/Flag_of_Costa_Rica.svg';
import Flag_of_Croatia from '../flags/Flag_of_Croatia.svg';
import Flag_of_Denmark from '../flags/Flag_of_Denmark.svg';
import Flag_of_Egypt from '../flags/Flag_of_Egypt.svg';
import Flag_of_England from '../flags/Flag_of_England.svg';
import Flag_of_France from '../flags/Flag_of_France.svg';
import Flag_of_Germany from '../flags/Flag_of_Germany.svg';
import Flag_of_Iceland from '../flags/Flag_of_Iceland.svg';
import Flag_of_Iran from '../flags/Flag_of_Iran.svg';
import Flag_of_Japan from '../flags/Flag_of_Japan.svg';
import Flag_of_Mexico from '../flags/Flag_of_Mexico.svg';
import Flag_of_Morocco from '../flags/Flag_of_Morocco.svg';
import Flag_of_Nigeria from '../flags/Flag_of_Nigeria.svg';
import Flag_of_Panama from '../flags/Flag_of_Panama.svg';
import Flag_of_Peru from '../flags/Flag_of_Peru.svg';
import Flag_of_Poland from '../flags/Flag_of_Poland.svg';
import Flag_of_Portugal from '../flags/Flag_of_Portugal.svg';
import Flag_of_Russia from '../flags/Flag_of_Russia.svg';
import Flag_of_Saudi_Arabia from '../flags/Flag_of_Saudi_Arabia.svg';
import Flag_of_Senegal from '../flags/Flag_of_Senegal.svg';
import Flag_of_Serbia from '../flags/Flag_of_Serbia.svg';
import Flag_of_South_Korea from '../flags/Flag_of_South_Korea.svg';
import Flag_of_Spain from '../flags/Flag_of_Spain.svg';
import Flag_of_Sweden from '../flags/Flag_of_Sweden.svg';
import Flag_of_Switzerland from '../flags/Flag_of_Switzerland.svg';
import Flag_of_Tunisia from '../flags/Flag_of_Tunisia.svg';
import Flag_of_Uruguay from '../flags/Flag_of_Uruguay.svg';
import default_flag from '../imgs/default_flag.png';

class PageApostado extends Component {
    constructor() {
        super();
        this.state = {Fixtures: [
            // {
            //     "usernames": "Nome completo 1234,Nome completo 2,Nome,Nome completo 4",
            //     "idfixture": "1",
            //     "datetime": "Date Time",
            //     "local": "Russia",
            //     "bet_score_home": "0",
            //     "bet_score_away": "0",
            //     "home_team": "Time 1",
            //     "home_path": "",
            //     "away_team": "Time 2",
            //     "away_path": "",
            //     "porcentagem": "3"
            // },
            // {
            //     "usernames": "Nome completo 4,Nome completo 3,Nome completo 2,Nome completo 1",
            //     "idfixture": "2",
            //     "datetime": "Date Time",
            //     "local": "Russia",
            //     "bet_score_home": "0",
            //     "bet_score_away": "0",
            //     "home_team": "Time 1",
            //     "home_path": "",
            //     "away_team": "Time 2",
            //     "away_path": "",
            //     "porcentagem": "3,11"
			// }
        ]};
    }

    testImg(file_name){
        switch(file_name){
            case "Flag_of_Argentina": 
                return Flag_of_Argentina
            case "Flag_of_Australia": 
                return Flag_of_Australia
            case "Flag_of_Belgium": 
                return Flag_of_Belgium
            case "Flag_of_Brazil": 
                return Flag_of_Brazil
            case "Flag_of_Colombia": 
                return Flag_of_Colombia
            case "Flag_of_Costa_Rica": 
                return Flag_of_Costa_Rica
            case "Flag_of_Croatia": 
                return Flag_of_Croatia
            case "Flag_of_Denmark": 
                return Flag_of_Denmark
            case "Flag_of_Egypt": 
                return Flag_of_Egypt
            case "Flag_of_England": 
                return Flag_of_England
            case "Flag_of_France": 
                return Flag_of_France
            case "Flag_of_Germany": 
                return Flag_of_Germany
            case "Flag_of_Iceland": 
                return Flag_of_Iceland
            case "Flag_of_Iran": 
                return Flag_of_Iran
            case "Flag_of_Japan": 
                return Flag_of_Japan
            case "Flag_of_Mexico": 
                return Flag_of_Mexico
            case "Flag_of_Morocco": 
                return Flag_of_Morocco
            case "Flag_of_Nigeria": 
                return Flag_of_Nigeria
            case "Flag_of_Panama": 
                return Flag_of_Panama
            case "Flag_of_Peru": 
                return Flag_of_Peru
            case "Flag_of_Poland": 
                return Flag_of_Poland
            case "Flag_of_Portugal": 
                return Flag_of_Portugal
            case "Flag_of_Russia": 
                return Flag_of_Russia
            case "Flag_of_Saudi_Arabia": 
                return Flag_of_Saudi_Arabia
            case "Flag_of_Senegal": 
                return Flag_of_Senegal
            case "Flag_of_Serbia": 
                return Flag_of_Serbia
            case "Flag_of_South_Korea": 
                return Flag_of_South_Korea
            case "Flag_of_Spain": 
                return Flag_of_Spain
            case "Flag_of_Sweden": 
                return Flag_of_Sweden
            case "Flag_of_Switzerland": 
                return Flag_of_Switzerland
            case "Flag_of_Tunisia": 
                return Flag_of_Tunisia
            case "Flag_of_Uruguay": 
                return Flag_of_Uruguay
            default:
                return default_flag
        }
    }

    componentDidMount() {
        var dataString = "fixture="+this.props.match.params.num_jogo+"&fase="+this.props.match.params.fase;
        // console.log(dataString);
        this.setState({loading: true});

        $.ajax({
            url:"../../php/getBetsJogo.php",
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
			<div className="home">

				<SiteHeader />

				<section className="complete-content">
					<div className="complete-games-container">
                        <div className="games-container">
                            <ul className="games">
                                <h3>Apostas para este jogo</h3>
                                <Loading loading={this.state.loading}/>
                                {
                                    this.state.Fixtures.map(function(team) {
                                        return (
                                            <GamesList 
                                            key={team.id}
                                            names={team.usernames}
                                            info={team.datetime} 
                                            local={team.local}
                                            home_team={team.home_team} home_score={team.bet_score_home}
                                            home_file={team.home_path} 
                                            away_team={team.away_team} 
                                            away_score={team.bet_score_away}
                                            away_file={team.away_path}
                                            porcent={team.porcentagem}
                                            />
                                        );
                                    })
                                }
                            </ul>
                        </div>
					</div>
				</section>

				<SiteFooter />

			</div>        
        );
    }
}

export default PageApostado;