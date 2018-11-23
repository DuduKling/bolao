import React, { Component } from 'react';
import '../../css/home/nextBolao.css';

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
                            <img className="nextBolao-logo" alt="" src={"/imagens/campeonatos/russia_2018.png"}/>
                        </div>
                    </div>
                    <div className="nextBolao-logosEqual">
                        <div className="nextBolao-logoContainer">
                            <img className="nextBolao-logo" alt="" src={"/imagens/campeonatos/copa_america_2019.png"}/>    
                        </div>           
                    </div>
                    <div className="nextBolao-logosEqual">
                        <div className="nextBolao-logoContainer">
                            <img className="nextBolao-logo" alt="" src={"/imagens/campeonatos/qatar_2022.png"}/>
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