import React, { Component } from 'react';
import '../../css/pages/campeonato.css';
import { Link } from 'react-router-dom';

/* Status:
    finalizado - Vai para dashboard (sem aposta lá).
    aberto - Vai para dashboard (com aposta lá).
    aposta - Vai para tela de Apostas.
    tba - Sem link (Mostra data de início).
*/

class CampeonatoCard extends Component {
    setImage(campeonato){
        if(campeonato.logoCampeonato===""){
            return "/imagens/campeonatos/default.png"
        }else{
            return "/imagens/campeonatos/"+campeonato.logoCampeonato
        }
    }

    checkStatus(campeonato){
        var qtdAposta = campeonato.fases
        .reduce(function(acc, currValue){
            return acc.concat(currValue.partes);
        }, [])
        .filter(function(parte){
            return parte.statusParte === "aposta";
        })
        .length;

        var qtdAberto = campeonato.fases
        .reduce(function(acc, currValue){
            return acc.concat(currValue.partes);
        }, [])
        .filter(function(parte){
            return parte.statusParte === "aberto";
        })
        .length;

        var qtdTba = campeonato.fases
        .reduce(function(acc, currValue){
            return acc.concat(currValue.partes);
        }, [])
        .filter(function(parte){
            return parte.statusParte === "tba";
        })
        .length;

        var qtdFinalizado = campeonato.fases
        .reduce(function(acc, currValue){
            return acc.concat(currValue.partes);
        }, [])
        .filter(function(parte){
            return parte.statusParte === "finalizado";
        })
        .length;

        var totalPartes = qtdAposta+ qtdAberto + qtdFinalizado + qtdTba;
        
        if(qtdTba === totalPartes){
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
        }else if(qtdFinalizado === totalPartes){ 
            return(
                <div className="campeonatoDiv finalizado">
                    <div className="imagemContainer">
                        <img  src={this.setImage(this.props.campeonato)}
                        alt={"Logo do campeonato "+this.props.campeonato.nomeCampeonato} />
                    </div>
                    <h4>{this.props.campeonato.nomeCampeonato}</h4>
                </div>
            );

        }else if(qtdAposta > 0){
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
        }else{
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
        }
    }
    
    checkFases(campeonato, fase, index){
        var qtdFinalizado = fase.partes
            .reduce(function(acc, currValue){
                return acc.concat(currValue);
            }, [])
            .filter(function(parte){
                return parte.statusParte === "finalizado";
            })
            .length;

        var qtdApostar = fase.partes
            .reduce(function(acc, currValue){
                return acc.concat(currValue);
            }, [])
            .filter(function(parte){
                return parte.statusParte === "aposta";
            })
            .length;

        var qtdAberto = fase.partes
            .reduce(function(acc, currValue){
                return acc.concat(currValue);
            }, [])
            .filter(function(parte){
                return parte.statusParte === "aberto";
            })
            .length;
        
        var total = qtdFinalizado + qtdAberto + qtdApostar;

        // console.log("FASE:")
        // console.log(qtdFinalizado);
        // console.log(qtdAberto);
        // console.log(qtdApostar);
        // console.log("TOTAL(fin, ab, ap): " + total +"\n\n");

        var parteAberta = fase.partes
            .reduce(function(acc, currValue){
                return acc.concat(currValue);
            }, [])
            .filter(function(parte){
                return parte.statusParte === "aposta";
            });

        if(
            (qtdFinalizado > 0 && qtdFinalizado === total) || 
            (qtdAberto > 0 && qtdApostar === 0)
        ){
            return(
                <Link 
                    key={index} 
                    className="campeonatoFases"
                    to={"/"+campeonato.idCampeonato+"/"+fase.id+"/dashboard"}
                >
                    {fase.nomeFase}
                </Link>
            );
        }else if(qtdAberto === 0 && qtdApostar > 0){
            return(
                <Link
                    className="campeonatoFases apostar"
                    to={"/"+parteAberta[0].id+"/apostar"}
                >
                    {fase.nomeFase+" / "+parteAberta[0].nomeParte}
                </Link>
            );
        }else if(qtdAberto > 0 && qtdApostar > 0){
            return(
                <div key={index}>
                    <Link
                        className="campeonatoFases"
                        to={"/"+campeonato.idCampeonato+"/"+fase.id+"/dashboard"}
                    >
                        {fase.nomeFase}
                    </Link>

                    <Link
                        className="campeonatoFases apostar"
                        to={"/"+parteAberta[0].id+"/apostar"}
                    >
                        {fase.nomeFase+" / "+parteAberta[0].nomeParte}
                    </Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="campeonatoCard">

                {this.checkStatus(this.props.campeonato)}

                <div className="campeonatoFases-container">
                    {
                    this.props.campeonato.fases.map(function(fase, index){
                        return this.checkFases(this.props.campeonato, fase , index);
                    }, this)
                    }
                </div>
            </div>
        );
    }
}

export default CampeonatoCard;