import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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

    const params = useParams();

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

    const sendPasswdForm = async (evento) => {
        evento.preventDefault();

        setAjaxErrorResp('');
        setAjaxSuccessResp('');

        const userJWT = params.jwtCode;
        const userID = params.id;

        const senhaValue = $('input[name=\'senha\']').val();
        const senhaConfirmarValue = $('input[name=\'senhaCheck\']').val();

        if (senhaValue === '' && senhaConfirmarValue === '') {
            setAjaxErrorResp('Favor preencher ambos os campos!');
        } else if (senhaValue !== senhaConfirmarValue) {
            setAjaxErrorResp('Senhas precisam ser idênticas.');
        } else {
            setLoading(true);

            const dataString = JSON.stringify({
                type: 'resetPass',
                password: senhaValue,
                id: userID,
                jwt: userJWT,
            });

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/update.php`,
                data: dataString,
                thenCallback: (response) => {
                    setAjaxSuccessResp(response.message.toString());
                    setLoading(false);
                },
                catchCallback: ({ message }) => {
                    setAjaxErrorResp(message);
                    setAjaxSuccessResp('');

                    setLoading(false);
                },
            });
        }
    };

    const showPasswdForm = () => {
        if (ajaxSuccessResp === '') {
            return (
                <form
                    className="form"
                    onSubmit={(event) => sendPasswdForm(event)}
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
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2>Redefinir senha</h2>

                {showPasswdForm()}

                <Loading loading={loading} />

                {showFormMessages()}
            </div>
            <Canvas />
        </div>
    );
}

export default PageEsqueci;
