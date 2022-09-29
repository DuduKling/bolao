import './css/App.css';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import BigLoading from './components/util/BigLoading';

import Page404 from './components/pages/Page404';
import PageAdmin from './components/pages/PageAdmin';
import PageAdminApostas from './components/pages/PageAdminApostas';
import PageAdminScore from './components/pages/PageAdminScore';
import PageApostado from './components/pages/PageApostado';
import PageApostadoJogo from './components/pages/PageApostadoJogo';
import PageApostar from './components/pages/PageApostar';
import PageCampeonatos from './components/pages/PageCampeonatos';
import PageContato from './components/pages/PageContato';
import PageDashboard from './components/pages/PageDashboard';
import PageEsqueci from './components/pages/PageEsqueci';
import PageFixtures from './components/pages/PageFixtures';
import PageHome from './components/pages/PageHome';
import PageLogin from './components/pages/PageLogin';
import PageRegulamento from './components/pages/Regulamento';
import PageUser from './components/pages/PageUser';

import PrivateRoute from './components/util/Auth';
import PrivateRouteAdmin from './components/util/AuthAdmin';
import PrivateRouteInverso from './components/util/AuthInverso';

import SiteFooter from './components/common/SiteFooter';
import SiteHeader from './components/common/SiteHeader';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import http from './util/http';
import setCookie from './components/util/setCookie';
import { updateJWT } from './actions';

class App extends Component {

    constructor() {
        super();
        this.state = {
            isAuth: 'noResponseFromAjax',
        };
    }

    getCookie(cname) {
        const name = `${cname}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    // eslint-disable-next-line react/no-deprecated
    async componentWillMount() {
        const userInfo = this.getCookie('userLogin');

        if (userInfo) {
            const dataString = JSON.stringify({
                jwt: userInfo,
            });

            await http.post({
                // eslint-disable-next-line no-process-env
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/validateCookie.php`,
                data: dataString,
                thenCallback: (response) => {
                    updateJWT({
                        userName: response.name,
                        userEmail: response.email,
                        userID: response.id,
                        userImg: response.userImg,
                        userRole: response.userRole,
                        userJWT: response.jwt,
                    });

                    this.setState({ isAuth: true });
                },
                catchCallback: ({ message }) => {
                    if (message === 'JWT não decodificado') {
                        setCookie('userLogin', '', 0);
                    }
                    this.setState({ isAuth: false });
                },
            });
        } else {
            this.setState({
                isAuth: false,
            });
        }
    }

    returnBigLoading() {
        return (
            <BigLoading />
        );
    }

    returnApp() {
        return (
            <div className='wrapper'>
                <SiteHeader />

                <Switch>
                    {/* ALL */}
                    <Route exact path='/' component={PageHome} />
                    <Route exact path='/regulamento' component={PageRegulamento} />
                    <Route exact path='/faleconosco' component={PageContato} />

                    {/* LOGGED ONLY - USER */}
                    <PrivateRouteInverso exact path='/user/:typeOfLogin(cadastrar|login)' component={PageLogin} />
                    <PrivateRouteInverso exact path='/user/esqueci/:id?/:jwtCode?' component={PageEsqueci} />


                    {/* LOGGED ONLY - USER */}
                    <PrivateRoute exact path='/user/campeonatos' component={PageCampeonatos} />
                    <PrivateRoute exact path='/user/config' component={PageUser} />

                    {/* LOGGED ONLY - JOGOS/CAMPEONATOS */}
                    <PrivateRoute exact path='/:campeonato/:fase/dashboard' component={PageDashboard} />
                    <PrivateRoute exact path='/:campeonato/:fase/jogos' component={PageFixtures} />

                    {/* TODO: Colocar o /:campeonato nesses 3 caras para ficar tudo formatadinho igual? */}
                    <PrivateRoute exact path='/:fase/apostado/:nome' component={PageApostado} />
                    <PrivateRoute exact path='/:fase/jogo/:fixture' component={PageApostadoJogo} />

                    <PrivateRoute exact path='/:parte/apostar' component={PageApostar} />

                    {/* ADMIN ONLY */}
                    <PrivateRouteAdmin exact path='/:parte/adminscore' component={PageAdminScore} />
                    <PrivateRouteAdmin exact path='/:fase/adminapostas' component={PageAdminApostas} />
                    <PrivateRouteAdmin exact path='/admin' component={PageAdmin} />

                    {/* WRONG ROUTES */}
                    <Route component={Page404} />
                </Switch>

                <SiteFooter />
            </div>
        );
    }

    render() {
        return (
            <div>
                {
                    this.state.isAuth === 'noResponseFromAjax' ?
                        this.returnBigLoading() :
                        this.returnApp()
                }
            </div>
        );
    }

}

const mapStateToProps = (store) => ({
    userName: store.AuthJWTState.userName,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateJWT }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
