import React from 'react';

import '../../css/util/avatar.css';

import PropTypes from 'prop-types';

function Avatar(props) {

    const generateColor = () => {
        const colors = [
            '#000000',
            '#1a1a1a',
            '#333333',
            '#4d4d4d',
            '#666666',
            '#800000',
            '#008000',
            '#000080',
            '#800080',
            '#808000',
            '#008080',
            '#800040',
            '#004080',
            '#804000',
            '#408000',
            '#008040',
            '#400080',
            '#804080',
            '#408080',
            '#808040'
        ];

        let hash = 0;
        for (let i = 0; i < props.userName.length; i++) {
            hash += props.userName.charCodeAt(i);
        }

        return colors[hash % colors.length];
    };

    const generateLetters = () => {
        const words = props.userName.trim().split(/\s+/);

        let letters = '';
        if (words.length === 1) {
            letters = words[0].substring(0, 2);
        }else {
            letters = words.slice(0, 2).map(word => word.charAt(0)).join('');
        }

        return letters.toUpperCase();
    };

    return (
        <div className="avatar" style={{ backgroundColor: generateColor(), }}>
            {generateLetters()}
        </div>
    );
}

Avatar.propTypes = {
    userName: PropTypes.string,
};

export default Avatar;
