import React, { Component } from 'react';
import '../../css/home/nextBolao.css';

import bolaoLogo1 from '../../imgs/campeonatos/russia_2018.png';
import bolaoLogo2 from '../../imgs/campeonatos/copa_america_2019.png';
import bolaoLogo3 from '../../imgs/campeonatos/qatar_2022.png';

import Count from './Count';

class NextAndTimer extends Component {   
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
            <div className="nextBolao-container">
                <h2>Próximos bolões</h2>
                
                <div className="nextBolao-logos">
                    <div className="nextBolao-logosEqual">
                        <div className="nextBolao-logoContainer">
                            <img className="nextBolao-logo" alt="" src={bolaoLogo1}/>
                        </div>
                    </div>
                    <div className="nextBolao-logosEqual">
                        <div className="nextBolao-logoContainer">
                            <img className="nextBolao-logo" alt="" src={bolaoLogo2}/>    
                        </div>           
                    </div>
                    <div className="nextBolao-logosEqual">
                        <div className="nextBolao-logoContainer">
                            <img className="nextBolao-logo" alt="" src={bolaoLogo3}/>
                        </div>
                    </div>
                </div>

                <div className="nextBolao-timerContainer">
                    {this.checkDate()}
                </div>

            </div>
        );
    }
}

export default NextAndTimer;