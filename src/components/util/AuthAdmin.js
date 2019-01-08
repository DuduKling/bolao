import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class AuthAdmin extends Component {
    checkAuth(){
        if (this.props.userRole==='admin'){return (
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
                        pathname: "/user/login", 
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
    userRole: store.AuthJWTState.userRole
});

export default connect(mapStateToProps)(AuthAdmin);