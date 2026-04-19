import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../css/common/header.css';
import routes from '../util/Routes';

import logo from '../../imgs/logo.png';
import UserNavBar from './UserNavBar';
import Avatar from '../util/Avatar';

function SiteHeader() {
    const [UserNavBarVisible, setUserNavBarVisible] = useState(false);
    const [NavBarVisible, setNavbarVisible] = useState(false);

    const userName = useSelector((state) => state.auth.userName);

    const toggleUserNavBar = () => {
        setUserNavBarVisible(!UserNavBarVisible);
    };

    const toggleNavBar = () => {
        setNavbarVisible(!NavBarVisible);
    };

    const checkIfUserIsLoggedIn = () => {
        if (userName !== '') {
            return (
                <div className={NavBarVisible ? 'header-right showMenu' : 'header-right'}>
                    <nav className="menu">
                        <Link className="menuItem" to={routes.sendToChampionships()}>
                            Campeonatos
                        </Link>
                        <Link className="menuItem" to={routes.sendToPools()}>
                            Bolões
                        </Link>
                    </nav>
                    <div className="navUser-menuContainer">

                        <div className="navUser-container" onClick={toggleUserNavBar}>
                            <div className="user-avatar">
                                <Avatar userName={userName} />
                            </div>
                            <p className="user-name">
                                {userName}
                            </p>
                        </div>

                        <UserNavBar visible={UserNavBarVisible} />

                    </div>
                </div>
            );
        } else {
            return (
                <div className={NavBarVisible ? 'header-right showMenu' : 'header-right'}>
                    <nav className="menu">
                        <Link className="menuItem" to={routes.sendToChampionships()}>
                            Campeonatos
                        </Link>
                        <Link className="menuItem" to={routes.sendToRules()}>
                            Regulamento
                        </Link>
                        <Link className="menuItem" to={routes.sendToContact()}>
                            Fale Conosco
                        </Link>
                    </nav>
                    <div className="user-login">
                        <Link className="menuItem" to={routes.sendToUserRegister()}>
                            Cadastrar
                        </Link>
                        <Link className="menuItem" to={routes.sendToUserLogin()}>
                            Login
                        </Link>
                    </div>
                </div>
            );
        }
    };

    return (
        <header className="header">
            <Link className="logo-container" to={routes.sendToHome()}>
                <img className="logo" alt="" src={logo} />
                <h1 className="logoName">Bolão</h1>
            </Link>

            <div className={NavBarVisible ? 'menuToggle close' : 'menuToggle'} onClick={toggleNavBar}>
                MENU
                <div className="hamburgerMenu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            {checkIfUserIsLoggedIn()}

        </header>
    );
}

export default SiteHeader;
