import React, { Component } from 'react';
import '../../css/util/partidaPlacar.css';

class PartidaPlacar extends Component {
    checkTypeHomeTeam(){
        if(this.props.typeAll === "ReadOnly"){
            return (
                <p className="plac-num1">{this.props.team.home_score}</p>
            );

        }else{

            if(this.props.typeHome === "ReadOnly"){
                return (
                    <p className="plac-num1">{this.props.team.home_score}</p>
                );

            }else{
                return (
                    <div>
                        <input 
                            type="text" 
                            placeholder="X" 
                            name={this.props.team.idfixture+"_home"} 
                            onChange={this.handleInputChange} 
                            required="required" 
                            maxLength="2" 
                            pattern="^[0-9]{1,2}$" 
                        />
                        <label></label>
                    </div>
                );
            }
        }
    }

    checkTypeAwayTeam(){
        if(this.props.typeAll === "ReadOnly"){
            return (
                <p className="plac-num2">{this.props.team.away_score}</p>
            );

        }else{

            if(this.props.typeAway === "ReadOnly"){
                return (
                    <p className="plac-num2">{this.props.team.away_score}</p>
                );

            }else{
                return (
                    <div>
                        <input 
                            type="text" 
                            placeholder="X" 
                            name={this.props.team.idfixture+"_away"} 
                            onChange={this.handleInputChange} 
                            required="required" 
                            maxLength="2" 
                            pattern="^[0-9]{1,2}$"
                        />
                        <label></label>
                    </div>
                );
            }
        }
    }

    render() {
        return (
            <span className="placar">

                {this.checkTypeHomeTeam()}
                
                <p className="x">X</p>

                {this.checkTypeAwayTeam()}

            </span>
        );
    }
}

export default PartidaPlacar;