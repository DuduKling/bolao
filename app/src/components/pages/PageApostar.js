import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/pages/pageInside.css';
import '../../css/util/formMessage.css';
import { connect } from 'react-redux';

import http from '../../util/http';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';


class PageApostar extends Component {
	constructor() {
        super();
        this.state = {
            fixtures: [
                // {
                //     "idfixture": "1",
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
                //     "idfixture": "2",
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
                //     "idfixture": "3",
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
            parte: '',
            redirectToCampeonatos: false
        };
    }

    async componentDidMount() {
        this.setState({ loading: true });

        const parteId = this.props.match.params.parte;
        const userId = this.props.userId;

        const dataString = JSON.stringify({
            parteId,
            userId,
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
                this.setState({ loading: false });
                this.setState({ error: message });
            }
        });
    }

	async enviaAposta(evento) {
        evento.preventDefault();

        this.setState({ error: '' });
        this.setState({ resp: '' });
        this.setState({ loading2: true });

        const data = {
            userId: this.props.userId
        };

        $("input[type='text']").each(function(index, item){
            const val = $(item).val();
            const name = $(item).attr('name');

            data[name] = val;
        });

        const dataString = JSON.stringify(data);

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/bets/makeBets.php`,
            data: dataString,
            thenCallback: (response) => {
                this.setState({ resp: response.message });
                this.setState({ loading2: false });
            },
            catchCallback: ({ message }) => {
                this.setState({ loading2: false });
                this.setState({ error: message });
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
                        onSubmit={async function(event){await this.enviaAposta(event)}.bind(this)} 
                        method="post"
                    >

                        <ul className="partidaLista">
                            <h3 className="pageTitle">
                                Aposte: {this.state.campeonato?this.state.campeonato:""}{this.state.fase?" - "+this.state.fase:""}{this.state.parte?"/"+this.state.parte:""}
                            </h3>
                            <Loading loading={this.state.loading}/>
                            {
                            this.state.fixtures.map(function(team, index){
                                return(

                                    <PartidaListItem 
                                        key={index}
                                        team={team} 
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

const mapStateToProps = store => ({
    userId: store.AuthJWTState.userID
});

export default connect(mapStateToProps)(PageApostar);