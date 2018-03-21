import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './styles/PokemonDetails.scss';
import {
    API_GET_SPRITE_FRONT,
    API_GET_SPRITE_BACK
} from '../constants/api';

class PokemonDetails extends React.Component {
    render = () => {
        const { id } = this.props;
        return (
            <div className='pokemon-details'>
                <div className='pokemon-image'>
                    <img src={API_GET_SPRITE_FRONT(id)} className='front'
                        onError={(e) => {
                            e.target.src = API_GET_SPRITE_FRONT('default/0');
                        }} />

                </div>
                <div className='pokemon-name'>Name of the Pokemon</div>
                <div className='pokemon-stats'>Loading...</div>
                <div className='pokemon-evolution'>Loading...</div>
            </div>
        );
    }
}

PokemonDetails.propTypes = {
    id: PropTypes.number.isRequired
};

const mapStateToProps = (state, props) => ({
    /* selectors pokemon list, pokemon details */
});
const mapDispatchToProps = (dispatch) => ({
    /* action to pull pokemon data  */
});

export default connect(mapStateToProps)(PokemonDetails);
