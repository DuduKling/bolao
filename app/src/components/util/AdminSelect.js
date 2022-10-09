import React, { useEffect, useState } from 'react';
import '../../css/util/adminSelect.css';

import http from '../../util/http';
import Loading from '../util/Loading';

import PropTypes from 'prop-types';

function AdminSelect(props) {
    const [selected, setSelected] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.selected) {
            setSelected(props.selected);
        }
    }, []);

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
                setSelected(data);
                setLoading(false);
            },
            catchCallback: () => {
                setLoading(false);
            },
        });
    };

    return (
        <div className="materialSelect">
            <select
                onChange={async () => handleChange}
                className="selectField"
                name={props.parteID}
                value={selected}
            >
                <option value="aposta">aposta</option>
                <option value="aberto">aberto</option>
                <option value="finalizado">finalizado</option>
                <option value="tba">tba</option>
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
};

export default AdminSelect;
