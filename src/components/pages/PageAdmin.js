import React, { Component } from 'react';
import '../../css/pages/admin.css';
import $ from 'jquery';

import { Link } from 'react-router-dom';

import Loading from '../util/Loading';
import AdminSelect from '../util/AdminSelect';


class PageAdmin extends Component {
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
    
    componentDidMount(){
        this.setState({loading: true});
        $.ajax({
            url:"../rest-api/getCampeonatos.php",
            type: 'post',
            contentType : 'application/json',
            success: function(resposta){
                // console.log(resposta);
                this.setState({
                    campeonatos: resposta,
                    loading: false
                });

                localStorage.setItem('campeonatos', JSON.stringify(resposta));

            }.bind(this),
            error: function(xhr, status, err){
                // console.log("erro:");
                // console.log(xhr);   //erro completo
                // console.log(status); // statusText do erro completo
                // console.log(err);
                // console.log(JSON.parse(xhr.responseText)); // É a resposta que eu coloco.
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    showCampeonatos(campeonato, index){
        return(
            <li key={index}>
                <div className="adminCampeonatos-campeonato">{campeonato.nomeCampeonato}</div>
                <div className="adminCampeonatos-fase">
                    {
                    campeonato.fases.map(function(fase, index){
                        return this.showFases(fase, index);
                    }, this)
                    }
                </div>
            </li>
        );
    }

    showFases(fase, index){
        return(
            <div key={index}>
                <div>{fase.nomeFase}</div>
                <div className="adminCampeonatos-parte">
                    {
                    fase.partes.map(function(parte, index){
                        return this.showPartes(parte, index, fase.id);
                    }, this)
                    }
                </div>
            </div>
        ); 
    }
    
    showPartes(parte, index, faseID){
        return(
            <div key={index}>
                <div>{parte.nomeParte}</div>

                <div className="adminCampeonatos-actions">
                    {this.checkIfShowLinks(parte, faseID)}
                    <AdminSelect parteID={parte.id} selected={parte.statusParte} />
                    <div className={"statusMark -"+parte.statusParte}></div>
                </div>
            </div>
        );
    }

    checkIfShowLinks(parte, faseID){
        if(parte.statusParte==="aberto"){
            return(
                <div className="links">
                    <Link to={"/"+faseID+"/adminapostas"}>
                        Apostas
                    </Link>
                    <Link to={"/"+parte.id+"/adminscore"}>
                        Resultados
                    </Link>
                </div>
            );
        }else if(parte.statusParte==="aposta"){
            return(
                <div className="links">
                    <Link to={"/"+parte.id+"/adminviewapostas"}>
                        Apostas
                    </Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="userPage-container">
                <div className="userPage-userCampeonatos">
                    <h3 className="page-title -admin">
                        Admin 
                        <Loading loading={this.state.loading} localstorage="-withLocalStorage"/>
                    </h3>
                    <ul className="adminCampeonatos-container">
                        {
                        this.state.campeonatos.map(function(campeonato, index){
                            return this.showCampeonatos(campeonato, index)
                        }, this)
                        }
                    </ul>
                </div>
            </div>

        );
    }
}

export default PageAdmin;