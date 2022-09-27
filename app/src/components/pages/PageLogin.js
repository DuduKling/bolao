import React, { Component } from 'react';
import '../../css/pages/login.css';
import '../../css/util/formMessage.css';
import $ from 'jquery';
import axios from "axios";

import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

    sendFormAjax(evento) {
        const { updateJWT } = this.props;

        evento.preventDefault();
        this.setState({ajaxErrorResp: ""});
        this.setState({ajaxSuccessResp: ""});
        
        var nomeValue = $("input[name='nome']").val();
        var emailValue = $("input[name='email']").val();
        var senhaValue = $("input[name='senha']").val();
        var senhaConfirmarValue = $("input[name='senhaCheck']").val();
        var keeplogin = $("input#keepLogin");

        var textJSON = "";
        var textJSON2 = "";
        var dataString = "";
        
        if(this.props.match.params.typeOfLogin === "login"){

            if(emailValue==="" || senhaValue===""){
                this.setState({ajaxErrorResp: "Favor preencha todos os campos!"});
            }else{

                
                // // Liberar interno local:
                // var pessoa = {userName:"John", userEmail:"email@exemplo.com"};
                // updateJWT(pessoa);
                // this.setState({redirectToUser: true});
                // var userInfo = {
                //     userName: "Teste local", 
                //     userEmail: "teste@local.com",
                //     userID: "666",
                //     userImg: "/imagens/users/avatar.png",
                //     userJWT: "numeros.numeros.numeros"
                // };
                // updateJWT(userInfo);
                // if(keeplogin.is(':checked')){
                //     // console.log("quer ficar logado!");
                //     SetCookie("userLogin", JSON.stringify(userInfo), 7);
                // }




                textJSON = `{
                    "email":"${emailValue}", 
                    "password":"${senhaValue}"
                }`;
                textJSON2 = JSON.parse(textJSON);
                dataString = JSON.stringify(textJSON2);
                
                $.ajax({
                    url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/login.php`,
                    type: 'post',
                    contentType : 'application/json',
                    data: dataString,
                    success: function(resposta){
                        // console.log(resposta);
                        
                        var userInfo = {
                            userName: resposta.name, 
                            userEmail: resposta.email,
                            userID: resposta.id,
                            userImg: resposta.imagePath,
                            userRole: resposta.userRole,
                            userJWT: resposta.jwt
                        };
                        updateJWT(userInfo);

                        
                        if(keeplogin.is(':checked')){
                            // SetCookie("userLogin", JSON.stringify(userInfo), 7);
                            SetCookie("userLogin", resposta.jwt, 7);
                        }else{
                            // SetCookie("userLogin", JSON.stringify(userInfo), 0);
                            SetCookie("userLogin", resposta.jwt, 0)
                        }

                        this.setState({redirectToUser: true});
                    }.bind(this),
                    error: function(xhr, status, err){

                        console.error(status, err.toString());

                        // console.log(xhr.responseText);
                        console.log(JSON.parse(xhr.responseText));
                        
                        // console.log(JSON.parse(xhr.responseText).message);
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
                const dataString = JSON.stringify({
                    "completename": nomeValue.trim(),
                    "email": emailValue,
                    "password": senhaValue
                });

                axios.post(`${process.env.REACT_APP_URL_BACK}/api/v1/user/create.php`, dataString)
                    .then((resposta) => {
                        this.setState({ajaxSuccessResp: resposta.data.message.toString()});

                        this.setState({redirectToLogin: true});
                    })
                    .catch((error) => {
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }
                        console.log(error.config);

                        this.setState({
                            ajaxErrorResp: error.response.data.message.toString(),
                            ajaxSuccessResp: '0'
                        });
                    });


                // textJSON = `{
                //     "completename":"${nomeValue.trim()}",
                //     "email":"${emailValue}",
                //     "password":"${senhaValue}"
                // }`;
                // textJSON2 = JSON.parse(textJSON);
                // dataString = JSON.stringify(textJSON2);

                // $.ajax({
                //     url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/create.php`,
                //     type: 'post',
                //     contentType : 'application/json',
                //     data: dataString,
                //     success: function(resposta){

                //         this.setState({ajaxSuccessResp: resposta.message.toString()});
                //         // console.log(resposta);

                //         this.setState({redirectToLogin: true});

                //     }.bind(this),
                //     error: function(xhr, status, err){

                //         console.error(status, err.toString());

                //         // console.log(xhr.responseText);
                //         console.log(JSON.parse(xhr.responseText));
                        
                //         // console.log(JSON.parse(xhr.responseText).message);
                //         this.setState({
                //             ajaxErrorResp: JSON.parse(xhr.responseText).message.toString(),
                //             ajaxSuccessResp: '0'
                //         });

                //     }.bind(this)
                // });
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