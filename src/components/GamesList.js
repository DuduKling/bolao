import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import default_flag from '../imgs/default_flag.png';

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

class GamesList extends Component {

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
                            <img src={this.testImg(this.props.home_file)} alt={this.props.home_team} />
                        </div>
                    </div>

                    <span className="placar">

                        <p className="plac-num1">{this.props.home_score}</p>
                        
                        <p className="x">X</p>
                        
                        <p className="plac-num2">{this.props.away_score}</p>

                    </span>
                    
                    <div className="time -Away">
                        <p>{this.props.away_team}</p>
                        <div>
                            <img src={this.testImg(this.props.away_file)} alt={this.props.away_team}  />
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