import React, { Component } from 'react';
import $ from 'jquery';

import '../../css/faleconosco.css';


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

    sendFormContato(evento) {       
        evento.preventDefault();
        this.setState({
            ajaxErrorResp: "",
            ajaxSuccessResp: ""
        });
        
        var nomeValue = $("input[name='nome']").val();
        var emailValue = $("input[name='email']").val();
        var messageValue = $("textarea[id='textareaMessage']").val();

       if(nomeValue==="" || emailValue==="" || messageValue===""){
            this.setState({ajaxErrorResp: "Favor preencha todos os campos!"});
        }else{
            this.setState({loading: true});

            var textJSON = `{
                "name":"${nomeValue}",
                "email":"${emailValue}",
                "message":"${messageValue}"
            }`;
            var textJSON2 = JSON.parse(textJSON);
            var dataString = JSON.stringify(textJSON2);

            $.ajax({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/email/enviaEmailContato.php`,
                type: 'post',
                contentType : 'application/json',
                data: dataString,
                success: function(resposta){
                    // console.log(resposta);
                    // console.log(resposta.name);
                    
                    this.setState({ajaxSuccessResp: resposta.message.toString()});
                    this.setState({loading: false});
                }.bind(this),
                error: function(xhr, status, err){
                    console.error(status, err.toString());
                    console.log(JSON.parse(xhr.responseText));

                    console.log(JSON.parse(xhr.responseText).error.toString());

                    this.setState({
                        ajaxErrorResp: JSON.parse(xhr.responseText).message.toString(),
                        ajaxSuccessResp: '0'
                    });
                    this.setState({loading: false});
                }.bind(this)
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
                        onSubmit={function(event){
                            this.sendFormContato(event,  this.props.userJWT)}.bind(this)
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