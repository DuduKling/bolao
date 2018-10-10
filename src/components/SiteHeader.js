import React, { Component } from 'react';
import logo from '../imgs/logo.png';
import bg from '../imgs/test2.jpg';
import Count from './Count';

import { Link } from 'react-router-dom';

class SiteHeader extends Component {
    checkDate(){
        let hoje = Date.now();
        let final  = new Date(this.props.dataFinal);
        let distancia = final.getTime() - hoje;
        if(distancia > 0) {
            return (
                <Count dataFinal={this.props.dataFinal}/>
            );
        }
    }

    render() {
        return (
            <header className="header">
                <Link to="/">
                    <img className="logo" alt="" src={logo}/>
                </Link>
                {this.checkDate()}
                <img className="bg" alt="" src={bg}/>
            </header>
        );
    }
}

export default SiteHeader;