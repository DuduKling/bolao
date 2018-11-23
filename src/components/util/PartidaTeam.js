import React, { Component } from 'react';
import '../../css/util/partidaTeam.css';

// import {TestarImagem} from './FlagImporter';

class PartidaTeam extends Component {
    setImageHome(imageName){
        if(imageName===""){
            return "/imagens/flags/default_flag.png"
        }else{
            return "/imagens/flags/"+imageName
        }
    }

    setImageAway(imageName){
        if(imageName===""){
            return "/imagens/flags/default_flag.png"
        }else{
            return "/imagens/flags/"+imageName
        }
    }

    checkIfHomeOrAway(){
        if(this.props.type === "-Home"){
            return (
                <div className={"time "+this.props.type}>
                    <p>{this.props.team.home_team_name}</p>
                    <div>
                        <img src={this.setImageHome(this.props.team.home_path)} alt={this.props.team.home_team_name} />
                    </div>
                </div>
            );
        }else{
            return (
                <div className={"time "+this.props.type}>
                    <p>{this.props.team.away_team_name}</p>
                    <div>
                        <img src={this.setImageAway(this.props.team.away_path)} alt={this.props.team.away_team_name}  />
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.checkIfHomeOrAway()}
            </div>
        );
    }
}

export default PartidaTeam;