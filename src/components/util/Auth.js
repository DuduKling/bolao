import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class Auth extends Component {
    checkAuth(){
        if (this.props.userName===''){
            return (
                <Route render={() => 
                    <Redirect to={{
                        pathname: "/user/login", 
                        state: {from: this.props.location}
                    }}/>
                }/>
            );
            // Se a pagina dor cadastrar ou login, e o usuário tiver cadastrado, levar para o campeonatos...
        }else{
            return (
                <Route 
                    exact
                    path={this.props.path} 
                    component={this.props.component} 
                />
            );
        }
    }

    render() {
        return (
            <div>
                {this.checkAuth()}
            </div>
        );
    }
}

const mapStateToProps = store => ({
    userName: store.AuthJWTState.userName
});

export default connect(mapStateToProps)(Auth);