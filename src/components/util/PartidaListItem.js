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
                    {
                        this.props.team.usernames ? 
                            this.props.team.usernames.split(",").map(function(name, index) {
                                return (
                                    <div key={index}>
                                        <Link  to={"../apostado/"+name}>{name}</Link>
                                    </div>
                                );
                            })
                        : null
                    }
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

                {this.checkIfShowPorcent()}

                {/*// TODO show comparação de apostado com real.. */}
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