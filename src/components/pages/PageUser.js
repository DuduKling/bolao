import React, { Component } from 'react';
import '../../css/pages/user.css';
import '../../css/util/formMessage.css';
import $ from 'jquery';

import { bindActionCreators } from 'redux';
import { updateJWT } from '../../actions';
import { connect } from 'react-redux';

import Avatar from '../../imgs/avatar.png';

import MaterialTextInput from '../util/MaterialTextInput';

class PageUser extends Component {
    constructor() {
        super();
        this.state = {
            ajax1ErrorResp: '',
            ajax1SuccessResp: '',
            ajax2ErrorResp: '',
            ajax2SuccessResp: ''
        };
    }

    sendFormUpdateInfo(evento, userJWT) {
        const { updateJWT } = this.props;

        evento.preventDefault();
        this.setState({ajax1ErrorResp: ""});
        this.setState({ajax1SuccessResp: ""});
        
        var nomeValue = $("input[name='nome']").val();
        var emailValue = $("input[name='email']").val();

        if(nomeValue==="" && emailValue===""){
            this.setState({ajax1ErrorResp: "Favor preencher pelo menos um dos campos!"});
        }else{
            var textJSON = `{
                "name":"${nomeValue}", 
                "email":"${emailValue}",
                "jwt":"${userJWT}"
            }`;
            var textJSON2 = JSON.parse(textJSON);
            var dataString = JSON.stringify(textJSON2);
            
            $.ajax({
                url:"../rest-api/update_user.php",
                type: 'post',
                contentType : 'application/json',
                data: dataString,
                success: function(resposta){
                    // console.log(resposta);
                    // console.log(resposta.name);
                    
                    var userInfo = {
                        userName: resposta.name, 
                        userEmail: resposta.email,
                        userID: resposta.id,
                        userJWT: resposta.jwt
                    };
                    updateJWT(userInfo);
                    
                    this.setState({ajax1SuccessResp: resposta.message.toString()});
                }.bind(this),
                error: function(xhr, status, err){

                    console.error(status, err.toString());

                    // console.log(xhr.responseText);
                    console.log(JSON.parse(xhr.responseText));
                    
                    // console.log(JSON.parse(xhr.responseText).message);
                    this.setState({
                        ajax1ErrorResp: JSON.parse(xhr.responseText).message.toString(),
                        ajax1SuccessResp: '0'
                    });

                }.bind(this)
            });
        }


    }

    sendFormChangePassword(evento, userJWT) {
        evento.preventDefault();
        this.setState({ajax2ErrorResp: ""});
        this.setState({ajax2SuccessResp: ""});
        
        var senhaValue = $("input[name='senha']").val();
        var senhaConfirmarValue = $("input[name='senhaCheck']").val();

        if(senhaValue==="" && senhaConfirmarValue===""){
            this.setState({ajax2ErrorResp: "Favor preencher ambos os campos!"});
        }else if(senhaValue!==senhaConfirmarValue){
            this.setState({ajax2ErrorResp: "Senhas precisam ser idênticas."});
        }else{
            var textJSON = `{
                "password":"${senhaValue}",
                "jwt":"${userJWT}"
            }`;
            var textJSON2 = JSON.parse(textJSON);
            var dataString = JSON.stringify(textJSON2);
            
            $.ajax({
                url:"../rest-api/update_user.php",
                type: 'post',
                contentType : 'application/json',
                data: dataString,
                success: function(resposta){
                    // console.log(resposta);
                    
                    this.setState({ajax2SuccessResp: resposta.message.toString()});
                }.bind(this),
                error: function(xhr, status, err){

                    console.error(status, err.toString());

                    // console.log(xhr.responseText);
                    console.log(JSON.parse(xhr.responseText));
                    
                    // console.log(JSON.parse(xhr.responseText).message);
                    this.setState({
                        ajax2ErrorResp: JSON.parse(xhr.responseText).message.toString(),
                        ajax2SuccessResp: '0'
                    });

                }.bind(this)
            });
        }
    }

    showForm1Messages() {
        if(this.state.ajax1ErrorResp === '' && this.state.ajax1SuccessResp === ''){
            return (
                null
            );
        }else if (this.state.ajax1ErrorResp !== ''){
            return(
                <div className="FormMessage -error">
                    {this.state.ajax1ErrorResp}
                </div>
            );
        }else if (this.state.ajax1SuccessResp !== ''){
            return(
                <div className="FormMessage -success">
                    {this.state.ajax1SuccessResp}
                </div>
            );
        }
    }

    showForm2Messages() {
        if(this.state.ajax2ErrorResp === '' && this.state.ajax2SuccessResp === ''){
            return (
                null
            );
        }else if (this.state.ajax2ErrorResp !== ''){
            return(
                <div className="FormMessage -error">
                    {this.state.ajax2ErrorResp}
                </div>
            );
        }else if (this.state.ajax2SuccessResp !== ''){
            return(
                <div className="FormMessage -success">
                    {this.state.ajax2SuccessResp}
                </div>
            );
        }
    }
    
    render() {
        return (
            <div className="userPage-container">

                <div className="userPage-userInfo">

                    <form 
                        className="userInfo"
                        onSubmit={function(event){
                            this.sendFormUpdateInfo(event,  this.props.userJWT)}.bind(this)
                        } 
                        method="post"
                    >
                        {/* //TODO: Adicionar imagem no user...*/}
                        <div className="userInfo-imgContainer">
                            <div className="userInfo-img">
                                <img src={Avatar} alt="avatar"/>
                            </div>
                        </div>

                        <div className="userInfo-title page-title">
                            <MaterialTextInput 
                                labelName="Nome e Sobrenome"
                                fieldName="nome"
                                fieldType="text"
                                fieldRequired="no"
                                fieldPlaceholder={this.props.userName}
                            />
                        </div>

                        <div className="userInfo-otherInfo">
                            <MaterialTextInput 
                                labelName="E-mail"
                                fieldName="email"
                                fieldType="email"
                                fieldRequired="no"
                                fieldPlaceholder={this.props.userEmail}
                            />

                            <input 
                                type="submit" 
                                className="SendButton" 
                                value="Atualizar"
                            />

                            {this.showForm1Messages()}
                        </div>
                    </form>
                    
                    <form 
                        className="userInfo"
                        onSubmit={function(event){
                            this.sendFormChangePassword(event,  this.props.userJWT)}.bind(this)
                        } 
                        method="post"
                    >
                        <div className="passwordChange">
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
                                value="Trocar Senha"
                            />

                            {this.showForm2Messages()}
                        </div>
                    </form>


                </div>

            </div>
        );
    }
}

const mapStateToProps = store => ({
    userName: store.AuthJWTState.userName,
    userEmail: store.AuthJWTState.userEmail,
    userJWT: store.AuthJWTState.userJWT
});

const mapDispatchToProps = dispatch => 
bindActionCreators({ updateJWT }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageUser);