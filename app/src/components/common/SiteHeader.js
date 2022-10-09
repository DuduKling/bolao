import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../css/common/header.css';

import logo from '../../imgs/logo.png';
import Avatar from '../../imgs/avatar.png';
import UserNavBar from './UserNavBar';

function SiteHeader() {
    const [UserNavBarVisible, setUserNavBarVisible] = useState(false);
    const [NavBarVisible, setNavbarVisible] = useState(false);

    const userName = useSelector((state) => state.auth.userName);
    const userImg = useSelector((state) => state.auth.userImg);

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
                        <Link className="menuItem" to="/user/campeonatos">
                            Campeonatos
                        </Link>
                    </nav>
                    <div className="navUser-menuContainer">

                        <div className="navUser-container" onClick={toggleUserNavBar}>
                            <div className="user-avatar">
                                <img className="avatar" alt="" src={userImg ?
                                    userImg
                                    : Avatar} />
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
                        <Link className="menuItem" to="/regulamento">
                            Regulamento
                        </Link>
                        <Link className="menuItem" to="/faleconosco">
                            Fale Conosco
                        </Link>
                    </nav>
                    <div className="user-login">
                        <Link className="menuItem" to="/user/cadastrar">
                            Cadastrar
                        </Link>
                        <Link className="menuItem" to="/user/login">
                            Login
                        </Link>
                    </div>
                </div>
            );
        }
    };

    return (
        <header className="header">
            <Link className="logo-container" to="/">
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
