import React, { Component } from 'react';
import './css/App.css';

import { Switch, Route } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { updateJWT } from './actions';
import { connect } from 'react-redux';

import SiteHeader from './components/common/SiteHeader';
import SiteFooter from './components/common/SiteFooter';

import PageHome from './components/pages/PageHome';
import PageRegulamento from './components/pages/Regulamento';
import Page404 from './components/pages/Page404';
import PageLogin from './components/pages/PageLogin';
import PageApostar from './components/pages/PageApostar';

import PrivateRoute from './components/util/Auth';

import PageApostado from './components/pages/PageApostado';
import PageAdmin from './components/pages/PageAdmin';
import PageFixtures from './components/pages/PageFixtures';
import PageApostadoJogo from './components/pages/PageApostadoJogo';
import PageDashboard from './components/pages/PageDashboard';
import PageUser from './components/pages/PageUser';
import PageCampeonatos from './components/pages/PageCampeonatos';


class App extends Component {
  getCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' '){
        c = c.substring(1);
      }

      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  componentWillMount(){
    var userInfo = this.getCookie('userLogin');
    
    if(userInfo !== ""){
      userInfo = JSON.parse(userInfo);

      const { updateJWT } = this.props;
      updateJWT(userInfo);
    }
  }

  render() {
    return (
        <div className="wrapper">
          <SiteHeader />

          <Switch>
            <Route exact path='/' component={PageHome} />
            <Route exact path='/regulamento' component={PageRegulamento} />


            <PrivateRoute exact path='/user/campeonatos' component={PageCampeonatos} />
            <Route exact path='/user/:typeOfLogin(cadastrar|login)' component={PageLogin} />
            <PrivateRoute exact path='/user/config' component={PageUser} />

            <PrivateRoute exact path="/:parte/apostar" component={PageApostar} />  
            <PrivateRoute exact path="/:fase/apostado/:nome" component={PageApostado} />
            <PrivateRoute exact path="/:campeonato/:fase/jogos" component={PageFixtures} />
            <PrivateRoute exact path="/:fase/jogo/:fixture" component={PageApostadoJogo} />

            <PrivateRoute exact path="/:campeonato/:fase/dashboard" component={PageDashboard} />


            <PrivateRoute exact path="/:parte/admin" component={PageAdmin} />


            <Route component={Page404} />
          </Switch>
      
          <SiteFooter />
        </div>
    );
  }
}

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch => 
bindActionCreators({ updateJWT }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)
