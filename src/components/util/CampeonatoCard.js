import React, { Component } from 'react';
import '../../css/pages/campeonato.css';
import { Link } from 'react-router-dom';

class CampeonatoCard extends Component {
    setImage(campeonato){
        if(campeonato.logoCampeonato===""){
            return "/imagens/campeonatos/default.png"
        }else{
            return "/imagens/campeonatos/"+campeonato.logoCampeonato
        }
    }

    checkStatus(campeonato){
        if(campeonato.statusCampeonato === "tba"){
            return(
                <div className="campeonatoDiv tba">
                    <div className="imagemContainer">
                        <img src={this.setImage(campeonato)}
                        alt={"Logo do campeonato "+campeonato.nomeCampeonato} />
                    </div>
                    <h4>{campeonato.nomeCampeonato}</h4>
                    <div className="date-container">{campeonato.dataInicioCampeonato}</div>
                </div>
            );
        }else if(campeonato.statusCampeonato === "aberto"){
            return(
                <div className="campeonatoDiv aberto">
                    <div className="imagemContainer">
                        <img  src={this.setImage(campeonato)}
                        alt={"Logo do campeonato "+campeonato.nomeCampeonato} />
                    </div>
                    <h4>{campeonato.nomeCampeonato}</h4>
                    <div className="apostar-container">Veja!</div>
                </div>
            );
        }else if(campeonato.statusCampeonato === "finalizado" ){ 
            return(
                <div className="campeonatoDiv finalizado">
                    <div className="imagemContainer">
                        <img  src={this.setImage(this.props.campeonato)}
                        alt={"Logo do campeonato "+this.props.campeonato.nomeCampeonato} />
                    </div>
                    <h4>{this.props.campeonato.nomeCampeonato}</h4>
                </div>
            );
        }else if(campeonato.statusCampeonato === "aposta"){
            return(
                <div className="campeonatoDiv aberto">
                    <div className="imagemContainer">
                        <img  src={this.setImage(campeonato)}
                        alt={"Logo do campeonato "+campeonato.nomeCampeonato} />
                    </div>
                    <h4>{campeonato.nomeCampeonato}</h4>
                    <div className="apostar-container aposte">Aposte!</div>
                </div>
            );
        }
    }

    //TODO Verificar que porque para o dahsboard, do jeito que está feito, só precisa do numero da fase. 
    //TODO E para a apostar, so precisaria do numero da parte.

    checkFases(campeonato){
        if(campeonato.statusCampeonato === "finalizado"){
            return(
                <div className="campeonatoFases-container finalizado">
                    {
                    campeonato.fases.map(function(fase, index){
                        return(
                            <Link 
                                key={index} 
                                className="campeonatoFases"
                                to={"/"+campeonato.idCampeonato+"/"+fase.id+"/dashboard"}
                            >
                                {fase.nomeFase}
                            </Link>
                        );
                    }, this)
                    }
                </div>
            );
        }else if(campeonato.statusCampeonato === "aberto"){
            return(
                <div className="campeonatoFases-container aberto">
                    {
                    campeonato.fases.map(function(fase, index){
                        return(
                            <Link 
                                key={index} 
                                className="campeonatoFases"
                                to={"/"+campeonato.idCampeonato+"/"+fase.id+"/dashboard"}
                            >
                                {fase.nomeFase}
                            </Link>
                        );
                    }, this)
                    }
                </div>
            );
        }else if(campeonato.statusCampeonato === "aposta"){
            return(
                <div className="campeonatoFases-container aberto">
                    {
                    campeonato.fases.map(function(fase, index){
                        return(
                            <Link 
                                key={index} 
                                className={fase.apostaFase?"campeonatoFases aberto" :"campeonatoFases"}
                                to={
                                    fase.apostaFase ? 
                                    "/"+campeonato.idCampeonato+"/"+fase.id+"/apostar"
                                    :
                                    "/"+campeonato.idCampeonato+"/"+fase.id+"/dashboard"
                                }
                            >
                                {fase.nomeFase}
                            </Link>
                        );
                    }, this)
                    }
                </div>
            );
        }
    }


    render() {
        return (
            <div className="campeonatoCard">

                {this.checkStatus(this.props.campeonato)}

                {this.checkFases(this.props.campeonato)}

            </div>
        );
    }
}

export default CampeonatoCard;