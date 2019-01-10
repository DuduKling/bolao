import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/pages/pageInside.css';
import '../../css/util/formMessage.css';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

class PageAdminScore extends Component {
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
                //     "idfixture": "3",
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
                //     "idfixture": "4",
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
                //     "idfixture": "5",
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
            error: '', 
            resp: '',
            campeonato: '',
            fase: '',
            parte: ''
        };
    }

    enviaResultado(evento) {
        evento.preventDefault();
        // console.log("enviando..")
        this.setState({error: ''});
        this.setState({resp: ''});

        var data = {};
        $("input[type='text']").each(function(index, item){
            var val = $(item).val();
            var name = $(item).attr('name');

            data[name] = val;
        });

        // console.log(data);
        var dataString = JSON.stringify(data);
        // console.log("dataString:");
        // console.log(dataString);

        this.setState({loading2: true});

        $.ajax({
            url:"../rest-api/postResult.php",
			type: 'post',
            data: dataString,
            dataType: "json",
            success: function(resposta){
                // console.log("Resposta PHP:");
                // console.log(resposta);
                this.setState({
                    resp: resposta.message,
                    // fixtures: resposta.fixtures,
                    loading2: false
                });
                this.getFixtures();
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                this.setState({
                    error: JSON.parse(xhr.responseText).message,
                    loading2: false
                });
            }.bind(this)
        });
    }

    componentDidMount() {
        this.getFixtures();
    }
    
    getFixtures(){
        this.setState({loading: true});

        var parteId = this.props.match.params.parte;

        var textJSON = `{
            "parteId":"${parteId}",
            "status":"aberto"
        }`;
        var textJSON2 = JSON.parse(textJSON);
        var dataString = JSON.stringify(textJSON2);

        $.ajax({
            url:"../rest-api/getFixtures.php",
            type: 'post',
            data: dataString,
            dataType: 'json',
            success: function(resposta){
                this.setState({
                    fixtures: resposta.fixtures,
                    campeonato: resposta.campeonato,
                    fase: resposta.fase,
                    parte: resposta.parte
                });
                this.setState({loading: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                // console.log(JSON.parse(xhr.responseText));
                this.setState({
                    loading: false,
                    error: JSON.parse(xhr.responseText).message,
                });
            }.bind(this)
        });
    }

    AJAXresp(){
        if(this.state.error === '' && this.state.resp === ''){
            return '';

        }else if (this.state.resp !== ''){
            return (
                <div className="message">
                    <p className="FormMessage -success">
                        {this.state.resp}
                    </p>
                </div>
            );

        }else if (this.state.error !== ''){
            return (
                <div className="message">
                    <p className="FormMessage -error">
                        {this.state.error}
                    </p>
                </div>
            );
        }
    }

    showButton(){
        if(Object.keys(this.state.fixtures).length !== 0){
            return(
                <div className="EnviarAposta">
                    <input type="submit" className="SendButton" value="Enviar" />
                    <Loading loading={this.state.loading2}/>
                </div>
            );
        }
    }
    
    render() {
        return (
            <section className="main-container">
                <div className="main-content">
                
                    <form 
                        className="main-partidaForm" 
                        onSubmit={function(event){this.enviaResultado(event)}.bind(this)} 
                        method="post"
                    >
                    
                        <ul className="partidaLista -admin">
                            <h3 className="pageTitle">
                                administrador
                                <br />
                                <span className="subTitle">
                                    {this.state.campeonato?
                                        this.state.campeonato+" - "
                                        :""}
                                    {this.state.fase}
                                    {this.state.parte?
                                        " / "+this.state.parte
                                        :""}
                                </span>
                            </h3>
                            <Loading loading={this.state.loading}/>
                            {
                            this.state.fixtures.map(function(team, index){
                                return(

                                    <PartidaListItem 
                                        key={index}
                                        team={team} 
                                        typeAll={""} 
                                        isAdmin={"admin"}
                                    />
                                    
                                );
                            }, this)
                            }

                        </ul>
                        
                        {this.showButton()}

                        </form>
                    
                    {this.AJAXresp()}
                </div>
            </section>      
        );
    }
}

export default PageAdminScore;