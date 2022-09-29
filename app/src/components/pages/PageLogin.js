import React, { Component } from 'react';
import '../../css/pages/login.css';
import '../../css/util/formMessage.css';
import $ from 'jquery';

import { Redirect, Link } from 'react-router-dom';

import http from '../../util/http';
import SetCookie from '../util/setCookie';

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
            redirectToUser: false
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
                    <label className="pure-material-checkbox">
                        <input type="checkbox" name="keepLogin" value="keepLogin" className="checkbox" id="keepLogin" />
                        <span>Mantenha-me logado!</span>
                    </label>

                    {/* 
                    <input type="checkbox" name="keepLogin" value="keepLogin" className="checkbox" id="keepLogin" />
                    <label htmlFor="keepLogin">Mantenha-me logado!</label>
                    */}
                </div>
            );
        }
    }

    CheckIfFormLogin2ForEsqueciASenha(){
        if(this.props.match.params.typeOfLogin === "login"){
            return (
                <Link className="menuItem" to="/user/esqueci">
                    Esqueci a senha
                </Link>
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

    async sendFormAjax(evento) {
        const { updateJWT } = this.props;

        evento.preventDefault();
        this.setState({ajaxErrorResp: ""});
        this.setState({ajaxSuccessResp: ""});

        const nomeValue = $("input[name='nome']").val();
        const emailValue = $("input[name='email']").val();
        const senhaValue = $("input[name='senha']").val();
        const senhaConfirmarValue = $("input[name='senhaCheck']").val();
        const keeplogin = $("input#keepLogin");

        const typeOfLogin = this.props.match.params.typeOfLogin;

        if (typeOfLogin === "login") {
            if(emailValue==="" || senhaValue===""){
                this.setState({ajaxErrorResp: "Favor preencha todos os campos!"});
            }else{
                const dataString = JSON.stringify({
                    email: emailValue,
                    password: senhaValue
                });

                await http.post({
                    url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/login.php`,
                    data: dataString,
                    thenCallback: (response) => {
                        updateJWT({
                            userName: response.name,
                            userEmail: response.email,
                            userID: response.id,
                            userImg: response.imagePath,
                            userRole: response.userRole,
                            userJWT: response.jwt
                        });

                        if (keeplogin.is(':checked')) {
                            SetCookie("userLogin", response.jwt, 7);
                        } else {
                            SetCookie("userLogin", response.jwt, 0)
                        }

                        this.setState({ redirectToUser: true });
                    },
                    catchCallback: ({ message }) => {
                        this.setState({
                            ajaxErrorResp: message,
                            ajaxSuccessResp: '0'
                        });
                    }
                });
            }
        } else if(typeOfLogin === "cadastrar") {
            if(nomeValue==="" || emailValue==="" || senhaValue==="" || senhaConfirmarValue===""){
                this.setState({ajaxErrorResp: "Favor preencha todos os campos!"});
            }else if(senhaValue!==senhaConfirmarValue){
                this.setState({ajaxErrorResp: "Senhas precisam ser idênticas."});
            }else{
                const dataString = JSON.stringify({
                    completename: nomeValue.trim(),
                    email: emailValue,
                    password: senhaValue
                });

                await http.post({
                    url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/create.php`,
                    data: dataString,
                    thenCallback: (response) => {
                        this.setState({ ajaxSuccessResp: response.data.message.toString() });

                        this.setState({ redirectToLogin: true });
                    },
                    catchCallback: ({ message }) => {
                        this.setState({
                            ajaxErrorResp: message,
                            ajaxSuccessResp: '0'
                        });
                    }
                });
            }
        }
    }

    componentDidUpdate(){
        if(this.state.redirectToLogin || this.state.redirectToUser){
            this.setState({
                redirectToLogin: false,
                redirectToUser: false
            });
        }
    }

    redirects() {
        if(this.state.redirectToLogin){
            return(
                <Redirect exact to={"/user/login"} />
            );

        }

        if(this.state.redirectToUser) return <Redirect to={"/user/campeonatos"} />;
        
    }
    
    render() {
        return (
            <div className="login-container">
                {this.redirects()}
                
                <div className="form-container">
                    {this.fixPageName()}

                    <form 
                        className="form" 
                        onSubmit={async function(event){
                            await this.sendFormAjax(event)}.bind(this)
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

                        {this.CheckIfFormLogin2ForEsqueciASenha()}

                    </form>
                </div>

                <Canvas />

            </div>
        );
    }
}


const mapDispatchToProps = dispatch => 
bindActionCreators({ updateJWT }, dispatch);

export default connect(null, mapDispatchToProps)(PageLogin);