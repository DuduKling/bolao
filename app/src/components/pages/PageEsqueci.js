import React, { Component } from 'react';
import '../../css/pages/login.css';
import $ from 'jquery';

import http from '../../util/http';

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

        const emailValue = $("input[name='email']").val();

        const dataString = JSON.stringify({
            email: emailValue
        });

        http({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/email/enviaEmailRedefinir.php`,
            data: dataString,
            thenCallback: (response) => {
                this.setState({
                    ajaxSuccessResp: response.message.toString(),
                    loading: false
                });
            },
            catchCallback: ({ message }) => {
                this.setState({
                    ajaxErrorResp: message
                });
                this.setState({ loading: false });
            }
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
            this.setState({ loading: true });

            const dataString = JSON.stringify({
                type: 'resetPass',
                password: senhaValue,
                id: userID,
                jwt: userJWT
            });

            http({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/update.php`,
                data: dataString,
                thenCallback: (response) => {
                    this.setState({ ajaxSuccessResp: response.message.toString() });
                    this.setState({ loading: false });
                },
                catchCallback: ({ message }) => {
                    this.setState({
                        ajaxErrorResp: message,
                        ajaxSuccessResp: ''
                    });
                    this.setState({ loading: false });
                }
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