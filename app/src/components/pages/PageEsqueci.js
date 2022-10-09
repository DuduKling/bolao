import React, { useState } from 'react';
import $ from 'jquery';

import '../../css/pages/login.css';

import http from '../../util/http';

import MaterialTextInput from '../util/MaterialTextInput';
import Canvas from '../home/Canvas';

import Loading from '../util/Loading';

function PageEsqueci() {
    const [ajaxErrorResp, setAjaxErrorResp] = useState('');
    const [ajaxSuccessResp, setAjaxSuccessResp] = useState('');
    const [loading, setLoading] = useState(false);

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

    const sendEmailForm = async (evento) => {
        evento.preventDefault();

        setAjaxSuccessResp('');
        setAjaxErrorResp('');
        setLoading(false);

        const emailValue = $('input[name=\'email\']').val();

        const dataString = JSON.stringify({
            email: emailValue,
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/email/enviaEmailRedefinir.php`,
            data: dataString,
            thenCallback: (response) => {
                setAjaxSuccessResp(response.message.toString());
                setLoading(false);
            },
            catchCallback: ({ message }) => {
                setAjaxErrorResp(message);
                setLoading(false);
            },
        });
    };

    const showEmailForm = () => {
        if (ajaxSuccessResp === '') {
            return (
                <form
                    className="form"
                    onSubmit={(event) => sendEmailForm(event)}
                    method="post"
                >
                    <p>Confirme seu e-mail:</p>

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
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2>Esqueci a senha</h2>

                {showEmailForm()}

                <Loading loading={loading} />

                {showFormMessages()}
            </div>
            <Canvas />
        </div>
    );

}

export default PageEsqueci;
