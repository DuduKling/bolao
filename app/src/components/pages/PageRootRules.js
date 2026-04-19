import React from 'react';
import '../../css/regulamento.css';

function Regulamento() {
    return (
        <div className="MainContent-container">
            <div className="regulamento">
                <h3>Regulamento</h3>

                <ol className="textao">
                    <li>
                        <h4>COMO PARTICIPAR</h4>
                        <ol className="textao-container">
                            <li>Qualquer pessoa física poderá participar do <span>Bolão Imperial</span>.</li>

                            <li>Para tal, a pessoa deve se cadastrar na plataforma, escolher a competição que irá participar e depois preencher os resultados de cada partida.</li>

                            <li>Após a realização das apostas, o participante deve finalizar a inscrição no bolão, pagando o valor de R$ 20,00 (vinte reais) para qualquer um dos responsáveis pela organização do bolão.</li>

                            <li>O pagamento poderá ser realizado em dinheiro, ou via Pix, devendo, para tanto, ser comprovado o depósito mediante contato com um dos responsáveis.</li>

                            <li>O pagamento em pix deve ser efetuado para a chave: <span>guibotelho64@hotmail.com</span>. Todo o montante arrecadado no bolão será depositado nesta conta e posteriormente será entregue ao vencedor do bolão.</li>

                        </ol>
                    </li>
                    <li>
                        <h4>DOS RESPONSÁVEIS</h4>
                        <ol className="textao-container">
                            <li>Os responsáveis estão sempre disponíveis para sanar quaisquer dúvidas, seja das do funcionamento da plataforma, do bolão ou para o recebimento do valor padrão do bolão.</li>
                            <li>São responsáveis do bolão:</li>
                            <ul>
                                <li>Guilherme Marques Botelho;</li>
                                <li>Marcio Rosado Botelho;</li>
                                <li>Eduardo Kling Mesiano;</li>
                                <li>José Luiz Cilento.</li>
                            </ul>
                        </ol>
                    </li>

                    <li>
                        <h4>DA PONTUAÇÃO</h4>
                        <ol className="textao-container">
                            <li>A pontuação dos participantes será feita em função de seus prognósticos para o resultado e o placar das partidas.</li>

                            <li>Por resultado entende-se a indicação de vitória, derrota ou empate deste ou daquele time.</li>

                            <li>A pontuação dos acertos será feita a partir dos seguintes critérios:</li>

                            <div className="liTabela">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Ex. Apostado</th>
                                            <th>Ex. Placar Final</th>
                                            <th>Pontuação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Acertou Placar</td>
                                            <td>Brasil 1x0 Argentina</td>
                                            <td>Brasil 1x0 Argentina</td>
                                            <td className="points">3</td>
                                        </tr>
                                        <tr>
                                            <td>Acertou Vencedor</td>
                                            <td>Brasil 1x0 Argentina</td>
                                            <td>Brasil 2x1 Argentina</td>
                                            <td className="points">1</td>
                                        </tr>
                                        <tr>
                                            <td>Errou Placar</td>
                                            <td>Brasil 2x0 Argentina</td>
                                            <td>Brasil 1x1 Argentina</td>
                                            <td className="points">0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <li>Obs: As regras acima se aplicam aos empates. (Ex, se em determinado jogo um participante aposta no placar de 1x1 e o resultado final é 1x1 ele receberá 3 pontos).</li>

                            <li>Para competições ou fases, que tenham prorrogação, o placar que vier a ocorrer durante os 30 minutos da prorrogação será considerado no placar final (Desconsiderando os pênaltis). Ou seja, se for para os pênaltis o placar final foi um empate.</li>
                        </ol>
                    </li>


                    <li>
                        <h4>DO VENCEDOR E DA PREMIAÇÃO</h4>
                        <ol className="textao-container">
                            <li>O <span>Bolão Imperial</span> terá por vencedor, o participante que obtiver o maior número de pontos ao fim de todas as rodadas da fase ou competição.</li>

                            <li>Em caso de empate o prêmio será dividido igualmente entre os vencedores.</li>

                            <li>O valor da premiação será divulgado até 2 (dois) dias depois do início da competição.</li>
                        </ol>
                    </li>

                    <li>
                        <h4>DA EXCLUSÃO</h4>
                        <ol className="textao-container">
                            <li>O participante que, após o registro de suas apostas no site, não efetuar o pagamento até 1 (um) dia antes do início da competição será excluído do <span>Bolão Imperial</span>.</li>
                        </ol>
                    </li>

                </ol>
            </div>
        </div>
    );
}

export default Regulamento;
