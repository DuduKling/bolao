import React, { useEffect, useState } from 'react';
import '../../css/util/materialInput.css';

import PropTypes from 'prop-types';

function MaterialTextInput(props) {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (props.fieldPlaceholder !== undefined) {
            setValue(props.fieldPlaceholder);
        }
    }, []);

    const handleInputChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setValue(inputValue);

        if (value !== '') {
            setStatus('NotEmpty');
            checkRegex(inputValue, inputName);
        } else {
            setStatus('');
        }

    };

    const checkRegex = (inputValue, inputName) => {
        let regx = '';
        let resultado = '';

        switch (inputName) {
        case 'nome':
            regx = new RegExp('^[A-Za-zÀ-ú ]+([^\\t\\r\\n])$', 'gi');
            resultado = regx.test(inputValue);

            if (!resultado) {
                setError('error');
            } else {
                setError('');
            }
            break;

        case 'email':
            regx = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$', 'gi');
            resultado = regx.test(inputValue);

            if (!resultado) {
                setError('error');
            } else {
                setError('');
            }
            break;

        case 'senha':
        case 'senhaCheck':
            regx = new RegExp('^[\\w]{8,}$', 'gi');
            resultado = regx.test(inputValue);

            if (!resultado) {
                setError('error');
            } else {
                setError('');
            }
            break;

        default:
            if (inputValue === '') {
                setError('error');
            } else {
                setError('');
            }
        }
    };

    return (
        <div className="material-input">

            <input
                type={props.fieldType}
                name={props.fieldName}
                onChange={handleInputChange}
                className={error}
                required={props.fieldRequired ? false : true}
                maxLength="30"
                value={value}
            />

            <label
                htmlFor={props.fieldName}
                className={status}>

                {props.labelName}

            </label>
        </div>
    );
}

MaterialTextInput.propTypes = {
    fieldPlaceholder: PropTypes.string,
    fieldType: PropTypes.string,
    fieldName: PropTypes.string,
    fieldRequired: PropTypes.bool,
    labelName: PropTypes.string,
};

export default MaterialTextInput;
