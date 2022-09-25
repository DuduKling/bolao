import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RankList extends Component {
    render() {
        return (
            <tr>
                <td className={"posicao" + this.props.position}>{this.props.position}</td>
                <td className="nome">
                    <Link to={"apostado/"+this.props.name}>{this.props.name}</Link>
                </td>
                <td className="pontos">{this.props.points}</td>
            </tr>
        );
    }
}

export default RankList;