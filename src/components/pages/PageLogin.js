import React, { Component } from 'react';
import '../../css/pages/login.css';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { updateJWT } from '../../actions';
import { connect } from 'react-redux';

import MaterialTextInput from '../util/MaterialTextInput';
import Canvas from '../home/Canvas';

class PageLogin extends Component {
    constructor() {
        super();
        this.state = {
            ajaxErrorResp: '',
            ajaxSuccessResp: '',
            redirectToLogin: false,
            redirectToDashboard: false
        };
    }

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
                    <input type="checkbox" name="keepLogin" value="keepLogin" className="checkbox" id="keepLogin" />
                    <label htmlFor="keepLogin">Mantenha-me logado!</label>
                </div>
            );
        }
    }

    showFormMessages() {
        if(this.state.ajaxErrorResp === '' && this.state.ajaxSuccessResp === ''){
            return (
                null
            );
        }else if (this.state.ajaxErrorResp !== ''){
            return(
                <div className="FormMessage -error">
                    {this.state.ajaxErrorResp}
                </div>
            );
        }else if (this.state.ajaxSuccessResp !== ''){
            return(
                <div className="FormMessage -success">
                    {this.state.ajaxSuccessResp}
                </div>
            );
        }
    }

    sendFormAjax(evento) {
        const { updateJWT } = this.props;

        evento.preventDefault();
        this.setState({ajaxErrorResp: ""});
        this.setState({ajaxSuccessResp: ""});
        
        var nomeValue = $("input[name='nome']").val();
        var emailValue = $("input[name='email']").val();
        var senhaValue = $("input[name='senha']").val();
        var senhaConfirmarValue = $("input[name='senhaCheck']").val();

        var textJSON = "";
        var textJSON2 = "";
        var dataString = "";
        
        if(this.props.match.params.typeOfLogin === "login"){

            if(emailValue==="" || senhaValue===""){
                this.setState({ajaxErrorResp: "Favor preencha todos os campos!"});
            }else{
                //Liberar interno local:
                // updateJWT("User Teste");
                
                textJSON = `{
                    "email":"${emailValue}", 
                    "password":"${senhaValue}"
                }`;
                textJSON2 = JSON.parse(textJSON);
                dataString = JSON.stringify(textJSON2);
                
                $.ajax({
                    url:"../rest-api/login.php",
                    type: 'post',
                    contentType : 'application/json',
                    data: dataString,
                    success: function(resposta){
                        console.log(resposta);
                        console.log(resposta.name);
                        updateJWT(resposta.name);
                        this.setState({redirectToDashboard: true});
                    }.bind(this),
                    error: function(xhr, status, err){

                        console.error(status, err.toString());

                        console.log(xhr.responseText);
                        console.log(JSON.parse(xhr.responseText));
                        
                        console.log(JSON.parse(xhr.responseText).message);
                        this.setState({
                            ajaxErrorResp: JSON.parse(xhr.responseText).message.toString(),
                            ajaxSuccessResp: '0'
                        });

                    }.bind(this)
                });
            }

        }else if(this.props.match.params.typeOfLogin === "cadastrar"){
            
            if(nomeValue==="" || emailValue==="" || senhaValue==="" || senhaConfirmarValue===""){
                this.setState({ajaxErrorResp: "Favor preencha todos os campos!"});
            }else if(senhaValue!==senhaConfirmarValue){
                this.setState({ajaxErrorResp: "Senhas precisam ser idênticas."});
            }else{
                textJSON = `{
                    "completename":"${nomeValue}",
                    "email":"${emailValue}",
                    "password":"${senhaValue}"
                }`;
                textJSON2 = JSON.parse(textJSON);
                dataString = JSON.stringify(textJSON2);
                
                $.ajax({
                    url:"../rest-api/create_user.php",
                    type: 'post',
                    contentType : 'application/json',
                    data: dataString,
                    success: function(resposta){

                        this.setState({ajaxSuccessResp: resposta.message.toString()});
                        console.log(resposta);

                        this.setState({redirectToLogin: true});

                    }.bind(this),
                    error: function(xhr, status, err){

                        console.error(status, err.toString());

                        console.log(xhr.responseText);
                        console.log(JSON.parse(xhr.responseText));
                        
                        console.log(JSON.parse(xhr.responseText).message);
                        this.setState({
                            ajaxErrorResp: JSON.parse(xhr.responseText).message.toString(),
                            ajaxSuccessResp: '0'
                        });

                    }.bind(this)
                });
            }

        }
    }

    componentDidUpdate(){
        if(this.state.redirectToLogin || this.state.redirectToDashboard){
            this.setState({
                redirectToLogin: false,
                redirectToDashboard: false
            });
        }
    }

    redirects() {
        if(this.state.redirectToLogin){
            return(
                <Redirect exact to={"/user/login"} />
            );

        }

        if(this.state.redirectToDashboard) return <Redirect to={"/0/dashboard"} />;
        
    }

    render() {
        return (
            <div className="login-container">
                {this.redirects()}
                
                <div className="form-container">
                    {this.fixPageName()}

                    <form 
                        className="form" 
                        onSubmit={function(event){
                            this.sendFormAjax(event)}.bind(this)
                        } 
                        method="post"
                    >
                        
                        {this.showFormMessages()}

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

                        <input 
                            type="submit" 
                            className="SendButton" 
                            value={this.SetButtonName()}
                        />

                        {/*// TODO colocar um esqueci minha senha..*/}
                    </form>
                </div>

                <Canvas />

            </div>
        );
    }
}

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch => 
bindActionCreators({ updateJWT }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageLogin);