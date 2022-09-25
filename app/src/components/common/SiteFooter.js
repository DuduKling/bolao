import React, { Component } from 'react';
import '../../css/common/footer.css';
import { Link } from 'react-router-dom';


// import { Link } from 'react-router-dom';

class SiteFooter extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="links-container">
                    <div className="links -external">
                        <h4>Links externos</h4>
                        
                        <Link className="menuItem" to="/">
                            Home
                        </Link>
                        <Link className="menuItem" to="/regulamento">
                            Regulamento
                        </Link>
                        <Link className="menuItem" to="/faleconosco">
                            Fale Conosco
                        </Link>
                    </div>
                    <div className="links -internal">
                        <h4>Links internos</h4>

                        <Link className="menuItem" to="/user/cadastrar">
                            Cadastrar
                        </Link>
                        <Link className="menuItem" to="/user/login">
                            Login
                        </Link>
                        <Link className="menuItem" to="/user/campeonatos">
                            Campeonatos
                        </Link>
                        <Link className="menuItem" to="/user/config">
                            Configurações
                        </Link>

                        {/*
                            <Link className="menuItem" to="/0/0/dashboard">
                                Dashboard
                            </Link>
                            <Link className="menuItem" to="/0/0/apostar">
                                Apostar
                            </Link>
                            <Link className="menuItem" to="/0/0/jogo/1">
                                Apostado Jogo
                            </Link>
                            <Link className="menuItem" to="/0/0/apostado/pessoa">
                                Apostado
                            </Link>
                            <Link className="menuItem" to="/0/0/jogos">
                                Fixtures
                            </Link>
                            <Link className="menuItem" to="/0/0/admin">
                                Admin
                            </Link>
                        */}
                    </div>
                </div>

                <div className="dev-container">
                    <p>Feito com &hearts; por <a href="https://dudukling.github.io/" rel="noopener noreferrer" target="_blank">Dudu</a>.</p>
                    <p>Powered by: Mestres do Disfarce</p>
                    <p>Versão <i>beta 2.0</i></p>
                </div>
            </footer>
        );
    }
}

export default SiteFooter;