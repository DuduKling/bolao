import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/pages/pageInside.css';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';


class PageApostar extends Component {
	constructor() {
        super();
        this.state = {Fixtures: [
            {
                "idfixture": "1",
                "datetime": "Date Time",
                "local": "Russia",
                "home_score": "",
                "away_score": "",
                "home_team_name": "Time 1",
                "home_path": "",
                "away_team_name": "Time 2",
                "away_path": ""
            },
            {
                "idfixture": "2",
                "datetime": "Date Time",
                "local": "Russia",
                "home_score": "",
                "away_score": "",
                "home_team_name": "Time 1",
                "home_path": "",
                "away_team_name": "Time 2",
                "away_path": ""
			},
            {
                "idfixture": "2",
                "datetime": "Date Time",
                "local": "Russia",
                "home_score": "",
                "away_score": "",
                "home_team_name": "Time 1",
                "home_path": "",
                "away_team_name": "Time 2",
                "away_path": ""
			},
            {
                "idfixture": "2",
                "datetime": "Date Time",
                "local": "Russia",
                "home_score": "",
                "away_score": "",
                "home_team_name": "Time 1",
                "home_path": "",
                "away_team_name": "Time 2",
                "away_path": ""
			},
            {
                "idfixture": "2",
                "datetime": "Date Time",
                "local": "Russia",
                "home_score": "",
                "away_score": "",
                "home_team_name": "Time 1",
                "home_path": "",
                "away_team_name": "Time 2",
                "away_path": ""
			}
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
            <section className="main-container">
                <div className="main-content">
                
                    <form 
                        className="main-partidaForm" 
                        onSubmit={function(event){this.enviaAposta(event, this.state)}.bind(this)} 
                        method="post"
                    >

                        <ul className="partidaLista">
                            <h3 className="pageTitle">Faça seu palpite</h3>
                            <Loading loading={this.state.loading}/>
                            {
                            this.state.Fixtures.map(function(team, index){
                                return(

                                    <PartidaListItem 
                                        key={index}
                                        team={team} 
                                        />
                                    
                                );
                            }, this)
                            }

                        </ul>
                        
                        <div className="EnviarAposta">
                            <input type="submit" className="SendButton" value="Enviar" />
                            <Loading loading={this.state.loading2}/>
                        </div>

                    </form>

                    {this.AJAXresp()}
                </div>
            </section>      
        );
    }
}

export default PageApostar;