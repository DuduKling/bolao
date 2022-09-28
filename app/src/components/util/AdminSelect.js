import React, { Component } from 'react';
import '../../css/util/adminSelect.css';

import http from '../../util/http';

import Loading from '../util/Loading';


class AdminSelect extends Component {
    constructor() {
        super();
        this.state = {
            selected: ""
        };
    }

    componentDidMount(){
        if(this.props.selected){
            this.setState({
                selected: this.props.selected
            });
        }
    }

    handleChange = (event) => {
        this.setState({ loading: true });

        const data = event.target.value;
        const parteID = event.target.name;

        const dataString = JSON.stringify({
            newStatus: data,
            parteID: parteID
        });

        http({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/admin/changeCampeonatoState.php`,
            data: dataString,
            thenCallback: (response) => {
                this.setState({ selected: data });
                this.setState({ loading: false });
            },
            catchCallback: ({ message }) => {
                this.setState({ loading: false });
                this.setState({ error: message });
            }
        });
    };

    render() {
        return (
            <div className="materialSelect">
                <select 
                    onChange={this.handleChange} 
                    className="selectField" 
                    name={this.props.parteID}  
                    value={this.state.selected}
                >
                    <option value="aposta">aposta</option>
                    <option value="aberto">aberto</option>
                    <option value="finalizado">finalizado</option>
                    <option value="tba">tba</option>
                </select>
                <span className="selectBottomBbar"></span>
                <label className="selectLabel">Status</label>
                <Loading loading={this.state.loading} />
            </div>
        );
    }
}

export default AdminSelect;