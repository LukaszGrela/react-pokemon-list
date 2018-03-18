import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
    render = () => {
        return (
            <article>
                <h1>Pokemon List</h1>
                <ul className='list'>
                {
                    this.props.list.map(({url, name}, index) => <li key={index}>{name}</li>)
                }
                </ul>
            </article>
        );
    }
};

const mapStateToProps = (state, props) => ({
    list: state.pokemons.list
});
export default connect(mapStateToProps)(Home);