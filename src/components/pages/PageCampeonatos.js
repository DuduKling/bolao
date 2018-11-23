import React, { Component } from 'react';
import '../../css/pages/user.css';
import '../../css/util/formMessage.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';

// import {getCampeonatoImagem} from '../util/CampeonatoImporter'

// TODO Adicionar o tipo Yet To Start que não é link. Se pá, colocar a data de início para aparecer em algum lugar.

class PageCampeonatos extends Component {
    constructor() {
        super();
        this.state = {
            Apostas: [
                {
                    "nomeCampeonato": "Copa do Mundo Rússia 2018",
                    "logoCampeonato": "russia_2018.png",
                    "statusCampeonato": "blocked",
                    "idCampeonato": "1"
                },
                {
                    "nomeCampeonato": "Copa América Brasil 2019",
                    "logoCampeonato": "copa_america_2019.png",
                    "statusCampeonato": "open",
                    "idCampeonato": "2"
                },
                {
                    "nomeCampeonato": "Copa do Mundo Catar 2022",
                    "logoCampeonato": "qatar_2022.png",
                    "statusCampeonato": "blocked",
                    "idCampeonato": "3"
                }
            ]
        };
    }

    setImage(aposta){
        if(aposta.logoCampeonato===""){
            return "/imagens/campeonatos/default.png"
        }else{
            return "/imagens/campeonatos/"+aposta.logoCampeonato
        }
    }
    
    render() {
        return (
            <div className="userPage-container">

                <div className="userPage-userCampeonatos">
                    <h3 className="page-title">Campeonatos</h3>
                    <div className="userCampeonatos-container">
                        {
                        this.state.Apostas.map(function(aposta, index){
                            return(
                                <Link to={"/"+aposta.idCampeonato+"/dashboard"} 
                                    key={index} 
                                    className={aposta.statusCampeonato}
                                >
                                    <div>
                                        <img src={this.setImage(aposta)}
                                        alt={"Logo do campeonato "+aposta.nomeCampeonato} />
                                    </div>
                                    <h4>{aposta.nomeCampeonato}</h4>
                                </Link>
                            );
                        }, this)
                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default PageCampeonatos;