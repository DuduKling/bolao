import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/pages/login.css';
import '../../css/util/formMessage.css';

import http from '../../util/http';

import MaterialTextInput from '../util/MaterialTextInput';
import Canvas from '../home/Canvas';
import Fingerprint from '../../util/fingerprint';

import { useDispatch } from 'react-redux';
import { updateJWT } from '../../redux/slicer/authSlicer';

function PageUserCadastros() {
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

        setAjaxErrorResp('');
        setAjaxSuccessResp('');

        await cadastrar();
    };

    const cadastrar = async () => {
        if (nameValue === '' || phoneNumberValue === '') {
            setAjaxErrorResp('Favor preencha todos os campos!');
        } else {
            const dataString = JSON.stringify({
                name: nameValue.trim(),
                phoneNumber: phoneNumberValue,
                fingerprint: await Fingerprint.get(),
            });

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/create.php`,
                data: dataString,
                withCredentials: true,
            })
                .then((response) => {
                    dispatch(updateJWT({
                        userUuid: response.uuid,
                        userName: response.name,
                        userPhoneNumber: response.phoneNumber,
                        userRole: response.role,
                        userJWT: response.jwt,
                    }));

                    navigate('/pools');
                })
                .catch(({ message }) => {
                    setAjaxErrorResp(message);
                    setAjaxSuccessResp('0');
                });
        }
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2>Cadastrar</h2>

                <form
                    className="form"
                    onSubmit={(event) => sendFormAjax(event)}
                    method="post"
                >

                    {showFormMessages()}

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
                        value="Entrar"
                    />
                </form>

            </div>

            <Canvas />

        </div>
    );
}

export default PageUserCadastros;
