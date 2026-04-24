import React, { useEffect, useState } from 'react';
import '../../css/util/materialSwitch.css';

import PropTypes from 'prop-types';

function MaterialSwitch(props) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(!!props.fieldValue);
    }, [props.fieldValue]);

    const handleChange = () => {
        const newValue = !checked;

        setChecked(newValue);

        if (props.fieldController) {
            props.fieldController(newValue);
        }
    };

    return (
        <label className="material-switch" htmlFor={props.labelName}>
            <input className="input" type="checkbox" id={props.labelName} checked={checked} onChange={handleChange} />
            <div className="switchContainer">
                <span className="base">
                    <span className="thumb"></span>
                </span>
                <span className="track"></span>
            </div>
            <span className="label">{props.labelName}</span>
        </label>
    );
}

MaterialSwitch.propTypes = {
    labelName: PropTypes.string,
    fieldController: PropTypes.func,
    fieldValue: PropTypes.string,
};

export default MaterialSwitch;
