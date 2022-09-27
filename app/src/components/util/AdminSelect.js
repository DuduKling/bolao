import React, { Component } from 'react';
import '../../css/util/adminSelect.css';
import $ from 'jquery';

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
        var data = event.target.value;
        var parteID = event.target.name;

        var textJSON = `{
            "newStatus":"${data}",
            "parteID":"${parteID}"
        }`;
        var textJSON2 = JSON.parse(textJSON);
        var dataString = JSON.stringify(textJSON2);
        // console.log(dataString);
        
        this.setState({loading: true});
        $.ajax({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/admin/changeCampeonatoState.php`,
			type: 'post',
            data: dataString,
            dataType: "json",
            success: function(resposta){
                // console.log(resposta);
                this.setState({selected: data});
                this.setState({loading: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                this.setState({loading: false});
                this.setState({error: JSON.parse(xhr.responseText).message});
            }.bind(this)
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