import React, { Component } from 'react';
import '../../css/util/materialInput.css';

class MaterialTextInput extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            status: '',
            error: '',
            nomeValue: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkRegex = this.checkRegex.bind(this);
    }
    
    handleInputChange(event) {
        const inputName = event.target.name;
        // const inputType = event.target.type;
        const inputValue = event.target.value;
        
        this.setState({
            value: inputValue
        });

        if(this.state.value !== ''){
            this.setState({status: 'NotEmpty'});
            this.checkRegex(inputValue, inputName);
        } else {
            this.setState({status: ''});
        }

    }

    checkRegex(inputValue, inputName){
        var regx = '';
        var resultado = '';
        
        switch(inputName) {
            case "nome":
                regx  = new RegExp('^[A-Za-zÀ-ú ]+([^\\t\\r\\n])$', 'gi');
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

            case "senha":
            case "senhaCheck":
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

    componentDidMount(){
        if(this.props.fieldPlaceholder !== undefined){
            this.setState({value: this.props.fieldPlaceholder});
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
                    required={this.props.fieldRequired?false:true}
                    maxLength="30" 
                    value={this.state.value}
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