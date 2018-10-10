import React, { Component } from 'react';
import $ from 'jquery';

import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
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

class PageApostar extends Component {
	constructor() {
        super();
        this.state = {Fixtures: [
            // {
            //     "idfixture": "1",
            //     "datetime": "Date Time",
            //     "local": "Russia",
            //     "home_score": "",
            //     "away_score": "",
            //     "home_team_name": "Time 1",
            //     "home_path": "default_flag",
            //     "away_team_name": "Time 2",
            //     "away_path": "default_flag"
            // },
            // {
            //     "idfixture": "2",
            //     "datetime": "Date Time",
            //     "local": "Russia",
            //     "home_score": "",
            //     "away_score": "",
            //     "home_team_name": "Time 1",
            //     "home_path": "default_flag",
            //     "away_team_name": "Time 2",
            //     "away_path": "default_flag"
			// }
        ], nome: '', error: '', resp: ''};
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        const inputValue = event.target.value
        this.setState({
            [name]: inputValue
        });
        //console.log(name);
        // console.log(name.substring(0, 1));

        if (name==="nome"){
            let regx  = new RegExp('^[A-Za-z]+([ |\x20]{1}[A-Za-z]+)?$', 'gi');
            let resultado = regx.test(inputValue);

            if(!resultado){
                this.setState({
                    error_nome: "error"
                    // ["error_"+name]: "error"
                });
            }else{
                this.setState({
                    error_nome: ""
                });
            }
        } else {
            let regx  = new RegExp('^[0-9]{1,2}$', 'gi');
            let resultado = regx.test(inputValue);

            if(!resultado){
                event.target.classList.add("error");
                // this.setState({
                //     // [name]: [inputValue, "error"]
                // });
                // console.log(name+"_error");
            }else{
                event.target.classList.remove("error");
                // this.setState({
                //     // [name]: [inputValue, ""]
                // });
            }
        }
        
        // console.log(this.state);
        // console.log(this.state.Fixtures);
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
        var dataString = "fase="+this.props.match.params.fase+"&apostar=1";

        this.setState({loading: true});

        $.ajax({
            url:"../php/getFixtures.php",
            type: 'post',
            data: dataString,
            dataType: 'json',
            success: function(resposta){
                this.setState({Fixtures: resposta});
                this.setState({loading: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
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
                case 'error':
                case 'resp':
                case 'loading':
                case 'loading2':
                case 'error_nome':
                    break;
                default:
                    if(state[key] !== '') {
                        if(i===0) {
                            dataString += key + "=" + state[key]
                        } else {
                            dataString += "&" + key + "=" + state[key]
                        }
                        i++;
                    }
            }
        }

        // console.log("dataString:");
        // console.log(dataString);

        this.setState({loading2: true});

        $.ajax({
            url:"../php/postBets.php",
			type: 'post',
            data: dataString,
            dataType: "html",
            success: function(resposta){
                // console.log("Resposta PHP:");
                // console.log(resposta);
                this.setState({resp: resposta});
                this.setState({loading2: false});
            }.bind(this),
            error: function(xhr, status, err){
                // console.error(status, err.toString());
                this.setState({loading2: false});
                this.setState({error: err.toString()});
            }.bind(this)
        });

        // if (this.state.resp.substring(0, 8)==='Success:'){
        //     evento.target.reset();
        // }
    }
    
    inputNotEmpty(){
        if (this.state.nome === '') {
            return '';
        }else {
            return 'NotEmpty';
        }
    }

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
								<h3>Aposte</h3>
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
                                                    
                                                        <div>
                                                            <input  type="text" placeholder="X" name={team.idfixture+"_home"} onChange={this.handleInputChange} required="required" maxLength="2" pattern="^[0-9]{1,2}$" />
                                                            <label></label>
                                                        </div>
                                                    
                                                        <p className="x">X</p>

                                                        <div>
                                                            <input type="text" placeholder="X" name={team.idfixture+"_away"} onChange={this.handleInputChange} required="required" maxLength="2" pattern="^[0-9]{1,2}$"/>
                                                            <label></label>
                                                        </div>

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
                                <div className="material-input">
                                    <input type="text" id={this.state.error_nome} placeholder="" name="nome" maxLength="30" pattern="^[A-Za-z]+([ |\x20]{1}[A-Za-z]+)?$" onChange={this.handleInputChange} required="required"/>
                                    <label htmlFor="Name" className={this.inputNotEmpty()}>Nome</label>
                                </div>
                                <p className="aposta_obs">* Favor, mantenha o mesmo nome utilizado na aposta anterior, para que sua pontuação seja corretamente atribuída nas fases seguintes.</p>
                                <input type="submit" className="SendButton" value="Enviar" />
                                <Loading loading={this.state.loading2}/>
							</div>
                        </form>
                        {this.AJAXresp()}
					</div>
				</section>

				<SiteFooter />

			</div>        
        );
    }
}

export default PageApostar;