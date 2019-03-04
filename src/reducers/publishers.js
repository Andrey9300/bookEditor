const publishers = (state = null, action) => {
    switch (action.type) {
        case 'ADD_PUBLISHER':
            return {
                ...state,
                publishers: state ? state.publishers.concat(action.publisher) : [action.publisher]
            };
        default:
            return state
    }
};

export default publishers;