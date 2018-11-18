import React, { Component } from 'react';
import '../../css/common/header.css';
import { connect } from 'react-redux';

import logo from '../../imgs/logo.png';
import avatar from '../../imgs/avatar.png';

import { Link, NavLink } from 'react-router-dom';

class SiteHeader extends Component {
    checkIfUserIsLoggedIn(){
        if(this.props.userName!==""){
            return(
                <div className="user-container">
                    <div className="user-avatar">
                        <img className="avatar" alt="" src={avatar}/>
                    </div>
                    <p className="user-name">
                        {this.props.userName}
                    </p>
                </div>
            );
        }else{
            return(
                <div className="user-login">
                    {/*// TODO login com Facebook? */}
                    <Link className="menuItem" to="/user/cadastrar">
                        Cadastrar
                    </Link>
                    <Link className="menuItem" to="/user/login">
                        Login
                    </Link>
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

                <div className="header-right">
                    <nav className="menu">
                        <NavLink className="menuItem" to="/0/apostar">
                            Apostar
                        </NavLink>
                        <NavLink className="menuItem" to="/0/admin">
                            Admin
                        </NavLink>
                        <NavLink className="menuItem" to="/0/jogos">
                            Fixtures
                        </NavLink>
                        <NavLink className="menuItem" to="/0/dashboard">
                            Dashboard
                        </NavLink>
                        <NavLink className="menuItem" to="/regulamento">
                            Regulamento
                        </NavLink>
                        

                        {/*

                        <NavLink className="menuItem" to="/0/jogo/1">
                            Apostado Jogo
                        </NavLink>

                        <NavLink className="menuItem" to="/0/apostado/pessoa">
                            Apostado
                        </NavLink>

                        <NavLink className="menuItem" to="/">
                            Fale Conosco
                        </NavLink>

                        */}
                    </nav>

                    {this.checkIfUserIsLoggedIn()}
                    
                </div>
            </header>
        );
    }
}

const mapStateToProps = store => ({
    userName: store.AuthJWTState.userName
});

export default connect(mapStateToProps)(SiteHeader);