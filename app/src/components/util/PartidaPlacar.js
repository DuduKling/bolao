import React, { Component } from 'react';
import '../../css/util/partidaPlacar.css';

class PartidaPlacar extends Component {
    constructor() {
        super();
        this.state = {};
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        const name = event.target.name;
        const inputValue = event.target.value
        this.setState({
            [name]: inputValue
        });
        //console.log(name);
        // console.log(name.substring(0, 1));

        if (name==="nome"){
            let regx  = new RegExp('^[A-Za-z]+([ |\x20]{1}[A-Za-z]+)?$', 'gi');
            let resultado = regx.test(inputValue);

            if(!resultado){
                this.setState({
                    error_nome: "error"
                    // ["error_"+name]: "error"
                });
            }else{
                this.setState({
                    error_nome: ""
                });
            }
        } else {
            let regx  = new RegExp('^[0-9]{1,2}$', 'gi');
            let resultado = regx.test(inputValue);

            if(!resultado){
                event.target.classList.add("error");
                // this.setState({
                //     // [name]: [inputValue, "error"]
                // });
                // console.log(name+"_error");
            }else{
                event.target.classList.remove("error");
                // this.setState({
                //     // [name]: [inputValue, ""]
                // });
            }
        }
        
        // console.log(this.state);
        // console.log(this.state.Fixtures);
    }

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
                if(this.props.isAdmin==="admin"){
                    return (
                        <div>
                            <input 
                                type="text" 
                                placeholder="X" 
                                name={this.props.team.idfixture+"_home"} 
                                onChange={this.handleInputChange} 
                                maxLength="2" 
                                pattern="^[0-9]{1,2}$" 
                            />
                            <label></label>
                        </div>
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

                if(this.props.isAdmin==="admin"){
                    return (
                        <div>
                            <input 
                                type="text" 
                                placeholder="X" 
                                name={this.props.team.idfixture+"_away"} 
                                onChange={this.handleInputChange} 
                                maxLength="2" 
                                pattern="^[0-9]{1,2}$"
                            />
                            <label></label>
                        </div>
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