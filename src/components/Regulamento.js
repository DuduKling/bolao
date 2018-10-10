import React, { Component } from 'react';

class Regulamento extends Component {
    render() {
        return (
            <div className="regulamento">
                <h3>Regulamento</h3>
                <div className="textao">
                    <p>1. COMO PARTICIPAR</p>
                    <p className="tab">1.1 Qualquer pessoa física poderá participar do BOLÃO DO GUI, cadastrando-se no site <a className="link" href="https://bolaodogui.000webhostapp.com">www.bolaodogui.000webhostapp.com</a>. Para tal, deve digitar seu nome após devidamente preencher os resultados de cada partida da primeira fase da Copa do Mundo de 2018.</p>
                    <p className="tab">1.2 Após a realização das apostas, o participante deve pagar o valor de R$ 10,00 (dez reais) para qualquer um dos responsáveis pela organização do bolão.</p>

                    <p>2. DOS RESPONSÁVEIS</p>
                    <p className="tab">2.1 São responsáveis por recolher o dinheiro de cada participante:</p>
                    <ul className="tab">
                        <li>Guilherme Marques Botelho;</li>
                        <li>Marcio Rosado Botelho;</li>
                        <li>Eduardo Mesiano Kling;</li>
                        <li>José Luiz Cilento;</li>
                        <li>Qualquer indivíduo, desde que remeta o valor recolhido à um dos demais responsáveis acima listados.</li>
                    </ul>
                    <p>3. DA PONTUAÇÃO</p>
                    <p className="tab">3.1 A pontuação dos participantes será feita em função de seus prognósticos para o resultado e o placar das partidas, conforme abaixo. Por resultado entende-se a indicação de vitória/derrota/empate deste ou daquele time. A pontuação dos acertos será feita a partir dos seguintes critérios:</p>
                    <ul className="tab">
                        <li>Acerto do placar exato (Ex: Participante aposta no Brasil vencendo a Suíça pelo placar de 1x0 e o placar do jogo é 1x0 para o Brasil) – 03 pontos;</li>
                        <li>Acerto apenas do time vencedor (Ex: Participante aposta no Brasil vencendo a Suíça pelo placar de 1x0 e o placar do jogo é 2x1 para o Brasil) – 01 ponto;</li>
                        <li>Erro do placar (Ex: Participante aposta no Brasil Vencendo a Suíça por 2x0 e o placar do jogo é um empate de 1x1) – 00 ponto.</li>
                    </ul>
                    <p className="tab">Obs: A regra acima se aplica aos empates. (Ex, se em determinado jogo um participante aposta no placar de 1x1 e o resultado final é 1x1 ele receberá 3 pontos)</p>
                    
                    <p>4. DO VENCEDOR E DA PREMIAÇÃO</p>
                    <p className="tab">4.1 O BOLÃO DO GUI terá por vencedor o participante que obtiver o maior número de pontos ao fim de todas as rodadas da primeira fase da Copa do Mundo de 2018.</p>
                    <p className="tab">4.2 Em caso de empate o prêmio será dividido igualmente entre os vencedores.</p>
                    <p className="tab">4.3 O valor da premiação será incluído no regulamento e divulgado no site do BOLÃO DO GUI 2 (dois) dias antes de iniciada a Copa do Mundo de 2018.</p>
                    
                    <p>5. DA EXCLUSÃO</p>
                    <p className="tab">5.1 O participante que, após o registro de suas apostas no site, não efetuar o pagamento até o dia 14/06/2018 será excluído do BOLÃO DO GUI.</p>
                </div>
            </div>
        );
    }
}

export default Regulamento;