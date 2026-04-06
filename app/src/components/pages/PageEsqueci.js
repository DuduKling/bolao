import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/pages/login.css';

import http from '../../util/http';
import cookie from '../../util/cookie';

import MaterialTextInput from '../util/MaterialTextInput';
import Canvas from '../home/Canvas';
import Fingerprint from '../../util/fingerprint';

import { useDispatch } from 'react-redux';
import { updateJWT } from '../../redux/slicer/authSlicer';

function PageEsqueci() {
    const [ajaxErrorResp, setAjaxErrorResp] = useState('');
    const [ajaxSuccessResp, setAjaxSuccessResp] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [phoneNumberValue, setPhoneNumberValue] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const sendFormAjax = async (evento) => {
        evento.preventDefault();

        setAjaxSuccessResp('');
        setAjaxErrorResp('');

        const dataString = JSON.stringify({
            name: nameValue.trim(),
            phoneNumber: phoneNumberValue,
            fingerprint: await Fingerprint.get(),
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/redefinirAcesso.php`,
            data: dataString,
        })
            .then((response) => {
                dispatch(updateJWT({
                    userName: response.name,
                    userPhoneNumber: response.phoneNumber,
                    userRole: response.role,
                    userJWT: response.jwt,
                }));

                cookie.set('userJWT', response.jwt, 7);

                navigate('/user/campeonatos');
            })
            .catch(({ message }) => {
                setAjaxErrorResp(message);
                setAjaxSuccessResp('0');
            });
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2>Perdi o acesso</h2>

                <form
                    className="form"
                    onSubmit={(event) => sendFormAjax(event)}
                    method="post"
                >
                    <p>Confirme seus dados:</p>

                    <MaterialTextInput
                        labelName="Nome"
                        fieldName="name"
                        fieldType="text"
                        fieldController={setNameValue}
                    />

                    <MaterialTextInput
                        labelName="Telefone"
                        fieldName="phoneNumber"
                        fieldType="tel"
                        maxLength="11"
                        fieldController={setPhoneNumberValue}
                    />

                    <input
                        type="submit"
                        className="SendButton"
                        value="Quero acessar"
                    />
                </form>

                {showFormMessages()}

                <p>Na dúvida entre em contato com o Administrador.</p>
            </div>
            <Canvas />
        </div>
    );

}

export default PageEsqueci;
