import * as actionTypes from './actions';

const initialState = {
    items: {
        coffee: 0,
        tea: 0,
        sugar: 0,
        croissant: 0,
        yogurt: 0,
        salad: 0
    },
    totalTrice: 0
};

const reducer = (state = initialState, action) => {
    switch (actionTypes) {
        case actionTypes.ADD_ITEMS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.item]: state.items[action.item] + 1
                }
            };
        case actionTypes.REMOVE_ITEMS:
            return {

            };
        default:
            return state;
    }
};

export default reducer;