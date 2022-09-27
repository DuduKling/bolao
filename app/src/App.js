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
import PrivateRouteInverso from './components/util/AuthInverso';
import PrivateRouteAdmin from './components/util/AuthAdmin';


import PageApostado from './components/pages/PageApostado';
import PageAdminScore from './components/pages/PageAdminScore';
import PageAdminApostas from './components/pages/PageAdminApostas';

import PageAdmin from './components/pages/PageAdmin';
import PageFixtures from './components/pages/PageFixtures';
import PageApostadoJogo from './components/pages/PageApostadoJogo';
import PageDashboard from './components/pages/PageDashboard';
import PageUser from './components/pages/PageUser';
import PageCampeonatos from './components/pages/PageCampeonatos';

import BigLoading from './components/util/BigLoading';
import PageEsqueci from './components/pages/PageEsqueci';
import PageContato from './components/pages/PageContato';


class App extends Component {
	constructor() {
        super();
        this.state = {
            isAuth: 'noResponseFromAjax'
        };
	}
	
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



		/* LOCALHOST */
			// this.setState({
			// 	isAuth: true
			// });

			// const { updateJWT } = this.props;

			// var userInfo2 = {
			// 	userName: "Localhost User", 
			// 	userEmail: "email@localhost.com",
			// 	userID: "6666666",
			// 	userImg: "",
			// 	userRole: "admin",
			// 	userJWT: userInfo.jwt
			// };
			// updateJWT(userInfo2);

		/* END: LOCALHOST */

		


		

		if(userInfo) {
			const { updateJWT } = this.props;

			var textJSON = `{
				"jwt":"${userInfo}"
			}`;
			var textJSON2 = JSON.parse(textJSON);
			var dataString = JSON.stringify(textJSON2);
			
			$.ajax({
				url: `${process.env.REACT_APP_URL_BACK}/api/v1/validateCookie.php`,
				type: 'post',
				contentType : 'application/json',
				data: dataString,
				success: function(resposta){
	
					var userInfo = {
						userName: resposta.name, 
						userEmail: resposta.email,
						userID: resposta.id,
						userImg: resposta.userImg,
						userRole: resposta.userRole,
						userJWT: resposta.jwt
					};
					updateJWT(userInfo);

					this.setState({
						isAuth: true
					});
					
				}.bind(this),
				error: function(xhr, status, err){
					console.error(status, err.toString());
					console.log(JSON.parse(xhr.responseText));

					if(JSON.parse(xhr.responseText).message.toString() === "JWT não decodificado") {
						SetCookie("userLogin", "", 0);
					}
					this.setState({
						isAuth: false
					});
				}.bind(this)
			});	
		}else{
			this.setState({
				isAuth: false
			});
		}
	}

	returnBigLoading(){
		return (
			<BigLoading />
		);
	}
	
	returnApp(){
		return (
			<div className="wrapper">
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
					<PrivateRoute exact path="/:campeonato/:fase/dashboard" component={PageDashboard} />
					<PrivateRoute exact path="/:campeonato/:fase/jogos" component={PageFixtures} />

					{/* TODO: Colocar o /:campeonato nesses 3 caras para ficar tudo formatadinho igual? */}
					<PrivateRoute exact path="/:fase/apostado/:nome" component={PageApostado} />
					<PrivateRoute exact path="/:fase/jogo/:fixture" component={PageApostadoJogo} />

					<PrivateRoute exact path="/:parte/apostar" component={PageApostar} />

					{/* ADMIN ONLY */}
					<PrivateRouteAdmin exact path="/:parte/adminscore" component={PageAdminScore} />
					<PrivateRouteAdmin exact path="/:fase/adminapostas" component={PageAdminApostas} />
					<PrivateRouteAdmin exact path="/admin" component={PageAdmin} />

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
				this.state.isAuth==='noResponseFromAjax'?
					this.returnBigLoading()
					:this.returnApp()
				}
			</div>
		);
	}
}

const mapStateToProps = store => ({
    userName: store.AuthJWTState.userName
});

const mapDispatchToProps = dispatch => 
bindActionCreators({ updateJWT }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)
