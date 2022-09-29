import React, { Component } from 'react';
import '../../css/pages/campeonato.css';

import http from '../../util/http';

import CampeonatoCard from '../util/CampeonatoCard';
import Loading from '../util/Loading';


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
            campeonatos: [
                // {
                //     "nomeCampeonato": "Copa do Mundo Rússia 2018",
                //     "logoCampeonato": "russia_2018.png",
                //     "dataInicioCampeonato": "88/88/888",
                //     // "statusCampeonato": "finalizado",
                //     "idCampeonato": "1",
                //     // "participacaoCampeonato": "yes",
                //     "fases": [
                //         {
                //             "id": "1",
                //             "nomeFase": "Grupos",
                //             // "apostaFase": true,
                //             "partes": [
                //                 {
                //                     "id": 1,
                //                     "nomeParte": "Tabela",
                //                     "statusParte": "finalizado"
                //                 }
                //             ]
                //         },
                //         {
                //             "id": "2",
                //             "nomeFase": "Eliminatórias",
                //             // "apostaFase": true,
                //             "partes": [
                //                 {
                //                     "id": 1,
                //                     "nomeParte": "Oitavas",
                //                     "statusParte": "finalizado"
                //                 },
                //                 {
                //                     "id": 2,
                //                     "nomeParte": "Quartas",
                //                     "statusParte": "finalizado"
                //                 }
                //             ]
                //         }
                //     ]
                // },  
                // {
                //     "nomeCampeonato": "Copa América Brasil 2019",
                //     "logoCampeonato": "copa_america_2019.png",
                //     "dataInicioCampeonato": "88/88/888",
                //     // "statusCampeonato": "aberto",
                //     "idCampeonato": "2",
                //     // "participacaoCampeonato": "no",
                //     "fases": [
                //         {
                //             "id": "1",
                //             "nomeFase": "Grupos",
                //             // "apostaFase": true,
                //             "partes": [
                //                 {
                //                     "id": 1,
                //                     "nomeParte": "Oitavas",
                //                     "statusParte": "aberto"
                //                 }
                //             ]
                //         },
                //         {
                //             "id": "1",
                //             "nomeFase": "Eliminatórias",
                //             // "apostaFase": true,
                //             "partes": [
                //                 {
                //                     "id": 1,
                //                     "nomeParte": "Oitavas",
                //                     "statusParte": "aberto"
                //                 },
                //                 {
                //                     "id": 2,
                //                     "nomeParte": "Quartas",
                //                     "statusParte": "aposta"
                //                 }
                //             ]
                //         }
                //     ]
                // },
                // {
                //     "nomeCampeonato": "Copa do Mundo Catar 2022",
                //     "logoCampeonato": "qatar_2022.png",
                //     "dataInicioCampeonato": "88/88/888",
                //     // "statusCampeonato": "aposta",
                //     "idCampeonato": "3",
                //     // "participacaoCampeonato": "no",
                //     "fases": [
                //         {
                //             "id": "1",
                //             "nomeFase": "Grupos",
                //             // "apostaFase": false,
                //             "partes": [
                //                 {
                //                     "id": 1,
                //                     "nomeParte": "Tabela",
                //                     "statusParte": "tba"
                //                 }
                //             ]
                //         }
                //     ]
                // }
            ]
        };
    }

    componentWillMount(){
        const cachedCampeonatos = localStorage.getItem('campeonatos');
        if(cachedCampeonatos){
            this.setState({
                campeonatos: JSON.parse(cachedCampeonatos)
            });
        }
    }

    async componentDidMount(){
        this.setState({ loading: true });

        const dataString = JSON.stringify({});

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/campeonato/getCampeonatos.php`,
            data: dataString,
            thenCallback: (response) => {
                this.setState({
                    campeonatos: response,
                    loading: false
                });

                localStorage.setItem('campeonatos', JSON.stringify(response));
            },
            catchCallback: ({ message }) => {
                this.setState({ loading: false });
            }
        });
    }

    //TODO Fazer uma área "meus campeonatos" para os campeonatos que a pessoa já está participando..

    render() {
        return (
            <div className="userPage-container">
                
                <div className="userPage-userCampeonatos">
                    <h3 className="page-title">
                        Campeonatos 
                        <Loading loading={this.state.loading} localstorage="-withLocalStorage"/>
                    </h3>
                    <div className="userCampeonatos-container">
                        {
                        this.state.campeonatos.map(function(campeonato, index){
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