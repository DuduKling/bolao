import React, { useState } from 'react';
import '../../css/util/adminSelect.css';

import http from '../../util/http';
import Loading from '../util/Loading';

import PropTypes from 'prop-types';

function AdminSelect(props) {
    const [selected] = useState(props.selected);
    const [loading, setLoading] = useState(false);

    const handleChange = async (event) => {
        setLoading(true);

        const data = event.target.value;
        const parteID = event.target.name;

        const dataString = JSON.stringify({
            newStatus: data,
            parteID: parteID,
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/admin/changeCampeonatoState.php`,
            data: dataString,
            thenCallback: () => {
                setLoading(false);
                props.updateCampeonatos();
            },
            catchCallback: () => {
                setLoading(false);
            },
        });
    };

    const isSelected = (value) => {
        return value === selected ? 'selected' : '';
    };

    return (
        <div className="materialSelect">
            <select
                onChange={async (event) => handleChange(event)}
                className="selectField"
                name={props.parteID}
                defaultValue={selected}
            >
                <option selected={isSelected('aposta')} value="aposta">aposta</option>
                <option selected={isSelected('aberto')} value="aberto">aberto</option>
                <option selected={isSelected('finalizado')} value="finalizado">finalizado</option>
                <option selected={isSelected('tba')} value="tba">tba</option>
            </select>
            <span className="selectBottomBbar"></span>
            <label className="selectLabel">Status</label>
            <Loading loading={loading} />
        </div>
    );
}

AdminSelect.propTypes = {
    selected: PropTypes.string,
    parteID: PropTypes.string,
    updateCampeonatos: PropTypes.func,
};

export default AdminSelect;
