import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/pages/pageInside.css';

import Loading from '../util/Loading';
import PartidaListItem from '../util/PartidaListItem';

import Avatar from '../../imgs/avatar.png';


class PageApostar extends Component {
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
                //     "idfixture": "2",
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
                //     "idfixture": "2",
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
            // userImage: null, 
            // campeonato: 'Copa do Mundo 2018',
            // fase: 'Eliminatórias'
        };
    }

    componentDidMount(){
        this.setState({loading: true});

        // var campeonatoID = this.props.match.params.campeonato;
        var faseID = this.props.match.params.fase;
        var userName = this.props.match.params.nome;
        
        // Fixtures
        var textJSON = `{
            "faseID":"${faseID}",
            "userName":"${userName}"
        }`;
        var textJSON2 = JSON.parse(textJSON);
        var dataString = JSON.stringify(textJSON2);

        $.ajax({
            url:"../../rest-api/getBetsFromUser.php",
            type: 'post',
            data: dataString,
            dataType: 'json',
            success: function(resposta){
                this.setState({
                    loading: false,
                    fixtures: resposta.fixtures,
                    userImage: resposta.userImage,
                    campeonato: resposta.campeonato,
                    fase: resposta.fase
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                console.log(JSON.parse(xhr.responseText).message);
                this.setState({loading: false});
                // this.setState({error: JSON.parse(xhr.responseText).message});
            }.bind(this)
        });
    }
    
    render() {
        return (
            <section className="main-container">
                <div className="main-content">
                
                    <div className="main-partidaForm" >

                        <div className="userImage-container">
                            <div className="userImage">
                                <img src={this.state.userImage?
                                    this.state.userImage
                                    :Avatar}
                                    alt="Avatar do usuário"/>
                            </div>
                        </div>


                        <ul className="partidaLista -apostado">
                            <h3 className="pageTitle">
                                {this.props.match.params.nome}

                                <br />
                                <span className="subTitle">
                                    {this.state.campeonato?this.state.campeonato:""}
                                    
                                    {this.state.fase?" - "+this.state.fase:""}
                                </span>
                            </h3>
                            <Loading loading={this.state.loading}/>
                            {
                            this.state.fixtures.map(function(team, index){
                                return(

                                    <PartidaListItem 
                                        key={index} 
                                        team={team} 
                                        typeAll={"ReadOnly"}
                                        link={this.props.match.params}
                                    />
                                    
                                );
                            }, this)
                            }

                        </ul>

                    </div>

                    {/*this.AJAXresp()*/}
                </div>
            </section>      
        );
    }
}

export default PageApostar;