import React, { Component } from 'react';
import './css/App.css';
import $ from 'jquery';

import { Switch, Route } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { updateJWT } from './actions';
import { connect } from 'react-redux';

import SiteHeader from './components/common/SiteHeader';
import SiteFooter from './components/common/SiteFooter';

import SetCookie from './components/util/setCookie';

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
		// var userInfo = this.getCookie('userLogin');
		
		// if(userInfo !== ""){
		//   userInfo = JSON.parse(userInfo);

		//   const { updateJWT } = this.props;
		//   updateJWT(userInfo);
		// }
		
		var userInfo = this.getCookie('userLogin');

		if(userInfo) {
			const { updateJWT } = this.props;

			var textJSON = `{
				"jwt":"${userInfo}"
			}`;
			var textJSON2 = JSON.parse(textJSON);
			var dataString = JSON.stringify(textJSON2);
			
			$.ajax({
				url:"../rest-api/validateCookie.php",
				type: 'post',
				contentType : 'application/json',
				data: dataString,
				success: function(resposta){
	
					var userInfo = {
						userName: resposta.name, 
						userEmail: resposta.email,
						userID: resposta.id,
						userImg: resposta.userImg,
						userJWT: resposta.jwt
					};
					updateJWT(userInfo);
					
				},
				error: function(xhr, status, err){
					console.error(status, err.toString());
					console.log(JSON.parse(xhr.responseText));

					if(JSON.parse(xhr.responseText).message.toString() === "JWT não decodificado") {
						SetCookie("userLogin", "", 0);
					}
				}
			});	
		}
	}

	render() {
		return (
				<div className="wrapper">
					<SiteHeader />

					<Switch>
						{/* ALL */}
						<Route exact path='/' component={PageHome} />
						<Route exact path='/regulamento' component={PageRegulamento} />

						{/* LOGGED ONLY - USER */}
						<PrivateRoute exact path='/user/campeonatos' component={PageCampeonatos} />
						<Route exact path='/user/:typeOfLogin(cadastrar|login)' component={PageLogin} />
						<PrivateRoute exact path='/user/config' component={PageUser} />

						{/* LOGGED ONLY - JOGOS/CAMPEONATOS */}
						<PrivateRoute exact path="/:campeonato/:fase/dashboard" component={PageDashboard} />
						<PrivateRoute exact path="/:campeonato/:fase/jogos" component={PageFixtures} />

						{/* TODO: Colocar o /:campeonato nesses 3 caras para ficar tudo formatadinho igual? */}
						<PrivateRoute exact path="/:fase/apostado/:nome" component={PageApostado} />
						<PrivateRoute exact path="/:fase/jogo/:fixture" component={PageApostadoJogo} />

						<PrivateRoute exact path="/:parte/apostar" component={PageApostar} />

						{/* ADMIN ONLY */}
						<PrivateRoute exact path="/:parte/admin" component={PageAdmin} />

						{/* WRONG ROUTES */}
						<Route component={Page404} />
					</Switch>
			
					<SiteFooter />
				</div>
		);
	}
}

const mapDispatchToProps = dispatch => 
bindActionCreators({ updateJWT }, dispatch);

export default connect(null, mapDispatchToProps)(App)
