import React, { Component } from 'react';

class RankListWithoutPoints extends Component {
    render() {
        return (
            <tr>
                <td className="posicao">{this.props.position}</td>
                <td className="nome">
                    <p>{this.props.name}</p>
                </td>
            </tr>
        );
    }
}

export default RankListWithoutPoints;