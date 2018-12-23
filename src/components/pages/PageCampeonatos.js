import React, { Component } from 'react';
import '../../css/pages/campeonato.css';
import $ from 'jquery';
import CampeonatoCard from '../util/CampeonatoCard';

// import {getCampeonatoImagem} from '../util/CampeonatoImporter'

/* Status:
    finalizado - Vai para dashboard (sem aposta lá).
    aberto - Vai para dashboard (com aposta lá).
    aposta - Vai para tela de Apostas.
    tba - Sem link (Mostra data de início).
*/

class PageCampeonatos extends Component {
    constructor() {
        super();
        this.state = {
            Campeonatos:[{}]
            // Campeonatos: [
            //     {
            //         "nomeCampeonato": "Copa do Mundo Rússia 2018",
            //         "logoCampeonato": "russia_2018.png",
            //         "dataInicioCampeonato": "88/88/888",
            //         "statusCampeonato": "finalizado",
            //         "idCampeonato": "1",
            //         "participacaoCampeonato": "yes",
            //         "fases": [
            //             {
            //                 "id": "1",
            //                 "nomeFase": "Grupos",
            //                 "apostaFase": true
            //             },
            //             {
            //                 "id": "2",
            //                 "nomeFase": "Eliminatórias",
            //                 "apostaFase": true
            //             }
            //         ]
            //     },
            //     {
            //         "nomeCampeonato": "Copa América Brasil 2019",
            //         "logoCampeonato": "copa_america_2019.png",
            //         "dataInicioCampeonato": "88/88/888",
            //         "statusCampeonato": "aberto",
            //         "idCampeonato": "2",
            //         "participacaoCampeonato": "no",
            //         "fases": [
            //             {
            //                 "id": "1",
            //                 "nomeFase": "Grupos",
            //                 "apostaFase": true
            //             }
            //         ]
            //     },
            //     {
            //         "nomeCampeonato": "Copa do Mundo Catar 2022",
            //         "logoCampeonato": "qatar_2022.png",
            //         "dataInicioCampeonato": "88/88/888",
            //         "statusCampeonato": "aposta",
            //         "idCampeonato": "3",
            //         "participacaoCampeonato": "no",
            //         "fases": [
            //             {
            //                 "id": "1",
            //                 "nomeFase": "Grupos",
            //                 "apostaFase": false
            //             },
            //             {
            //                 "id": "2",
            //                 "nomeFase": "Eliminatórias",
            //                 "apostaFase": true
            //             }
            //         ]
            //     },
            //     {
            //         "nomeCampeonato": "Outro Campeonato",
            //         "logoCampeonato": "qatar_2022.png",
            //         "dataInicioCampeonato": "88/88/888",
            //         "statusCampeonato": "tba",
            //         "idCampeonato": "4",
            //         "participacaoCampeonato": "no",
            //         "fases": [
            //             {
            //                 "id": "1",
            //                 "nomeFase": "Grupos",
            //                 "apostaFase": true
            //             },
            //             {
            //                 "id": "2",
            //                 "nomeFase": "Eliminatórias",
            //                 "apostaFase": true
            //             }
            //         ]
            //     }
            // ]
        };
    }

    componentDidMount(){
        $.ajax({
            url:"../rest-api/getCampeonatos.php",
            type: 'post',
            contentType : 'application/json',
            success: function(resposta){
                // console.log(resposta);
                this.setState({Campeonatos: resposta});
            }.bind(this),
            error: function(xhr, status, err){
                // console.log("erro:");
                // console.log(xhr);   //erro completo
                // console.log(status); // statusText do erro completo
                // console.log(err);
                // console.log(JSON.parse(xhr.responseText)); // É a resposta que eu coloco.
                console.error(status, err.toString());
            }
        });
    }

    render() {
        return (
            <div className="userPage-container">

                <div className="userPage-userCampeonatos">
                    <h3 className="page-title">Campeonatos</h3>
                    <div className="userCampeonatos-container">
                        {
                        this.state.Campeonatos.map(function(campeonato, index){
                            return(
                                <CampeonatoCard 
                                    key={index} 
                                    campeonato={campeonato}
                                />
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