import React, { Component } from 'react';
import $ from 'jquery';

import '../../css/faleconosco.css';

import http from '../../util/http';

import MaterialTextInput from '../util/MaterialTextInput';
import Loading from '../util/Loading';


class PageContato extends Component {
    constructor() {
        super();
        this.state = {
            loading: '',
            ajaxSuccessResp: '',
            ajaxErrorResp: ''
        };
    }

    async sendFormContato(evento) {
        evento.preventDefault();

        this.setState({
            ajaxErrorResp: "",
            ajaxSuccessResp: ""
        });

        const nomeValue = $("input[name='nome']").val();
        const emailValue = $("input[name='email']").val();
        const messageValue = $("textarea[id='textareaMessage']").val();

        if(nomeValue==="" || emailValue==="" || messageValue===""){
            this.setState({ajaxErrorResp: "Favor preencha todos os campos!"});
        }else{
            this.setState({ loading: true });

            const dataString = JSON.stringify({
                name: nomeValue,
                email: emailValue,
                message: messageValue
            });

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/email/enviaEmailContato.php`,
                data: dataString,
                thenCallback: (response) => {
                    this.setState({ ajaxSuccessResp: response.message.toString() });
                    this.setState({ loading: false });
                },
                catchCallback: ({ message }) => {
                    this.setState({
                        ajaxErrorResp: message,
                        ajaxSuccessResp: '0'
                    });

                    this.setState({ loading: false });
                }
            });
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

    showFormContato(){
        if(this.state.ajaxSuccessResp!==''){
            return(
                <div className="faleconosco">
                    <h3>Fale Conosco</h3>
                    <br/><br/>
                    <div className="contatoForm">
                        {this.showFormMessages()}
                    </div>
                </div>
            );
        }else{
            return(
                <div className="faleconosco">
                    <h3>Fale Conosco</h3>

                    <p>Mande suas dúvidas, problemas ou sugestões! Nós gostamos de conversar ;)</p>

                    <form 
                        className="userInfo"
                        onSubmit={async function(event){
                            await this.sendFormContato(event,  this.props.userJWT)}.bind(this)
                        } 
                        method="post"
                    >

                        <div className="contatoForm">
                            <MaterialTextInput 
                                labelName="Nome e Sobrenome"
                                fieldName="nome"
                                fieldType="text"
                            />

                            <MaterialTextInput 
                                labelName="E-mail"
                                fieldName="email"
                                fieldType="email"
                            />

                            <div className="materialTextarea">
                                <textarea 
                                    type="text" 
                                    id="textareaMessage" 
                                    rows="4"
                                    required>
                                </textarea>
                                <label htmlFor="textareaMessage">
                                    Mensagem
                                </label>
                            </div>

                            <input 
                                type="submit" 
                                className="SendButton" 
                                value="Enviar"
                            />

                            <Loading loading={this.state.loading}/>
                            
                        </div>
                    </form>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="MainContent-container">
                {this.showFormContato()}
            </div>
        );
    }
}

export default PageContato;