import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class AuthInverso extends Component {
    checkAuth(){
        if (this.props.userName===''){
            return (
                <Route 
                    exact
                    path={this.props.path} 
                    component={this.props.component} 
                />
            );
        }else{
            return (
                <Route render={() => 
                    <Redirect to={{
                        pathname: "/user/campeonatos", 
                        state: {from: this.props.location}
                    }}/>
                }/>
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

export default connect(mapStateToProps)(AuthInverso);