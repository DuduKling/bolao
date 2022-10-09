import React, { useState } from 'react';
import '../../css/pages/user.css';
import '../../css/util/formMessage.css';
import $ from 'jquery';
import Loading from '../util/Loading';

import { useDispatch, useSelector } from 'react-redux';
import { updateJWT, updateImage } from '../../redux/slicer/authSlicer';

import http from '../../util/http';

import Avatar from '../../imgs/avatar.png';
import editIcon from '../../imgs/icons/edit-solid.svg';

import MaterialTextInput from '../util/MaterialTextInput';

function PageUser() {
    const [ajax1ErrorResp, setAjax1ErrorResp] = useState('');
    const [ajax1SuccessResp, setAjax1SuccessResp] = useState('');
    const [loading1, setLoading1] = useState(false);

    const [ajax2ErrorResp, setAjax2ErrorResp] = useState('');
    const [ajax2SuccessResp, setAjax2SuccessResp] = useState('');
    const [loading2, setLoading2] = useState(false);

    const [ajax3ErrorResp, setAjax3ErrorResp] = useState('');
    const [ajax3SuccessResp, setAjax3SuccessResp] = useState('');
    const [loading3, setLoading3] = useState(false);

    const [selectedFileURL, setSelectedFileURL] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    const dispatch = useDispatch();

    const userName = useSelector((state) => state.auth.userName);
    const userEmail = useSelector((state) => state.auth.userEmail);
    const userJWT = useSelector((state) => state.auth.userJWT);
    const userImg = useSelector((state) => state.auth.userImg);

    const sendFormUpdateInfo = async (evento) => {
        evento.preventDefault();

        setAjax3ErrorResp('');
        setAjax1SuccessResp('');

        const nomeValue = $('input[name=\'nome\']').val();
        const emailValue = $('input[name=\'email\']').val();

        if (nomeValue === userName && emailValue === userEmail) {
            setAjax1ErrorResp('Você deve modificar pelo menos um dos campos!');
        } else {
            setLoading1(true);

            const dataString = JSON.stringify({
                type: 'userInfo',
                name: nomeValue,
                email: emailValue,
                jwt: userJWT,
            });

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/update.php`,
                data: dataString,
                thenCallback: (response) => {
                    dispatch(updateJWT({
                        userName: response.name,
                        userEmail: response.email,
                        userID: response.id,
                        userImg: response.userImg,
                        userJWT: response.jwt,
                    }));

                    setAjax1SuccessResp(response.message.toString());

                    setLoading1(false);
                },
                catchCallback: ({ message }) => {
                    setAjax1ErrorResp(message);
                    setAjax1SuccessResp('0');

                    setLoading1(false);
                },
            });
        }
    };

    const sendFormChangePassword = async (evento) => {
        evento.preventDefault();

        setAjax2ErrorResp('');
        setAjax2SuccessResp('');

        const senhaValue = $('input[name=\'senha\']').val();
        const senhaConfirmarValue = $('input[name=\'senhaCheck\']').val();

        if (senhaValue === '' && senhaConfirmarValue === '') {
            setAjax2ErrorResp('Favor preencher ambos os campos!');
        } else if (senhaValue !== senhaConfirmarValue) {
            setAjax2ErrorResp('Senhas precisam ser idênticas.');
        } else {
            setLoading2(true);

            const dataString = JSON.stringify({
                type: 'userPassword',
                password: senhaValue,
                jwt: userJWT,
            });

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/update.php`,
                data: dataString,
                thenCallback: (response) => {
                    setAjax2SuccessResp(response.message.toString());

                    setLoading2(false);
                },
                catchCallback: ({ message }) => {
                    setAjax2ErrorResp(message);
                    setAjax2SuccessResp('0');

                    setLoading2(false);
                },
            });
        }
    };

    const sendFormUploadImage = async (evento) => {
        evento.preventDefault();

        setAjax3ErrorResp('');
        setAjax3SuccessResp('');

        if (selectedFile === undefined || selectedFile === userImg) {
            setAjax3ErrorResp('Você deve incluir uma nova foto antes!');
        } else {
            setLoading3(true);

            const img = selectedFile;
            const formData = new FormData();
            formData.append('file', img);
            formData.append('jwt', userJWT);

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/uploadAvatar.php`,
                data: formData,
                thenCallback: (response) => {
                    dispatch(updateImage({ userImg: response.userImg }));

                    setAjax3SuccessResp(response.message.toString());

                    setLoading3(false);
                },
                catchCallback: ({ message }) => {
                    setAjax3ErrorResp(message);
                    setAjax3SuccessResp('0');

                    setLoading3(false);
                },
            });
        }
    };

    const showForm1Messages = () => {
        if (ajax1ErrorResp === '' && ajax1SuccessResp === '') {
            return (
                null
            );
        } else if (ajax1ErrorResp !== '') {
            return (
                <div className="FormMessage -error">
                    {ajax1ErrorResp}
                </div>
            );
        } else if (ajax1SuccessResp !== '') {
            return (
                <div className="FormMessage -success">
                    {ajax1SuccessResp}
                </div>
            );
        }
    };

    const showForm2Messages = () => {
        if (ajax2ErrorResp === '' && ajax2SuccessResp === '') {
            return (
                null
            );
        } else if (ajax2ErrorResp !== '') {
            return (
                <div className="FormMessage -error">
                    {ajax2ErrorResp}
                </div>
            );
        } else if (ajax2SuccessResp !== '') {
            return (
                <div className="FormMessage -success">
                    {ajax2SuccessResp}
                </div>
            );
        }
    };

    const showForm3Messages = () => {
        if (ajax3ErrorResp === '' && ajax3SuccessResp === '') {
            return (
                null
            );
        } else if (ajax3ErrorResp !== '') {
            return (
                <div className="FormMessage -error">
                    {ajax3ErrorResp}
                </div>
            );
        } else if (ajax3SuccessResp !== '') {
            return (
                <div className="FormMessage -success">
                    {ajax3SuccessResp}
                </div>
            );
        }
    };

    const fileChangedHandler = (event) => {
        const ValidImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (selectedFile !== event.target.files[0] && $.inArray(event.target.files[0].type, ValidImageTypes) > 0) {
            const imageURL = URL.createObjectURL(event.target.files[0]);

            setSelectedFileURL(imageURL);
            setSelectedFile(event.target.files[0]);
        }
    };

    const chooseAvatarImage = () => {
        if (selectedFileURL) {
            return selectedFileURL;
        }

        if(userImg) {
            return userImg;
        }

        return Avatar;
    };

    return (
        <div className="userPage-container">

            <div className="userPage-userInfo">
                <form
                    className="userInfo"
                    onSubmit={(event) => sendFormUploadImage(event)}
                    method="post"
                    encType='multipart/form-data'
                >
                    <div className="userInfo-imgContainer">
                        <div className="userInfo-img">
                            <input type="file" id='selectImage' onChange={fileChangedHandler} accept="image/*" data-type='image' />
                            <label className='selectImageLabel' htmlFor="selectImage"><img src={editIcon} alt="Edit icon" /></label>

                            <img src={chooseAvatarImage()} alt="avatar" />
                        </div>
                    </div>

                    <div className="userInfo-title page-title">
                        <input
                            type="submit"
                            className="SendButton"
                            value="Upload"
                        />
                        <Loading loading={loading3} />
                        {showForm3Messages()}
                    </div>
                </form>

                <form
                    className="userInfo"
                    onSubmit={(event) => sendFormUpdateInfo(event)}
                    method="post"
                >
                    <div className="userInfo-otherInfo">
                        <MaterialTextInput
                            labelName="Nome e Sobrenome"
                            fieldName="nome"
                            fieldType="text"
                            fieldRequired={false}
                            fieldPlaceholder={userName}
                        />

                        <MaterialTextInput
                            labelName="E-mail"
                            fieldName="email"
                            fieldType="email"
                            fieldRequired={false}
                            fieldPlaceholder={userEmail}
                        />

                        <input
                            type="submit"
                            className="SendButton"
                            value="Atualizar"
                        />

                        <Loading loading={loading1} />
                        {showForm1Messages()}
                    </div>
                </form>

                <form
                    className="userInfo"
                    onSubmit={(event) => sendFormChangePassword(event)}
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

                        <Loading loading={loading2} />
                        {showForm2Messages()}
                    </div>
                </form>


            </div>

        </div>
    );
}

export default PageUser;
