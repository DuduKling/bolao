import React, { useEffect, useState } from 'react';
import '../../css/util/materialSelect.css';

import PropTypes from 'prop-types';

function MaterialSelect(props) {
    const [selected, setSelected] = useState(false);

    const LABEL = `SELECT_${props.labelName}`;

    useEffect(() => {
        setSelected(props.fieldValue);
    }, [props.fieldValue]);

    const handleChange = (event) => {
        const newValue = event.target.value;

        setSelected(newValue);

        if (props.fieldController) {
            props.fieldController(newValue);
        }
    };

    return (
        <div className="material-select">
            <label className="label" htmlFor={LABEL}>{props.labelName}</label>
            <div className="body">
                <select
                    className="select"
                    id={LABEL}
                    onChange={handleChange}
                    value={selected}
                >
                    {
                        props.fieldOptions.map((op, index) => {
                            return (
                                <option key={index} value={op.value}>{op.label}</option>
                            );
                        })
                    }
                </select>
                <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z"></path>
                </svg>
            </div>
        </div>
    );
}

MaterialSelect.propTypes = {
    labelName: PropTypes.string,
    fieldController: PropTypes.func,
    fieldValue: PropTypes.string,
    fieldOptions: PropTypes.array,
};

export default MaterialSelect;
