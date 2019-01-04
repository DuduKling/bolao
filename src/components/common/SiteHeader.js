import React, { Component } from 'react';
import '../../css/common/header.css';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../imgs/logo.png';
import Avatar from '../../imgs/avatar.png';
import UserNavBar from './UserNavBar';


class SiteHeader extends Component {
    constructor() {
        super();
        this.state = {
            UserNavBarVisible: false
        };
    }

    componentWillMount(){
        this.setState({
            UserNavBarVisible:  false
        }); 
    }

    toggleUserNavBar(){
        this.setState({
            UserNavBarVisible: !this.state.UserNavBarVisible
        }); 
    }

    checkIfUserIsLoggedIn(){
        if(this.props.userName!==""){
            return(
                <div className="header-right">
                    <nav className="menu">
                        <NavLink className="menuItem" to="/user/campeonatos">
                        Campeonatos
                        </NavLink>
                    </nav>
                    <div className="navUser-menuContainer">

                        <div className="navUser-container" onClick={this.toggleUserNavBar.bind(this)}>
                            <div className="user-avatar">
                                <img className="avatar" alt="" src={this.props.userImg ?
                                    this.props.userImg
                                    :Avatar}/>
                            </div>
                            <p className="user-name">
                                {this.props.userName}
                            </p>
                        </div>

                        <UserNavBar visible={this.state.UserNavBarVisible} />

                    </div>
                </div>
                
            );
        }else{
            return(
                <div className="header-right">
                    <nav className="menu">
                        <NavLink className="menuItem" to="/regulamento">
                            Regulamento
                        </NavLink>
                        <NavLink className="menuItem" to="/">
                            Fale Conosco
                        </NavLink>
                    </nav>
                    <div className="user-login">
                        {/*// TODO login com Facebook? */}
                        <NavLink className="menuItem" to="/user/cadastrar">
                            Cadastrar
                        </NavLink>
                        <NavLink className="menuItem" to="/user/login">
                            Login
                        </NavLink>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <header className="header">
                <Link className="logo-container" to="/">
                    <img className="logo" alt="" src={logo}/>
                    <h1 className="logoName">Bolão</h1>
                </Link>

                {this.checkIfUserIsLoggedIn()}

            </header>
        );
    }
}

const mapStateToProps = store => ({
    userName: store.AuthJWTState.userName,
    userImg: store.AuthJWTState.userImg
});

export default connect(mapStateToProps)(SiteHeader);