import React, { Component } from 'react';
import '../../css/pages/login.css';

import MaterialTextInput from '../util/MaterialTextInput';
import Canvas from '../home/Canvas';

class PageLogin extends Component {
    fixPageName(){
        var pathName = ""+this.props.match.params.typeOfLogin;
        pathName = pathName.charAt(0).toUpperCase() + pathName.slice(1);
        return (
            <h2>{pathName}</h2>
        );
    }

    CheckIfFormCadastrar1(){
        if(this.props.match.params.typeOfLogin === "cadastrar"){
            return (
                <MaterialTextInput 
                    labelName="Nome e Sobrenome"
                    fieldName="nome"
                    fieldType="text"
                />
            );
        }
    }

    CheckIfFormCadastrar2(){
        if(this.props.match.params.typeOfLogin === "cadastrar"){
            return (
                <MaterialTextInput 
                    labelName="Confirmar Senha"
                    fieldName="senhaCheck"
                    fieldType="password"
                />
            );
        }
    }

    SetButtonName(){
        if(this.props.match.params.typeOfLogin === "cadastrar"){
            return (
                "Enviar"
            );
        }else{
            return (
                "Entrar"
            );
        }
    }

    CheckIfFormLogin(){
        if(this.props.match.params.typeOfLogin === "login"){
            return (
                <div className="checkbox-container">
                    <input type="checkbox" name="keepLogin" value="keepLogin" class="checkbox" id="keepLogin" />
                    <label htmlFor="keepLogin">Mantenha-me logado!</label>
                </div>
            );
        }
    }


    render() {
        return (
            <div className="login-container">
                <div className="form-container">
                    {this.fixPageName()}

                    <form className="form" action="/">

                    {this.CheckIfFormCadastrar1()}

                    <MaterialTextInput 
                        labelName="E-mail"
                        fieldName="email"
                        fieldType="email"
                    />

                    <MaterialTextInput 
                        labelName="Senha"
                        fieldName="senha"
                        fieldType="password"
                    />

                    {this.CheckIfFormCadastrar2()}

                    {this.CheckIfFormLogin()}

                    <input type="submit" className="SendButton" value={this.SetButtonName()}/>

                    {/*// TODO colocar um esqueci minha senha..*/}
                    </form>
                </div>
                <Canvas />
            </div>
        );
    }
}

export default PageLogin;