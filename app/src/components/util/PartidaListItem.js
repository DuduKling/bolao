import React, { Component } from 'react';
import '../../css/util/partidaListItem.css';
import { Link } from 'react-router-dom';

import PartidaTeam from './PartidaTeam';
import  PartidaPlacar from './PartidaPlacar';


class PartidaListItem extends Component {
    checkTypeOfPlacar(){
        if(this.props.typeAll === "ReadOnly"){
            return (
                <PartidaPlacar 
                    team={this.props.team}
                    typeAll="ReadOnly"
                    typeHome={this.checkIfHomeNeedsInput()}
                    typeAway={this.checkIfAwayNeedsInput()}
                />
            );
        }else if(this.props.isAdmin==="admin"){
            return (
                <PartidaPlacar 
                    team={this.props.team}
                    typeHome={this.checkIfHomeNeedsInput()}
                    typeAway={this.checkIfAwayNeedsInput()}
                    isAdmin={"admin"}
                />
            );
        }else{
            return (
                <PartidaPlacar 
                    team={this.props.team}
                    typeHome={this.checkIfHomeNeedsInput()}
                    typeAway={this.checkIfAwayNeedsInput()}
                />
            );
        }
    }
    
    checkIfHomeNeedsInput(){
        if(this.props.team.home_score){
            return "ReadOnly"
        }else{
            return ""
        }
    }

    checkIfAwayNeedsInput(){
        if(this.props.team.away_score){
            return "ReadOnly"
        }else{
            return ""
        }
    }

    checkIfShowUsernames(){
        if(this.props.users){
            return(
                <div className="users-container">
                    <label htmlFor={"toggleUsernames"+this.props.team.frontID}>
                        Mostrar pessoas
                    </label>
                    <input type="checkbox" id={"toggleUsernames"+this.props.team.frontID} />
                    <div className="users-usernamesList">
                        {
                            this.props.team.usernames ? 
                                this.props.team.usernames.split(",").map(function(name, index) {
                                    return (
                                        <div key={index}>
                                            <Link to={"../apostado/"+name}>{name}</Link>
                                        </div>
                                    );
                                })
                            : null
                        }
                    </div>
                </div>
            );
        }
    }

    checkIfShowPorcent(){
        if(this.props.porcent){
            return(
                <div className="users-porcent">
                    <div className="porcent-triangle"></div>
                    <p>{this.props.team.porcentagem}%</p>
                </div>
            );
        }
    }

    checkIfShowPoints(){
        if(this.props.team.points !== undefined){
            if(this.props.team.points !== null){
                return(
                    <div className="users-points">
                        Final:
                        {" "+this.props.team.final_scoreHome} 
                        x
                        {this.props.team.final_scoreAway+" "}
                        | Pontos:
                        {" "+this.props.team.points}
                    </div>
                );
            }
        }
    }

    
    checkIfShowAsLink(){
        if(this.props.link !== undefined){
            return(
                <Link to={"../../"+this.props.link.fase+"/jogo/"+this.props.team.idfixture}>
                    {this.insideStuff()}
                </Link>
            );
        }else{
            return(
                <div>
                    {this.insideStuff()}
                </div>
            );
        }
    }

    insideStuff(){
        return(
            <div>
                <p className="info">
                    {this.props.team.datetime} | {this.props.team.local}
                </p>

                <div className="match-container">
                
                    <PartidaTeam 
                        type="-Home"
                        team={this.props.team} 
                    />

                    {this.checkTypeOfPlacar()}

                    <PartidaTeam 
                        type="-Away"
                        team={this.props.team} 
                    />

                </div>

                {this.checkIfShowUsernames()}

                {this.checkIfShowPoints()}

                {this.checkIfShowPorcent()}

            </div>
        );
    }


    render() {
        return (
            <li className="-apostadoJogo" key={this.props.index}>

                {this.checkIfShowAsLink()}

            </li>
        );
    }
}

export default PartidaListItem;