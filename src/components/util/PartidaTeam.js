import React, { Component } from 'react';
import '../../css/util/partidaTeam.css';

import {TestarImagem} from './FlagImporter';

class PartidaTeam extends Component {
    checkIfHomeOrAway(){
        if(this.props.type === "-Home"){
            return (
                <div className={"time "+this.props.type}>
                    <p>{this.props.team.home_team_name}</p>
                    <div>
                        <img src={TestarImagem(this.props.team.home_path)} alt={this.props.team.home_team_name} />
                    </div>
                </div>
            );
        }else{
            return (
                <div className={"time "+this.props.type}>
                    <p>{this.props.team.away_team_name}</p>
                    <div>
                        <img src={TestarImagem(this.props.team.away_path)} alt={this.props.team.away_team_name}  />
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