import React, { Component } from 'react';
import RankList from './RankList';
import $ from 'jquery';
import Loading from './Loading';
import RankListWithoutPoints from './RankListWithoutPoints';


class RankContainer extends Component {
    constructor() {
        super();
        this.state = {rank: [
            // {
            //     "position": "0",
            //     "name": "Nome completo 1234",
            //     "points": "25"
            // },
            // {
            //     "position": "1",
            //     "name": "Nome completo 2",
            //     "points": "25"
            // },
            // {
            //     "position": "0",
            //     "name": "Nome completo 1234",
            //     "points": "25"
            // },
            // {
            //     "position": "0",
            //     "name": "Nome completo 2",
            //     "points": "23"
            // },
            // {
            //     "position": "0",
            //     "name": "Nome completo 1234",
            //     "points": "23"
            // },
            // {
            //     "position": "0",
            //     "name": "Nome completo 2",
            //     "points": "11"
            // },
            // {
            //     "position": "0",
            //     "name": "Nome completo 1234",
            //     "points": "8"
            // },
            // {
            //     "position": "0",
            //     "name": "Nome completo 2",
            //     "points": "0"
            // }
        ]};
    }

    componentWillMount() {
        var fase = this.props.fase_comp;
        this.setState({fase: fase});
    }

    componentDidMount() {
        var dataString = "fase="+this.state.fase;
        
        this.setState({loading: true});
        $.ajax({
            url:"../php/getRank.php",
            type: 'post',
            data: dataString,
            dataType: 'json',
            success: function(resposta){
                this.setState({loading: false});

                // console.log(resposta);

                var position = 1;
                var anterior = resposta[0].points;

                resposta.map((irank)=>{
                    // console.log(position);
                    // console.log(anterior);
                    // console.log("\n\n");

                    if(irank.points !== anterior) {
                        position += 1;
                    }
                    irank.position = position;
                    anterior = irank.points;
                    return true;
                });
                // console.log(resposta);
                this.setState({rank: resposta});

                // console.log(this.state.rank);
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    placeIsHomeTH(){
        if (this.props.placedIn !== "home"){
            return (
                <th className="pontos">Pontuação</th>
            );
        }
    }

    placeIsHomeTD(){
        if (this.props.placedIn === "home"){
            return (
                this.state.rank.map(function(irank, index){
                    return(
                        <RankListWithoutPoints key={index} position={index+1} name={irank.name} points={irank.points} />
                    )
                })
            );
        }else{
            return(
                this.state.rank.map(function(irank, index){
                    return(
                        <RankList fase_comp={this.state.fase} key={index} name={irank.name} points={irank.points} position={irank.position} />
                    )
                }, this)
            );
        }
    }

    placeIsHomeH3(){
        if (this.props.placedIn === "home"){
            return(
                <h3>Participantes</h3>
            );
        }else{
            return(
                <h3>Tabela</h3>
            );
        }
    }

    render() {
        return (
            <div className="rank-container">
                {this.placeIsHomeH3()}
                <table className="rank">
                <thead>
                    <tr>
                        <th className="posicao">#</th>
                        <th className="nome">Nome</th>
                        {this.placeIsHomeTH()}
                    </tr>
                </thead>
                <tbody>
                    {this.placeIsHomeTD()}         
                </tbody>
                </table>
                <Loading loading={this.state.loading}/>
            </div>
        );
    }
}

export default RankContainer;