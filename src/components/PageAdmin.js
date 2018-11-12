import React, { Component } from 'react';
import $ from 'jquery';

import SiteHeader from './common/SiteHeader';
import SiteFooter from './common/SiteFooter';
import Loading from './Loading';
// import GamesList from './GamesList';

import Flag_of_Argentina from'../flags/Flag_of_Argentina.svg';
import Flag_of_Australia from'../flags/Flag_of_Australia.svg';
import Flag_of_Belgium from'../flags/Flag_of_Belgium.svg';
import Flag_of_Brazil from'../flags/Flag_of_Brazil.svg';
import Flag_of_Colombia from'../flags/Flag_of_Colombia.svg';
import Flag_of_Costa_Rica from'../flags/Flag_of_Costa_Rica.svg';
import Flag_of_Croatia from'../flags/Flag_of_Croatia.svg';
import Flag_of_Denmark from'../flags/Flag_of_Denmark.svg';
import Flag_of_Egypt from'../flags/Flag_of_Egypt.svg';
import Flag_of_England from'../flags/Flag_of_England.svg';
import Flag_of_France from'../flags/Flag_of_France.svg';
import Flag_of_Germany from'../flags/Flag_of_Germany.svg';
import Flag_of_Iceland from'../flags/Flag_of_Iceland.svg';
import Flag_of_Iran from'../flags/Flag_of_Iran.svg';
import Flag_of_Japan from'../flags/Flag_of_Japan.svg';
import Flag_of_Mexico from'../flags/Flag_of_Mexico.svg';
import Flag_of_Morocco from'../flags/Flag_of_Morocco.svg';
import Flag_of_Nigeria from'../flags/Flag_of_Nigeria.svg';
import Flag_of_Panama from'../flags/Flag_of_Panama.svg';
import Flag_of_Peru from'../flags/Flag_of_Peru.svg';
import Flag_of_Poland from'../flags/Flag_of_Poland.svg';
import Flag_of_Portugal from'../flags/Flag_of_Portugal.svg';
import Flag_of_Russia from'../flags/Flag_of_Russia.svg';
import Flag_of_Saudi_Arabia from'../flags/Flag_of_Saudi_Arabia.svg';
import Flag_of_Senegal from'../flags/Flag_of_Senegal.svg';
import Flag_of_Serbia from'../flags/Flag_of_Serbia.svg';
import Flag_of_South_Korea from'../flags/Flag_of_South_Korea.svg';
import Flag_of_Spain from'../flags/Flag_of_Spain.svg';
import Flag_of_Sweden from'../flags/Flag_of_Sweden.svg';
import Flag_of_Switzerland from'../flags/Flag_of_Switzerland.svg';
import Flag_of_Tunisia from'../flags/Flag_of_Tunisia.svg';
import Flag_of_Uruguay from'../flags/Flag_of_Uruguay.svg';
import default_flag from'../imgs/default_flag.png';

class PageAdmin extends Component {
	constructor() {
        super();
        this.state = {Fixtures: [
            // {
            //     "idfixture": "1",
            //     "datetime": "Date Time",
            //     "local": "Russia",
            //     "home_score": null,
            //     "away_score": "3",
            //     "home_team_name": "Time 1",
            //     "home_path": "default_flag",
            //     "away_team_name": "Time 2",
            //     "away_path": "default_flag"
            // },
            // {
            //     "idfixture": "22222",
            //     "datetime": "Date Time",
            //     "local": "Russia",
            //     "home_score": "2",
            //     "away_score": null,
            //     "home_team_name": "Time 1",
            //     "home_path": "default_flag",
            //     "away_team_name": "Time 2",
            //     "away_path": "default_flag"
            // }
        ], 
        nome: '', error: '', resp: ''};
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        const inputValue = event.target.value;
        this.setState({
            [name]: inputValue
        });
        // console.log(this.state);

        let regx  = new RegExp('^[0-9]{0,2}$', 'gi');
        let resultado = regx.test(inputValue);

        if(!resultado){
            event.target.classList.add("error");
        }else{
            event.target.classList.remove("error");
        }
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
        var dataString = "fase="+this.props.match.params.fase;

        this.setState({loading: true});

        $.ajax({
            url:"../php/getFixtures.php",
            type: 'post',
            data: dataString,
            dataType: 'json',
            success: function(resposta){
                this.setState({loading: false});
                this.setState({Fixtures: resposta});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    InputOrNumber_home(idfixture, score){
        if (score == null){
            return (
                <div>
                    <input type="text" placeholder="X" name={idfixture+"_home"} onChange={this.handleInputChange} maxLength="2" pattern="^[0-9]{0,2}$" />
                    <label></label>
                </div>
            );
        } else {
            return (
                <p className="plac-num1">{score}</p>
            );
        }
    }

    InputOrNumber_away(idfixture, score){
        if (score == null){
            return (
                <div>
                    <input type="text" placeholder="X" name={idfixture+"_away"} onChange={this.handleInputChange} maxLength="2" pattern="^[0-9]{0,2}$" />
                    <label></label>
                </div>
            );
        } else {
            return (
                <p className="plac-num2">{score}</p>
            );
        }
    }

	enviaAposta(evento, state) {
        evento.preventDefault();
        // console.log("enviando..")
        this.setState({error: ''});
        this.setState({resp: ''});

        var dataString = "";
        var i = 0;
        for (var key in state) {
            switch (key){
                case 'Fixtures':
                case 'nome':
                case 'loading':
                case 'loading2':
                case 'error':
                case 'resp':
                    break;
                default:
                    if(state[key] !== '') {
                        if(i===0){
                            dataString += key + "=" + state[key];
                        }else{
                            dataString += "&" + key + "=" + state[key];
                        }
                        i++;
                    }
            }

            // if(key!=='Fixtures') {
            //     if(key!=='nome') {
            //         if(key!=='loading') {
            //             if(key!=='error') {
            //                 if(key!=='resp') {
            //                     if(key!=='loading2') {
            //                         if(state[key] !== '') {
            //                             if(i===0){
            //                                 dataString += key + "=" + state[key];
            //                             }else{
            //                                 dataString += "&" + key + "=" + state[key];
            //                             }
            //                             i++;
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }
        }

        // console.log("dataString:");
        // console.log(dataString);

        var dataString1 = "fase="+this.props.match.params.fase;
        this.setState({loading2: true});
        
		$.ajax({
            url:"../php/postFixturesScores.php",
			type: 'post',
            data: dataString,
            dataType: "html",
            success: function(resposta){
                // console.log("Resposta PHP:");
                // console.log(resposta);
                this.setState({resp: resposta});

                $.ajax({
                    url:"../php/getFixtures.php",
                    type: 'post',
                    data: dataString1,
                    dataType: 'json',
                    success: function(resp){
                        this.setState({Fixtures: resp});
                    }.bind(this),
                    error: function(xhr, status, err){
                        // console.error(status, err.toString());
                        this.setState({error: err.toString()});
                    }
                });
                this.setState({loading2: false});
            }.bind(this),
            error: function(xhr, status, err){
                // console.error(status, err.toString());
                this.setState({loading2: false});
                this.setState({error: err.toString()});
                // this.setState({error: "Oops, ocorreu um erro. \n Tente novamente."});
            }.bind(this),
        });
    }

    // showError(){
    //     if (this.state.error != null){
    //         return (
    //             <div className="Error">{this.state.error}</div>
    //         );
    //     }
    // }

    AJAXresp(){
        if (this.state.error === '' && this.state.resp === '') {
            return '';
        } else if (this.state.resp.substring(0, 8)==='Success:'){
            let resposta = this.state.resp.slice(9, this.state.resp.length);
            return (<div className="Success"><p>{resposta}</p></div>);
        } else if(this.state.resp !== '') {
            return (<div className="Error"><p>{this.state.resp}</p></div>);
        } else {
            return (<div className="Error"><p>Oops! Desculpe, ocorreu um erro. <span>ERROR: {this.state.error}</span></p></div>);
        }
    }

    render() {
        return (
			<div className="home">

                <SiteHeader />
                
				<section className="complete-content">
					<div className="complete-games-container">
						<form onSubmit={function(event){this.enviaAposta(event, this.state)}.bind(this)} method="post">
							<ul className="games">
                                <h3>Cadastro de Resultados</h3>
                                
                                <Loading loading={this.state.loading}/>

                                {
                                this.state.Fixtures.map(function(team, index){
                                    return(
                                        <li key={index}>
                                            <p className="info">
                                                {team.datetime} | {team.local}
                                            </p>

                                            <div className="jogo">
                                                <div className="time -Home">
                                                    <p>{team.home_team_name}</p>
                                                    <div>
                                                        <img src={this.testImg(team.home_path)} alt={team.home_team_name} />
                                                    </div>
                                                </div>

                                                <span className="placar">

                                                    {this.InputOrNumber_home(team.idfixture, team.home_score)}
                                                
                                                    <p className="x">X</p>

                                                    {this.InputOrNumber_away(team.idfixture, team.away_score)}

                                                </span>
                                                
                                                <div className="time -Away">
                                                    <p>{team.away_team_name}</p>
                                                    <div>
                                                        <img src={this.testImg(team.away_path)} alt={team.away_team_name}  />
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                }, this)
                                }
							</ul>
							
                            <div className="EnviarAposta">
                                <input type="submit" className="SendButton" value="Enviar" />
                                <Loading loading={this.state.loading2}/>
							</div>
                        </form>
                        
                        {/*this.showError()*/}
                        {this.AJAXresp()}
                    </div>
                    
				</section>

				<SiteFooter />

			</div>        
        );
    }
}

export default PageAdmin;