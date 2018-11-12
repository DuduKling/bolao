import React, { Component } from 'react';
import '../../css/home/timer.css';


// TODO não deixar aparecer NaN qnd a data tiver passado.
class Count extends Component {
	constructor() {
		super();
		this.state = {dias: '-', horas: '-', minutos: '-', segundos: '-'};
	}

	componentDidMount() {
		this.interval = setInterval(() => this.startTimer(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	startTimer() {
		let hoje = Date.now();
		let final  = new Date(this.props.dataFinal);
		let distancia = final.getTime() - hoje;
		
		let dias = '';
		let horas = '';
		let minutos = '';
		let segundos = '';

		if(distancia <= 0) {
			dias = 0;
			horas = 0;
			minutos = 0;
			segundos = 0;
		}else {
			dias = Math.floor(distancia /  (1000 * 60 * 60 * 24));
			horas = Math.floor((distancia % (1000 *  60 * 60 * 24)) / (1000 * 60 * 60));
			minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
			segundos = Math.floor((distancia % (1000 * 60)) / 1000);
		}
		

		this.setState({
			dias: dias,
			horas: horas,
			minutos: minutos,
			segundos: segundos,
		});
	}

    render() {
        return (
			<div id="timer-wrapper">
				<div className="fundo-num" >
					<p className="num-title">Dias</p>
					<div className="num" id="dias">{this.state.dias}</div>
				</div>
		
				<div className="fundo-num" >
					<p className="num-title">Horas</p>
					<div className="num" id="hrs">{this.state.horas}</div>
				</div>
		
				<div className="fundo-num" >
					<p className="num-title">Minutos</p>
					<div className="num" id="min">{this.state.minutos}</div>
				</div>
		
				<div className="fundo-num">
					<p className="num-title">Segundos</p>
					<div className="num" id="seg">{this.state.segundos}</div>
				</div>
			</div>
        );
    }
}

export default Count;