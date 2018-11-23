import React, { Component } from 'react';
import '../../css/pages/user.css';
import '../../css/util/formMessage.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import {getCampeonatoImagem} from '../util/CampeonatoImporter'

class PageCampeonatos extends Component {
    constructor() {
        super();
        this.state = {
            Apostas: [
                {
                    "nomeCampeonato": "Copa do Mundo Rússia 2018",
                    "logoCampeonato": "Campeonato_Copa_Mundo_2018",
                    "statusCampeonato": "blocked",
                    "idCampeonato": "1"
                },
                {
                    "nomeCampeonato": "Copa América Brasil 2019",
                    "logoCampeonato": "Camepeonato_Copa_America_2019",
                    "statusCampeonato": "open",
                    "idCampeonato": "2"
                },
                {
                    "nomeCampeonato": "Copa do Mundo Catar 2022",
                    "logoCampeonato": "Campeonato_Copa_Mundo_2022",
                    "statusCampeonato": "blocked",
                    "idCampeonato": "3"
                }
            ]
        };
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
                                <Link to={"/"+aposta.idCampeonato+"/dashboard"} key={index} className={aposta.statusCampeonato}>
                                    <div>
                                        <img src={getCampeonatoImagem(aposta.logoCampeonato)} alt="a" />
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