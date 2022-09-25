import React, { Component } from 'react';
import '../../css/common/userNavBar.css';
import { Link } from 'react-router-dom';

import SetCookie from '../util/setCookie';

import { bindActionCreators } from 'redux';
import { updateJWT } from '../../actions';
import { connect } from 'react-redux';

class UserNavBar extends Component {
    logout(){
        const { updateJWT } = this.props;

        var userInfo = {
            userName: '', 
            userEmail:'',
            userID: '',
            userImg: '',
            userRole: '',
            userJWT: ''
        };
        updateJWT(userInfo);
        
        // SetCookie("userLogin", JSON.stringify(userInfo), 0);
        SetCookie("userLogin", "", 0);
    }
    
    showAdminLink(){
        if(this.props.userRole==='admin'){
            return(
                <Link to="/admin" className="navUser-container">
                    Admin
                </Link>
            );
        }
    }

    render() {
        return (
            <div className={this.props.visible?"userNavBar-container -show":"userNavBar-container -hide"}>
                <Link to="/user/config" className="navUser-container">
                    Configurações
                </Link>
                
                {this.showAdminLink()}

                <a className="navUser-container" onClick={this.logout.bind(this)}>
                    Sair
                </a>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    userRole: store.AuthJWTState.userRole
});

const mapDispatchToProps = dispatch => 
bindActionCreators({ updateJWT }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserNavBar);