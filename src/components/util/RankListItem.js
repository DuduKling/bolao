import React, { Component } from 'react';
import '../../css/util/rankListItem.css';

import { Link } from 'react-router-dom';

class RankListItem extends Component {
    render() {
        return (
            <tr key={this.props.index}>
                <td className="positionColumn">
                    <Link to={"/"+this.props.link.fase+"/apostado/"+this.props.rank.name}>
                        {this.props.rank.position}
                    </Link>
                </td>
                <td className="nameColumn">
                    <Link to={"/"+this.props.link.fase+"/apostado/"+this.props.rank.name}>
                        {this.props.rank.name}
                    </Link>
                </td>
                <td className="pointsColumn">
                    <Link to={"/"+this.props.link.fase+"/apostado/"+this.props.rank.name}>
                        {this.props.rank.points}
                    </Link>
                </td>
            </tr>
        );
    }
}

export default RankListItem;