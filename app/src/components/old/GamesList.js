import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {TestarImagem} from '../components/util/FlagImporter';
import PartidaPlacar from '../components/util/PartidaPlacar';


class GamesList extends Component {
    
    showLink(){
        if (this.props.link){
            if (this.props.dashboard){
                return (
                    <div className="linkApostaJogo">
                        <Link to={"jogo/"+this.props.num_jogo}>Ver apostas ></Link>
                    </div>
                );
            }else{
                return (
                    <div className="linkApostaJogo">
                        <Link to={"../jogo/"+this.props.num_jogo}>Ver apostas ></Link>
                    </div>
                );
            }
        }
    }

    showPorcent(){
        if (this.props.porcent){
            return (
                <div className={"porcent"}>
                    {this.props.porcent + "%"}
                </div>
            );
        }
    }

    showBetCompare(){
        if (this.props.points && this.props.final_home_score){
            return (
                <div className="betCompare">
                    <p>Placar: {this.props.final_home_score}x{this.props.final_away_score}</p>
                    <p>Pontos: {this.props.points}</p>
                </div>
            );
        }
    }

    render() {
        return (
            <li className={this.props.link?'undefined':'verApostas'}>
                <p className="info">
                    {this.props.info} | {this.props.local}
                </p>

                <div className="jogo">
                    <div className="time -Home">
                        <p>{this.props.home_team}</p>
                        <div>
                            <img src={TestarImagem(this.props.home_file)} alt={this.props.home_team} />
                        </div>
                    </div>

                    {/*<span className="placar">

                        <p className="plac-num1">{this.props.home_score}</p>
                        
                        <p className="x">X</p>
                        
                        <p className="plac-num2">{this.props.away_score}</p>

                    </span>*/}

                    <PartidaPlacar 
                        team={this.props.team}
                    />


                    
                    <div className="time -Away">
                        <p>{this.props.away_team}</p>
                        <div>
                            <img src={TestarImagem(this.props.away_file)} alt={this.props.away_team}  />
                        </div>
                    </div>
                </div>

                {this.showLink()}

                <div className={"nomeApostaJogo " 
                + this.props.names}>
                    {
                        this.props.names ? 
                            this.props.names.split(",").map(function(name, index) {
                                return (
                                    <div>
                                        <Link key={index} to={"../apostado/"+name}>{name}</Link>
                                    </div>
                                );
                            })
                        : null
                    }
                </div>

                {this.showPorcent()}
                {this.showBetCompare()}
            </li>
        );
    }
}

export default GamesList;