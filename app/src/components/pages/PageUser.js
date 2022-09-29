import React, { Component } from 'react';
import '../../css/pages/user.css';
import '../../css/util/formMessage.css';
import $ from 'jquery';
import Loading from '../util/Loading';

import http from '../../util/http';

import { bindActionCreators } from 'redux';
import { updateJWT, updateImage } from '../../actions';
import { connect } from 'react-redux';

import Avatar from '../../imgs/avatar.png';
import editIcon from '../../imgs/icons/edit-solid.svg';

import MaterialTextInput from '../util/MaterialTextInput';

class PageUser extends Component {
    constructor() {
        super();
        this.state = {
            ajax1ErrorResp: '',
            ajax1SuccessResp: '',
            ajax2ErrorResp: '',
            ajax2SuccessResp: '',
            ajax3ErrorResp:'',
            ajax3SuccessResp: ''
        };
    }

    async sendFormUpdateInfo(evento, userJWT) {
        const { updateJWT } = this.props;

        evento.preventDefault();

        this.setState({
            ajax1ErrorResp: "",
            ajax1SuccessResp: ""
        });

        const nomeValue = $("input[name='nome']").val();
        const emailValue = $("input[name='email']").val();

        if(nomeValue===this.props.userName && emailValue===this.props.userEmail){
            this.setState({ajax1ErrorResp: "Você deve modificar pelo menos um dos campos!"});
        }else{
            this.setState({ loading1: true });

            const dataString = JSON.stringify({
                type: 'nopass',
                name: nomeValue,
                email: emailValue,
                jwt: userJWT
            });

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/update.php`,
                data: dataString,
                thenCallback: (response) => {
                    updateJWT({
                        userName: response.name, 
                        userEmail: response.email,
                        userID: response.id,
                        userImg: response.userImg,
                        userJWT: response.jwt
                    });

                    this.setState({ ajax1SuccessResp: response.message.toString() });
                    this.setState({ loading1: false });
                },
                catchCallback: ({ message }) => {
                    this.setState({
                        ajax1ErrorResp: message,
                        ajax1SuccessResp: '0'
                    });

                    this.setState({ loading1: false });
                }
            });
        }
    }

    async sendFormChangePassword(evento, userJWT) {
        evento.preventDefault();

        this.setState({
            ajax2ErrorResp: "",
            ajax2SuccessResp: ""
        });

        const senhaValue = $("input[name='senha']").val();
        const senhaConfirmarValue = $("input[name='senhaCheck']").val();

        if(senhaValue==="" && senhaConfirmarValue===""){
            this.setState({ajax2ErrorResp: "Favor preencher ambos os campos!"});
        }else if(senhaValue!==senhaConfirmarValue){
            this.setState({ajax2ErrorResp: "Senhas precisam ser idênticas."});
        }else{
            this.setState({ loading2: true });

            const dataString = JSON.stringify({
                type: 'pass',
                password: senhaValue,
                jwt: userJWT
            });

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/update.php`,
                data: dataString,
                thenCallback: (response) => {
                    this.setState({ ajax2SuccessResp: response.message.toString() });
                    this.setState({ loading2: false });
                },
                catchCallback: ({ message }) => {
                    this.setState({
                        ajax2ErrorResp: message,
                        ajax2SuccessResp: '0'
                    });

                    this.setState({ loading2: false });
                }
            });
        }
    }

    async sendFormUploadImage(evento, userJWT) {
        const { updateImage } = this.props;

        evento.preventDefault();
        this.setState({
            ajax3ErrorResp: "",
            ajax3SuccessResp: ""
        });

        if(this.state.selectedFile===undefined || this.state.selectedFile===this.props.userImg){
            this.setState({ajax3ErrorResp: "Você deve incluir uma nova foto antes!"});
        }else{
            this.setState({ loading3: true });

            const img = this.state.selectedFile;
            const formData = new FormData();
            formData.append("file", img);
            formData.append("jwt", userJWT);

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/uploadAvatar.php`,
                data: formData,
                thenCallback: (response) => {
                    updateImage({ userImg: response.userImg });

                    this.setState({ ajax3SuccessResp: response.message.toString() });
                    this.setState({ loading3: false });
                },
                catchCallback: ({ message }) => {
                    this.setState({
                        ajax3ErrorResp: message,
                        ajax3SuccessResp: '0'
                    });

                    this.setState({ loading3: false });
                }
            });
        }
    }

    showForm1Messages() {
        if(this.state.ajax1ErrorResp === '' && this.state.ajax1SuccessResp === ''){
            return (
                null
            );
        }else if (this.state.ajax1ErrorResp !== ''){
            return(
                <div className="FormMessage -error">
                    {this.state.ajax1ErrorResp}
                </div>
            );
        }else if (this.state.ajax1SuccessResp !== ''){
            return(
                <div className="FormMessage -success">
                    {this.state.ajax1SuccessResp}
                </div>
            );
        }
    }
    
    showForm2Messages() {
        if(this.state.ajax2ErrorResp === '' && this.state.ajax2SuccessResp === ''){
            return (
                null
            );
        }else if (this.state.ajax2ErrorResp !== ''){
            return(
                <div className="FormMessage -error">
                    {this.state.ajax2ErrorResp}
                </div>
            );
        }else if (this.state.ajax2SuccessResp !== ''){
            return(
                <div className="FormMessage -success">
                    {this.state.ajax2SuccessResp}
                </div>
            );
        }
    }

    showForm3Messages() {
        if(this.state.ajax3ErrorResp === '' && this.state.ajax3SuccessResp === ''){
            return (
                null
            );
        }else if (this.state.ajax3ErrorResp !== ''){
            return(
                <div className="FormMessage -error">
                    {this.state.ajax3ErrorResp}
                </div>
            );
        }else if (this.state.ajax3SuccessResp !== ''){
            return(
                <div className="FormMessage -success">
                    {this.state.ajax3SuccessResp}
                </div>
            );
        }
    }
    
    fileChangedHandler = (event) => {
        var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if(this.props.selectedFile !== event.target.files[0] && $.inArray(event.target.files[0].type, ValidImageTypes) > 0){
            var imageURL = URL.createObjectURL(event.target.files[0]);
            this.setState({
                selectedFileURL: imageURL,
                selectedFile: event.target.files[0]
            });
        }
    }
    
    render() {
        return (
            <div className="userPage-container">

                <div className="userPage-userInfo">
                    <form 
                        className="userInfo"
                        onSubmit={async function(event){
                            await this.sendFormUploadImage(event,  this.props.userJWT)}.bind(this)
                        } 
                        method="post" 
                        encType='multipart/form-data'
                    >
                        <div className="userInfo-imgContainer">
                            <div className="userInfo-img">
                                <input type="file" id='selectImage' onChange={this.fileChangedHandler} accept="image/*" data-type='image'/>
                                <label className='selectImageLabel' htmlFor="selectImage"><img src={editIcon} alt="Edit icon"/></label>

                                <img src={
                                    this.state.selectedFileURL ?
                                    this.state.selectedFileURL
                                        :this.props.userImg ?
                                            this.props.userImg
                                            :Avatar
                                } alt="avatar"/>
                            </div>
                        </div>

                        <div className="userInfo-title page-title">
                            <input 
                                type="submit" 
                                className="SendButton" 
                                value="Upload"
                            />
                            <Loading loading={this.state.loading3}/>
                            {this.showForm3Messages()}
                        </div>
                    </form>

                    <form 
                        className="userInfo"
                        onSubmit={async function(event){
                            await this.sendFormUpdateInfo(event,  this.props.userJWT)}.bind(this)
                        } 
                        method="post"
                    >
                        <div className="userInfo-otherInfo">
                            <MaterialTextInput 
                                labelName="Nome e Sobrenome"
                                fieldName="nome"
                                fieldType="text"
                                fieldRequired="no"
                                fieldPlaceholder={this.props.userName}
                            />

                            <MaterialTextInput 
                                labelName="E-mail"
                                fieldName="email"
                                fieldType="email"
                                fieldRequired="no"
                                fieldPlaceholder={this.props.userEmail}
                            />

                            <input 
                                type="submit" 
                                className="SendButton" 
                                value="Atualizar"
                            />

                            <Loading loading={this.state.loading1}/>
                            {this.showForm1Messages()}
                        </div>
                    </form>
                    
                    <form 
                        className="userInfo"
                        onSubmit={async function(event){
                            await this.sendFormChangePassword(event,  this.props.userJWT)}.bind(this)
                        } 
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

                            <Loading loading={this.state.loading2}/>
                            {this.showForm2Messages()}
                        </div>
                    </form>


                </div>

            </div>
        );
    }
}

const mapStateToProps = store => ({
    userName: store.AuthJWTState.userName,
    userEmail: store.AuthJWTState.userEmail,
    userImg: store.AuthJWTState.userImg,
    userJWT: store.AuthJWTState.userJWT
});

const mapDispatchToProps = dispatch => 
bindActionCreators({ updateJWT, updateImage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageUser);