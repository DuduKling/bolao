import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';


class Auth extends Component {
    checkAuth(){
        var autorizacao = false;
        // var autorizacao = true;

        if (!autorizacao){
            return (
                <Route render={() => <Redirect to={{ pathname: "/user/login", state: { from: this.props.location } }} />}/>
            );
        }else{
            return (
                <Route to={this.props.location}/>
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

export default Auth;