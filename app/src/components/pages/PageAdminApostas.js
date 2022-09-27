import React, { Component } from 'react';
import Loading from '../util/Loading';
import $ from 'jquery';


class PageAdminApostas extends Component {
    constructor() {
        super();
        this.state = {
            // listNames: 
            // [
            //     {
            //         "name": "Nome completo 1234",
            //         "partesApostadas": "Oitavas,Quartas,Semi,Final"
            //     },
            //     {
            //         "name": "Nome completo 1234",
            //         "partesApostadas": "Oitavas,Quartas,Semi,Final"
            //     },
            //     {
            //         "name": "Nome completo 1234",
            //         "partesApostadas": "Oitavas,Semi,Final"
            //     },
            //     {
            //         "name": "Nome completo 1234",
            //         "partesApostadas": "Oitavas,Quartas,Semi,Final"
            //     },
            //     {
            //         "name": "Nome completo 1234",
            //         "partesApostadas": "Oitavas,Quartas,Final"
            //     },
            //     {
            //         "name": "Nome completo 1234",
            //         "partesApostadas": "Oitavas,Quartas,Semi,Final"
            //     }
            // ],
            // partes: "Oitavas,Quartas,Semi,Final"
        };
    }
    
    componentDidMount(){
        this.setState({loading: true});

        var faseID = this.props.match.params.fase;

        var textJSON = `{
            "faseID":"${faseID}"
        }`;
        var textJSON2 = JSON.parse(textJSON);
        var dataString = JSON.stringify(textJSON2);

        $.ajax({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/admin/getApostasRealizadas.php`,
            type: 'post',
            data: dataString,
            contentType : 'application/json',
            success: function(resposta){
                // console.log(resposta);
                this.setState({
                    partes: resposta.partes,
                    listNames: resposta.listNames,
                    loading: false
                });

                // localStorage.setItem('campeonatos', JSON.stringify(resposta));

            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                console.log(JSON.parse(xhr.responseText));
                console.log(JSON.parse(xhr.responseText).message.toString());

                this.setState({loading: false});
            }.bind(this)
        });
    }

    showHeader(){
        if(this.state.partes){
            return this.state.partes.split(',').map(function(parte, index){
                return <td key={index} className="markColumn">{parte}</td>
            })
        }
    }
    
    showList(){
        if(this.state.listNames){
            return this.state.listNames.map(function(user, index){
                return(
                    <tr key={index}>
                        <td className="nameColumn">{user.name}</td>

                        {
                        this.state.partes.split(',').map(function(parte, index){
                            if(user.partesApostadas.includes(parte)){
                                return <td key={index} className="markColumn">
                                    <div className="statusMark"></div>
                                </td>
                            }else{
                                return <td key={index} className="markColumn"></td>
                            }
                        }, this)
                        }

                    </tr>
                );
            }, this)
        }
    }

    render() {
        return (
            <div className="userPage-container">
                <div className="userPage-userCampeonatos">
                    
                    <div className="main-partidaForm">
                        <table className="adminTable">
                            <caption>
                                <h3 className="page-title -admin">
                                    Apostas realizadas 
                                    <Loading loading={this.state.loading} localstorage="-withLocalStorage3"/>
                                </h3>
                            </caption>
                            <thead>
                                <tr>
                                    <td className="nameColumn">Nome</td>

                                    {this.showHeader()}

                                </tr>
                            </thead>
                            <tbody>
                                {this.showList()}                            
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default PageAdminApostas;