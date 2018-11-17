import React, { Component } from 'react';
import $ from 'jquery';
import './css/App.css';
// import './css/antigoApp.css';

import { Switch, Route } from 'react-router-dom';

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



// TODO Criar uma página de usuário chamada minhas apostas.



class App extends Component {
  componentDidMount(){
    // Retirar propaganda do 000webhost.
    $("body>div:nth-child(4)").remove();
  }

  render() {
    return (
        <div className="wrapper">
          <SiteHeader />

          <Switch>
            <Route exact path='/' component={PageHome} />
            <Route exact path='/regulamento' component={PageRegulamento} />

            <Route exact path='/user/:typeOfLogin(cadastrar|login)' component={PageLogin} />

            <PrivateRoute path="/protected" component={PrivateRoute} />



            <Route exact path="/:fase/apostar" component={PageApostar} />  
            <Route exact path="/:fase/apostado/:nome" component={PageApostado} />
            <Route exact path="/:fase/admin" component={PageAdmin} />
            <Route exact path="/:fase/jogos" component={PageFixtures} />
            <Route exact path="/:fase/jogo/:num_jogo" component={PageApostadoJogo} />
            <Route exact path="/:fase/dashboard" component={PageDashboard} />
            {/*          
            <Route exact path="/" component={PageApostado} />
            */}

            <Route component={Page404} />
          </Switch>
      
          <SiteFooter />
        </div>
    );
  }
}

export default App;
