import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import $ from 'jquery';

import '../../css/pages/login.css';
import '../../css/util/formMessage.css';

import http from '../../util/http';
import setCookie from '../../util/setCookie';

import MaterialTextInput from '../util/MaterialTextInput';
import Canvas from '../home/Canvas';

import { useDispatch } from 'react-redux';
import { updateJWT } from '../../redux/slicer/authSlicer';

function PageLogin() {
    const [ajaxErrorResp, setAjaxErrorResp] = useState('');
    const [ajaxSuccessResp, setAjaxSuccessResp] = useState('');

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fixPageName = () => {
        let pathName = '' + params.typeOfLogin;
        pathName = pathName.charAt(0).toUpperCase() + pathName.slice(1);
        return (
            <h2>{pathName}</h2>
        );
    };

    const CheckIfFormCadastrar1 = () => {
        if (params.typeOfLogin === 'cadastrar') {
            return (
                <MaterialTextInput
                    labelName="Nome e Sobrenome"
                    fieldName="nome"
                    fieldType="text"
                />
            );
        }
    };

    const CheckIfFormCadastrar2 = () => {
        if (params.typeOfLogin === 'cadastrar') {
            return (
                <MaterialTextInput
                    labelName="Confirmar Senha"
                    fieldName="senhaCheck"
                    fieldType="password"
                />
            );
        }
    };

    const SetButtonName = () => {
        if (params.typeOfLogin === 'cadastrar') {
            return (
                'Enviar'
            );
        } else {
            return (
                'Entrar'
            );
        }
    };

    const CheckIfFormLogin = () => {
        if (params.typeOfLogin === 'login') {
            return (
                <div className="checkbox-container">
                    <label className="pure-material-checkbox">
                        <input type="checkbox" name="keepLogin" value="keepLogin" className="checkbox" id="keepLogin" />
                        <span>Mantenha-me logado!</span>
                    </label>
                </div>
            );
        }
    };

    const CheckIfFormLogin2ForEsqueciASenha = () => {
        if (params.typeOfLogin === 'login') {
            return (
                <Link className="menuItem" to="/user/esqueci">
                    Esqueci a senha
                </Link>
            );
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

    const sendFormAjax = async (evento) => {
        evento.preventDefault();

        setAjaxErrorResp('');
        setAjaxSuccessResp('');

        const nomeValue = $('input[name=\'nome\']').val();
        const emailValue = $('input[name=\'email\']').val();
        const senhaValue = $('input[name=\'senha\']').val();
        const senhaConfirmarValue = $('input[name=\'senhaCheck\']').val();
        const keeplogin = $('input#keepLogin');

        const typeOfLogin = params.typeOfLogin;

        if (typeOfLogin === 'login') {
            await logar(emailValue, senhaValue, keeplogin);
        } else if (typeOfLogin === 'cadastrar') {
            await cadastrar(nomeValue, emailValue, senhaValue, senhaConfirmarValue);
        }
    };

    const logar = async (emailValue, senhaValue, keeplogin) => {
        if (emailValue === '' || senhaValue === '') {
            setAjaxErrorResp('Favor preencha todos os campos!');
        } else {
            const dataString = JSON.stringify({
                email: emailValue,
                password: senhaValue,
            });

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/login.php`,
                data: dataString,
                thenCallback: (response) => {
                    dispatch(updateJWT({
                        userName: response.name,
                        userEmail: response.email,
                        userID: response.id,
                        userImg: response.imagePath,
                        userRole: response.userRole,
                        userJWT: response.jwt,
                    }));

                    if (keeplogin.is(':checked')) {
                        setCookie('userLogin', response.jwt, 7);
                    } else {
                        setCookie('userLogin', response.jwt, 0);
                    }

                    navigate('/user/campeonatos');
                },
                catchCallback: ({ message }) => {
                    setAjaxErrorResp(message);
                    setAjaxSuccessResp('0');
                },
            });
        }
    };

    const cadastrar = async (nomeValue, emailValue, senhaValue, senhaConfirmarValue) => {
        if (nomeValue === '' || emailValue === '' || senhaValue === '' || senhaConfirmarValue === '') {
            setAjaxErrorResp('Favor preencha todos os campos!');
        } else if (senhaValue !== senhaConfirmarValue) {
            setAjaxErrorResp('Senhas precisam ser idênticas.');
        } else {
            const dataString = JSON.stringify({
                completename: nomeValue.trim(),
                email: emailValue,
                password: senhaValue,
            });

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/create.php`,
                data: dataString,
                thenCallback: (response) => {
                    setAjaxSuccessResp(response.message);

                    navigate('/user/login');
                },
                catchCallback: ({ message }) => {
                    setAjaxErrorResp(message);
                    setAjaxSuccessResp('0');
                },
            });
        }
    };

    return (
        <div className="login-container">
            <div className="form-container">
                {fixPageName()}

                <form
                    className="form"
                    onSubmit={(event) => sendFormAjax(event)}
                    method="post"
                >

                    {showFormMessages()}

                    {CheckIfFormCadastrar1()}

                    <MaterialTextInput
                        labelName="E-mail"
                        fieldName="email"
                        fieldType="email"
                    />

                    <MaterialTextInput
                        labelName="Senha"
                        fieldName="senha"
                        fieldType="password"
                    />

                    {CheckIfFormCadastrar2()}

                    {CheckIfFormLogin()}

                    <input
                        type="submit"
                        className="SendButton"
                        value={SetButtonName()}
                    />

                    {CheckIfFormLogin2ForEsqueciASenha()}

                </form>
            </div>

            <Canvas />

        </div>
    );
}

export default PageLogin;
