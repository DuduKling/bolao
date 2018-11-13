import React, { Component } from 'react';
import '../../css/util/materialInput.css';

class MaterialTextInput extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            status: '',
            error: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkRegex = this.checkRegex.bind(this);
    }

    handleInputChange(event) {
        // const inputName = event.target.name;
        const inputType = event.target.type;
        const inputValue = event.target.value;
        
        this.setState({
            value: inputValue
        });

        if(this.state.value !== ''){
            this.setState({status: 'NotEmpty'});
            this.checkRegex(event, inputType, inputValue);
        } else {
            this.setState({status: ''});
        }

    }

    checkRegex(event, inputType, inputValue){
        var regx = '';
        var resultado = '';
        
        switch(inputType) {
            case "nome":
                regx  = new RegExp('^[A-Za-z]+([ |\x20]{1}[A-Za-z]+)?$', 'gi');
                resultado = regx.test(inputValue);

                if(!resultado){
                    this.setState({
                        error: "error"
                    });
                }else{
                    this.setState({
                        error: ""
                    });
                }
            break;

            case "email":
                regx  = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$', 'gi');
                resultado = regx.test(inputValue);

                if(!resultado){
                    this.setState({
                        error: "error"
                    });
                }else{
                    this.setState({
                        error: ""
                    });
                }
            break;

            case "number":
                regx  = new RegExp('^[0-9]{1,2}$', 'gi');
                resultado = regx.test(inputValue);

                if(!resultado){
                    event.target.classList.add("error");
                }else{
                    event.target.classList.remove("error");
                }
            break;

            case "password":
                regx  = new RegExp('^[\\w]{8,}$', 'gi');
                resultado = regx.test(inputValue);

                if(!resultado){
                    this.setState({
                        error: "error"
                    });
                }else{
                    this.setState({
                        error: ""
                    });
                }
            break;

            default:
                if(inputValue === ''){
                    this.setState({
                        error: "error"
                    });
                }else{
                    this.setState({
                        error: ""
                    });
                }
        }
    }

    render() {
        return (
            <div className="material-input">
                <input 
                    type={this.props.fieldType} 
                    name={this.props.fieldName} 
                    onChange={this.handleInputChange} 
                    className={this.state.error} 
                    required="required" 
                    placeholder="" 
                    maxLength="30" 
                />

                <label 
                    htmlFor={this.props.fieldName} 
                    className={this.state.status}>

                    {this.props.labelName}
                    
                </label>
            </div>
        );
    }
}

export default MaterialTextInput;