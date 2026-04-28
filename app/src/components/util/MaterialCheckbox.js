import React, { useEffect, useState } from 'react';
import '../../css/util/materialCheckbox.css';

import PropTypes from 'prop-types';

function MaterialCheckbox(props) {
    const [selected, setSelected] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const LABEL = `CHECK_${props.labelName}`;

    useEffect(() => {
        setSelected(!!props.fieldValue);
    }, [props.fieldValue]);

    useEffect(() => {
        if (props.fieldDisabled) {
            setDisabled(!!props.fieldDisabled);
        }
    }, []);

    const handleChange = () => {
        const newValue = !selected;

        setSelected(newValue);

        if (props.fieldController) {
            props.fieldController(newValue);
        }
    };

    return (
        <label htmlFor={LABEL} className="material-checkbox">
            <input
                className="input"
                id={LABEL}
                type="checkbox"
                checked={selected}
                onChange={handleChange}
                disabled={disabled}
            />
            <span className="checkbox">
                <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                    <path className="checked" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                    <path className="unchecked" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
            </span>
            <span className="label">{props.labelName}</span>
        </label>
    );
}

MaterialCheckbox.propTypes = {
    labelName: PropTypes.string,
    fieldController: PropTypes.func,
    fieldValue: PropTypes.string,
    fieldDisabled: PropTypes.bool,
};

export default MaterialCheckbox;
