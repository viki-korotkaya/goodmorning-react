import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: {
        coffee: 0,
        tea: 0,
        sugar: 0,
        croissant: 0,
        yogurt: 0,
        salad: 0
    },
    totalPrice: 0
};

const ITEM_PRICES = {
    coffee: 4.5,
    tea: 2.0,
    sugar: 0.3,
    croissant: 3.5,
    yogurt: 3.0,
    salad: 4.5
};

const breakfastBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ITEM:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.itemName]: state.items[action.itemName] + 1
                },
                totalPrice: state.totalPrice + ITEM_PRICES[action.itemName]
            };
        case actionTypes.REMOVE_ITEM:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.itemName]: state.items[action.itemName] - 1
                },
                totalPrice: state.totalPrice - ITEM_PRICES[action.itemName]
            };
        default: return state;
    }
};

export default breakfastBuilder;