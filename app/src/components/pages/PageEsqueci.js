import React, { Component } from 'react';
import '../../css/pages/login.css';
import $ from 'jquery';

import MaterialTextInput from '../util/MaterialTextInput';
import Canvas from '../home/Canvas';

import Loading from '../util/Loading';



class PageEsqueci extends Component {
    constructor() {
        super();
        this.state = {
            ajaxErrorResp: '',
            ajaxSuccessResp: ''
        };
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

    sendEmailForm(evento){
        evento.preventDefault();
        this.setState({
            ajaxSuccessResp: '',
            ajaxErrorResp: '',
            loading: true
        });
        
        var emailValue = $("input[name='email']").val();

        var textJSON = `{
            "email":"${emailValue}"
        }`;
        var textJSON2 = JSON.parse(textJSON);
        var dataString = JSON.stringify(textJSON2);
        
        $.ajax({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/email/enviaEmailRedefinir.php`,
            type: 'post',
            contentType : 'application/json',
            data: dataString,
            success: function(resposta){

                this.setState({
                    ajaxSuccessResp: resposta.message.toString(),
                    loading: false
                });

            }.bind(this),
            error: function(xhr, status, err){

                console.error(status, err.toString());
                console.log(JSON.parse(xhr.responseText));
                this.setState({
                    ajaxErrorResp: JSON.parse(xhr.responseText).message.toString()
                });
                this.setState({loading: false});

            }.bind(this)
        });
    }

    showEmailForm(){
        if(this.state.ajaxSuccessResp===''){
            return(
                <form 
                    className="form" 
                    onSubmit={function(event){
                        this.sendEmailForm(event)}.bind(this)
                    } 
                    method="post"
                >
                    <p>Digite seu e-mail:</p>

                    <MaterialTextInput
                        labelName="E-mail"
                        fieldName="email"
                        fieldType="email"
                    />
                    
                    <input 
                        type="submit" 
                        className="SendButton" 
                        value="Enviar e-mail"
                    />
                </form>
            );
        }
    }

    sendPasswdForm(evento){
        evento.preventDefault();
        this.setState({
            ajaxSuccessResp: '',
            ajaxErrorResp: ''
        });
        
        var userJWT = this.props.match.params.jwtCode;
        var userID = this.props.match.params.id;
        
        var senhaValue = $("input[name='senha']").val();
        var senhaConfirmarValue = $("input[name='senhaCheck']").val();

        if(senhaValue==="" && senhaConfirmarValue===""){
            this.setState({ajaxErrorResp: "Favor preencher ambos os campos!"});
        }else if(senhaValue!==senhaConfirmarValue){
            this.setState({ajaxErrorResp: "Senhas precisam ser idênticas."});
        }else{
            this.setState({loading: true});
            var textJSON = `{
                "type":"resetPass",
                "password":"${senhaValue}",
                "id":"${userID}",
                "jwt":"${userJWT}"
            }`;
            var textJSON2 = JSON.parse(textJSON);
            var dataString = JSON.stringify(textJSON2);
            
            $.ajax({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/update.php`,
                type: 'post',
                contentType : 'application/json',
                data: dataString,
                success: function(resposta){
                    // console.log(resposta);
                    
                    this.setState({ajaxSuccessResp: resposta.message.toString()});
                    this.setState({loading: false});
                }.bind(this),
                error: function(xhr, status, err){

                    console.error(status, err.toString());
                    console.log(JSON.parse(xhr.responseText));
                    
                    this.setState({
                        ajaxErrorResp: JSON.parse(xhr.responseText).message.toString(),
                        ajaxSuccessResp: ''
                    });
                    this.setState({loading: false});
                }.bind(this)
            });
        }
    }

    showPasswdForm(){
        if(this.state.ajaxSuccessResp===''){
            return(
                <form 
                    className="form" 
                    onSubmit={function(event){
                        this.sendPasswdForm(event)}.bind(this)
                    } 
                    method="post"
                >
                    <p>Digite sua nova senha:</p>

                    <MaterialTextInput 
                        labelName="Senha"
                        fieldName="senha"
                        fieldType="password"
                    />

                    <MaterialTextInput 
                        labelName="Confirmar Senha"
                        fieldName="senhaCheck"
                        fieldType="password"
                    />
                    
                    <input 
                        type="submit" 
                        className="SendButton" 
                        value="Trocar senha"
                    />
                </form>
            );
        }
    }

    checkIfJWTExists(){
        if(this.props.match.params.jwtCode === undefined){
            return(
                this.showEmailForm()
            );
        }else{
            return(
                this.showPasswdForm()
            );
        }
    }

    render() {
        return (
            <div className="login-container">
                
                <div className="form-container">

                    <h2>Redefinir senha</h2>

                    {this.checkIfJWTExists()}

                    <Loading loading={this.state.loading}/>

                    {this.showFormMessages()}

                </div>

                <Canvas />

            </div>
        );
    }
}

export default PageEsqueci;