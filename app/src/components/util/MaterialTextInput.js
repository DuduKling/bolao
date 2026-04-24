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
        if (props.fieldValue !== undefined) {
            setValue(props.fieldValue);
        }
    }, [props.fieldValue, props.fieldPlaceholder]);

    const handleInputChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setValue(inputValue);

        if (inputValue === '') {
            setStatus('');
        } else {
            setStatus('NotEmpty');
            checkRegex(inputValue, inputName);

            if (props.fieldController) {
                props.fieldController(inputValue);
            }
        }

    };

    const checkRegex = (inputValue, inputName) => {
        let regx = '';
        let resultado = '';

        switch (inputName) {
        case 'nome':
            regx = new RegExp('^[A-Za-zÀ-ú ]+([^\\t\\r\\n])$', 'gi');
            resultado = regx.test(inputValue);

            if (resultado) {
                setError('');
            } else {
                setError('error');
            }
            break;

        case 'email':
            regx = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$', 'gi');
            resultado = regx.test(inputValue);

            if (resultado) {
                setError('');
            } else {
                setError('error');
            }
            break;

        case 'senha':
        case 'senhaCheck':
            regx = new RegExp('^[\\w]{8,}$', 'gi');
            resultado = regx.test(inputValue);

            if (resultado) {
                setError('');
            } else {
                setError('error');
            }
            break;

        case 'phoneNumber':
            regx = new RegExp('^[0-9]{11}$', 'gi');
            resultado = regx.test(inputValue);

            if (resultado) {
                setError('');
            } else {
                setError('error');
            }
            break;
                setError('');
            }
            break;

        default:
            if (inputValue === '') {
                setError('error');
            } else {
                setError('');
            }
            break;
        }
    };

    return (
        <div className="material-input">

            <input
                type={props.fieldType}
                name={props.fieldName}
                id={props.fieldName}
                onChange={handleInputChange}
                className={error}
                required={!props.fieldRequired}
                maxLength={props.maxLength ? props.maxLength : '30'}
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
    maxLength: PropTypes.string,
    fieldController: PropTypes.func,
};

export default MaterialTextInput;
