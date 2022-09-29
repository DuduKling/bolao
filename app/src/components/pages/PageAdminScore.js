import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/pages/pageInside.css';
import '../../css/util/formMessage.css';

import http from '../../util/http';

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

    async enviaResultado(evento) {
        evento.preventDefault();

        this.setState({ error: '' });
        this.setState({ resp: '' });
        this.setState({ loading2: true });

        const data = {};
        $("input[type='text']").each(function(index, item){
            const val = $(item).val();
            const name = $(item).attr('name');

            data[name] = val;
        });

        const dataString = JSON.stringify(data);

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/admin/postResult.php`,
            data: dataString,
            thenCallback: (response) => {
                this.setState({
                    resp: response.message,
                    loading2: false
                });

                this.getFixtures();
            },
            catchCallback: ({ message }) => {
                this.setState({
                    error: message,
                    loading2: false
                });
            }
        });
    }

    async componentDidMount() {
        await this.getFixtures();
    }
    
    async getFixtures(){
        this.setState({ loading: true });

        const parteId = this.props.match.params.parte;

        const dataString = JSON.stringify({
            parteId: parteId,
            status: 'aberto'
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/fixture/getFixtures.php`,
            data: dataString,
            thenCallback: (response) => {
                this.setState({
                    fixtures: response.fixtures,
                    campeonato: response.campeonato,
                    fase: response.fase,
                    parte: response.parte
                });

                this.setState({ loading: false });
            },
            catchCallback: ({ message }) => {
                this.setState({
                    error: message,
                    loading: false,
                });
            }
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
                        onSubmit={async function(event){await this.enviaResultado(event)}.bind(this)} 
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