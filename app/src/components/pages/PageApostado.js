import React, { Component } from 'react';
import '../../css/pages/pageInside.css';

import http from '../../util/http';

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
                //     "away_path": "",
                //     "final_scoreHome": "1",
                //     "final_scoreAway": "0",
                //     "points": "3"
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
                //     "away_path": "",
                //     "final_scoreHome": "1",
                //     "final_scoreAway": "0",
                //     "points": "3"
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
                //     "away_path": "",
                //     "final_scoreHome": "1",
                //     "final_scoreAway": "0",
                //     "points": "3"
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
                //     "away_path": "",
                //     "final_scoreHome": "null",
                //     "final_scoreAway": null,
                //     "points": null
                // }
            ], 
            // userImage: null, 
            // campeonato: 'Copa do Mundo 2018',
            // fase: 'Eliminatórias'
        };
    }

    componentWillMount(){
        var userName = this.props.match.params.nome;
        var faseID = this.props.match.params.fase;

        const cachedFixtures = localStorage.getItem(userName+faseID+'fixtures');
        if(cachedFixtures){
            this.setState({
                fixtures: JSON.parse(cachedFixtures)
            });
        }
    }

    async componentDidMount(){
        this.setState({ loading: true });

        const faseID = this.props.match.params.fase;
        const userName = this.props.match.params.nome;

        const dataString = JSON.stringify({
            faseID,
            userName
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/bets/getBetsFromUser.php`,
            data: dataString,
            thenCallback: (response) => {
                this.setState({
                    loading: false,
                    fixtures: response.fixtures,
                    userImage: response.userImage,
                    campeonato: response.campeonato,
                    fase: response.fase
                });

                localStorage.setItem(userName+faseID+'fixtures', JSON.stringify(response.fixtures));
            },
            catchCallback: ({ message }) => {
                this.setState({ loading: false });
            }
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

                                <Loading loading={this.state.loading} localstorage="-withLocalStorage2"/>
                            </h3>
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