import React, { Component } from 'react';
import '../../css/pages/user.css';
import '../../css/util/formMessage.css';
import $ from 'jquery';
import Loading from '../util/Loading';

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
    
    sendFormUpdateInfo(evento, userJWT) {
        const { updateJWT } = this.props;
        
        evento.preventDefault();
        this.setState({
            ajax1ErrorResp: "",
            ajax1SuccessResp: ""
        });
        
        var nomeValue = $("input[name='nome']").val();
        var emailValue = $("input[name='email']").val();

        if(nomeValue===this.props.userName && emailValue===this.props.userEmail){
            this.setState({ajax1ErrorResp: "Você deve modificar pelo menos um dos campos!"});
        }else{
            this.setState({loading1: true});

            var textJSON = `{
                "type":"nopass",
                "name":"${nomeValue}",
                "email":"${emailValue}",
                "jwt":"${userJWT}"
            }`;
            var textJSON2 = JSON.parse(textJSON);
            var dataString = JSON.stringify(textJSON2);
            
            $.ajax({
                url:"../rest-api/update_user.php",
                type: 'post',
                contentType : 'application/json',
                data: dataString,
                success: function(resposta){
                    // console.log(resposta);
                    // console.log(resposta.name);

                    var userInfo = {
                        userName: resposta.name, 
                        userEmail: resposta.email,
                        userID: resposta.id,
                        userImg: resposta.imagePath,
                        userJWT: resposta.jwt
                    };
                    updateJWT(userInfo);
                    
                    this.setState({ajax1SuccessResp: resposta.message.toString()});
                    this.setState({loading1: false});
                }.bind(this),
                error: function(xhr, status, err){

                    console.error(status, err.toString());

                    // console.log(xhr.responseText);
                    console.log(JSON.parse(xhr.responseText));
                    
                    // console.log(JSON.parse(xhr.responseText).message);
                    this.setState({
                        ajax1ErrorResp: JSON.parse(xhr.responseText).message.toString(),
                        ajax1SuccessResp: '0'
                    });
                    this.setState({loading1: false});
                }.bind(this)
            });
        }


    }

    sendFormChangePassword(evento, userJWT) {
        evento.preventDefault();
        this.setState({
            ajax2ErrorResp: "",
            ajax2SuccessResp: ""
        });
        
        
        var senhaValue = $("input[name='senha']").val();
        var senhaConfirmarValue = $("input[name='senhaCheck']").val();

        if(senhaValue==="" && senhaConfirmarValue===""){
            this.setState({ajax2ErrorResp: "Favor preencher ambos os campos!"});
        }else if(senhaValue!==senhaConfirmarValue){
            this.setState({ajax2ErrorResp: "Senhas precisam ser idênticas."});
        }else{
            this.setState({loading2: true});
            var textJSON = `{
                "type":"pass",
                "password":"${senhaValue}",
                "jwt":"${userJWT}"
            }`;
            var textJSON2 = JSON.parse(textJSON);
            var dataString = JSON.stringify(textJSON2);
            
            $.ajax({
                url:"../rest-api/update_user.php",
                type: 'post',
                contentType : 'application/json',
                data: dataString,
                success: function(resposta){
                    // console.log(resposta);
                    
                    this.setState({ajax2SuccessResp: resposta.message.toString()});
                    this.setState({loading2: false});
                }.bind(this),
                error: function(xhr, status, err){

                    console.error(status, err.toString());

                    // console.log(xhr.responseText);
                    console.log(JSON.parse(xhr.responseText));
                    
                    // console.log(JSON.parse(xhr.responseText).message);
                    this.setState({
                        ajax2ErrorResp: JSON.parse(xhr.responseText).message.toString(),
                        ajax2SuccessResp: '0'
                    });
                    this.setState({loading2: false});
                }.bind(this)
            });
        }
    }
    
    sendFormUploadImage(evento, userJWT) {
        const { updateImage } = this.props;

        evento.preventDefault();
        this.setState({
            ajax3ErrorResp: "",
            ajax3SuccessResp: ""
        });

        if(this.state.selectedFile===undefined || this.state.selectedFile===this.props.userImg){
            this.setState({ajax3ErrorResp: "Você deve incluir uma nova foto antes!"});
        }else{
            // console.log(this.state.selectedFile);
            this.setState({loading3: true});

            var img = this.state.selectedFile;
            var formData = new FormData();
            formData.append("file", img);
            formData.append("jwt", userJWT);
            
            $.ajax({
                url:"../rest-api/uploadAvatar.php",
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function(resposta){
                    // console.log(resposta);
                    
                    // URL.revokeObjectURL(imageURL);

                    var userInfo = {
                        userImg: resposta.userImg
                    };
                    updateImage(userInfo);
                    
                    this.setState({ajax3SuccessResp: resposta.message.toString()});
                    this.setState({loading3: false});
                }.bind(this),
                error: function(xhr, status, err){

                    console.error(status, err.toString());

                    // console.log(xhr.responseText);
                    console.log(JSON.parse(xhr.responseText));
                    
                    // console.log(JSON.parse(xhr.responseText).message);
                    this.setState({
                        ajax3ErrorResp: JSON.parse(xhr.responseText).message.toString(),
                        ajax3SuccessResp: '0'
                    });
                    this.setState({loaging3: false});

                }.bind(this)
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
                        onSubmit={function(event){
                            this.sendFormUploadImage(event,  this.props.userJWT)}.bind(this)
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
                        onSubmit={function(event){
                            this.sendFormUpdateInfo(event,  this.props.userJWT)}.bind(this)
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
                        onSubmit={function(event){
                            this.sendFormChangePassword(event,  this.props.userJWT)}.bind(this)
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