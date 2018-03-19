import React from 'react';

import './styles/Spinner.scss';

const Spinner = () => (
    <div className='loading-spinner'>
        <svg
            version='1'
            className='spinner'
            width='40'
            height='40'
            viewBox='0 0 40 40'
        >
            <circle cx="20" cy="20" r="18" id='bg'></circle>
            <circle cx="20" cy="20" r="18" id='fg'></circle>
        </svg>
    </div>
);
export default Spinner;