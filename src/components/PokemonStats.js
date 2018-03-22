import React from 'react';
import PropTypes from 'prop-types';



import './styles/PokemonStats.scss';

export default class PokemonStats extends React.Component {
    render = () => {
        const { stats } = this.props;
        return (
            <div className={'pokemon-stats'}>
                <div className='stats-wrapper'>
                    {
                        stats.map((stat, index) => {
                            return (
                                <div key={'stat' + index}
                                    className={`stat stat-${stat.stat.name}`}>
                                    <span className='label'>{stat.stat.name}: </span>
                                    <span className='value'>{stat.base_stat}</span>
                                </div>
                            )
                        })
                    }
                    <div className='stat total'>
                        <span className='label'>Total: </span>
                        <span className='value'>{stats.reduce((prev, curr) => prev += curr.base_stat, 0)}</span>
                    </div>
                </div>
            </div>
        )
    };
}

PokemonStats.propTypes = {
    stats: PropTypes.array.isRequired
};