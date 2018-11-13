import React, { Component } from 'react';
import '../../css/common/header.css';

import logo from '../../imgs/logo.png';
import avatar from '../../imgs/avatar.png';

import { Link, NavLink } from 'react-router-dom';

class SiteHeader extends Component {
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
                            Histórico
                        </NavLink>
                        <NavLink className="menuItem" to="/regulamento">
                            Regulamento
                        </NavLink>
                        <NavLink className="menuItem" to="/">
                            Fale Conosco
                        </NavLink>
                    </nav>

                    <div className="user-container">
                        <div className="user-avatar">
                            <img className="avatar" alt="" src={avatar}/>
                        </div>
                        <p className="user-name">
                            PrimeiroNome
                        </p>
                    </div>

                    <div className="user-login">
                        {/*// TODO login com Facebook? */}
                        <Link className="menuItem" to="/user/cadastrar">
                            Cadastrar
                        </Link>
                        <Link className="menuItem" to="/user/login">
                            Login
                        </Link>
                    </div>
                </div>
            </header>
        );
    }
}

export default SiteHeader;