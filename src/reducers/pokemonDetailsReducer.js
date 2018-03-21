const DEFAULT_STATE = {
    loading:false,
    error:null,
    details:{}
}

const pokemonDetailsReducer = (state=DEFAULT_STATE, action) => {

    console.log(action);

    return state;
};

export default pokemonDetailsReducer;