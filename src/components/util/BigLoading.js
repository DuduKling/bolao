import React, { Component } from 'react';
import '../../css/util/bigLoading.css';

import logoCrown from "../../imgs/logo-crown.png";

class BigLoading extends Component {
    render() {
        return (
            <div className="bigLoading">
                <h1>Bolão Imperial</h1>
                <div className="bigLoading-container">
                    <img src={logoCrown} alt="Logo do bolão"/>
                    <div className="logoShadow"></div>
                </div>
                <p>Aguarde enquanto preparamos o sistema!</p>
                
            </div>
        );
    }
}

export default BigLoading;