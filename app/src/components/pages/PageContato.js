import React, { useState } from 'react';
import $ from 'jquery';

import '../../css/faleconosco.css';

import http from '../../util/http';
import MaterialTextInput from '../util/MaterialTextInput';
import Loading from '../util/Loading';

import PropTypes from 'prop-types';

function PageContato() {
    const [loading, setLoading] = useState(false);
    const [ajaxSuccessResp, setAjaxSuccessResp] = useState('');
    const [ajaxErrorResp, setAjaxErrorResp] = useState('');

    const sendFormContato = async (evento) => {
        evento.preventDefault();

        setAjaxErrorResp('');
        setAjaxSuccessResp('');

        const nomeValue = $('input[name=\'nome\']').val();
        const emailValue = $('input[name=\'email\']').val();
        const messageValue = $('textarea[id=\'textareaMessage\']').val();

        if (nomeValue === '' || emailValue === '' || messageValue === '') {
            setAjaxErrorResp('Favor preencha todos os campos!');
        } else {
            setLoading(true);

            const dataString = JSON.stringify({
                name: nomeValue,
                email: emailValue,
                message: messageValue,
            });

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/email/enviaEmailContato.php`,
                data: dataString,
                thenCallback: (response) => {
                    setAjaxSuccessResp(response.message.toString());

                    setLoading(false);
                },
                catchCallback: ({ message }) => {
                    setAjaxErrorResp(message);
                    setAjaxSuccessResp('0');

                    setLoading(false);
                },
            });
        }
    };

    const showFormMessages = () => {
        if (ajaxErrorResp === '' && ajaxSuccessResp === '') {
            return (
                null
            );
        } else if (ajaxErrorResp !== '') {
            return (
                <div className="FormMessage -error">
                    {ajaxErrorResp}
                </div>
            );
        } else if (ajaxSuccessResp !== '') {
            return (
                <div className="FormMessage -success">
                    {ajaxSuccessResp}
                </div>
            );
        }
    };

    const showFormContato = () => {
        if (ajaxSuccessResp !== '') {
            return (
                <div className="faleconosco">
                    <h3>Fale Conosco</h3>
                    <br /><br />
                    <div className="contatoForm">
                        {showFormMessages()}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="faleconosco">
                    <h3>Fale Conosco</h3>

                    <p>Mande suas dúvidas, problemas ou sugestões! Nós gostamos de conversar ;)</p>

                    <form
                        className="userInfo"
                        onSubmit={(event) => sendFormContato(event)}
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

                            <Loading loading={loading} />

                        </div>
                    </form>
                </div>
            );
        }
    };

    return (
        <div className="MainContent-container">
            {showFormContato()}
        </div>
    );
}

PageContato.propTypes = {
    userJWT: PropTypes.string,
};

export default PageContato;
