import React from 'react';
import '../../css/util/loading.css';

import PropTypes from 'prop-types';

function Loading(props) {
    if (props.loading) {
        return (
            <div className={props.localstorage ? 'spinner ' + props.localstorage : 'spinner'}>
                <div className="half-circle-spinner">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="spinner-hide"></div>
        );
    }
}

Loading.propTypes = {
    loading: PropTypes.bool,
    localstorage: PropTypes.string,
};

export default Loading;
