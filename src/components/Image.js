import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, className, fallback }) => (
    <img
        src={src}
        className={'image ' + className}
        onError={(e) => {
            if (fallback)
                e.target.src = fallback;
        }} />
);
Image.propTypes = {
    src: PropTypes.string.isRequired
};


export default Image;