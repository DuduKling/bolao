import React, { Component } from 'react';
import './css/App.css';

import { Switch, Route } from 'react-router-dom';

import SiteHeader from './components/common/SiteHeader';
import SiteFooter from './components/common/SiteFooter';

import PageHome from './components/PageHome';
import PageRegulamento from './components/Regulamento';
import PageApostar from './components/PageApostar';
import PageApostado from './components/PageApostado';
import PageApostadoJogo from './components/PageApostadoJogo';
import PageFixtures from './components/PageFixtures';
import PageAdmin from './components/PageAdmin';
import PageDashboard from './components/PageDashboard';


class App extends Component {
  render() {
    return (
        <div className="wrapper">
          <SiteHeader />

          <Switch>
            <Route exact path='/' component={PageHome} />
            <Route exact path='/regulamento' component={PageRegulamento} />
            
            {/*

            <Route exact path="/:fase/apostar" component={PageApostar} />
            <Route exact path="/" component={PageApostado} />
            <Route exact path="/:fase/apostado/:nome" component={PageApostado} />
            <Route exact path="/:fase/jogo/:num_jogo" component={PageApostadoJogo} />
            <Route exact path="/:fase/jogos" component={PageFixtures} />
            <Route exact path="/:fase/admin" component={PageAdmin} />
            <Route exact path="/:fase/dashboard" component={PageDashboard} />

            */}
          </Switch>
      
          <SiteFooter />
        </div>
    );
  }
}

export default App;
