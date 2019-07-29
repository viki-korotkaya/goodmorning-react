import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: null,
    totalPrice: 0,
    error: false
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
        case actionTypes.SET_ITEMS:
            return {
                ...state,
                items: {
                    coffee: action.items.coffee,
                    tea: action.items.tea,
                    sugar: action.items.sugar,
                    croissant: action.items.croissant,
                    yogurt: action.items.yogurt,
                    salad: action.items.salad
                },
                totalPrice: 0,
                error: false
            };
        case actionTypes.FETCH_ITEMS_FAILED:
            return {
                ...state,
                error: true
            };
        default: return state;
    }
};

export default breakfastBuilder;