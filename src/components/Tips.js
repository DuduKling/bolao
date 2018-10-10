import React, { Component } from 'react';

class Tips extends Component {
    render() {
        return (
            <div className="tip-container">
                <div className="tip -cinza">
                    <p>Observação:</p>
                    <p>Em caso de prorrogação, o placar que vier a ocorrer durante os 30 minutos da prorrogação será considerado o placar final (Desconsiderando os pênaltis). Ou seja, se for para os pênaltis o placar final foi um empate.</p>
                </div>
                <div className="tip -amarelo">
                    <p>Dicas:</p>
                    <p>Clique no nome de um participante para ver as apostas dele.</p>
                    <p>Clique em 'Ver apostas' para ver todas as apostas de um jogo.</p>
                    <p>Clique em 'Todos' para ver os resultados dos jogos da copa.</p>
                </div>
            </div>
        );
    }
}

export default Tips;