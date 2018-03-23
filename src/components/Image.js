import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt, className, fallback }) => (
    <img
        src={src}
        alt={alt ? alt : ''}
        className={'image ' + className}
        onError={(e) => {
            if (fallback)
                e.target.src = fallback;
        }} />
);
Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string
};


export default Image;