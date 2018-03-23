import React from 'react';
import PropTypes from 'prop-types';

import './styles/LoadMore.scss';
const LoadMore = ({clickHandler}) => (
    <div className='load-more'>
        <button onClick={
            () => {
                clickHandler()
            }
        }>Load more Pokémons</button>
    </div>
);
LoadMore.propTypes = {
    clickHandler:PropTypes.func.isRequired
};


export default LoadMore;