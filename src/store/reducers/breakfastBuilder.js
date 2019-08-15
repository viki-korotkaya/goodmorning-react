import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    items: null,
    totalPrice: 0,
    error: false,
    building: false
};

const ITEM_PRICES = {
    coffee: 4.5,
    tea: 2.0,
    sugar: 0.3,
    croissant: 3.5,
    yogurt: 3.0,
    salad: 4.5
};

const addItem = (state, action) => {
    const updatedItem = {[action.itemName]: state.items[action.itemName] + 1};
    const updatedItems = updateObject(state.items, updatedItem);
    const updatedState = {
        items: updatedItems,
        totalPrice: state.totalPrice + ITEM_PRICES[action.itemName],
        building: true
    };
    return updateObject(state, updatedState);
};

const removeItem = (state, action) => {
    const updatedIt = {[action.itemName]: state.items[action.itemName] - 1};
    const updatedIts = updateObject(state.items, updatedIt);
    const updatedSt = {
        items: updatedIts,
        totalPrice: state.totalPrice - ITEM_PRICES[action.itemName],
        building: true
    };
    return updateObject(state, updatedSt);
};

const setItems = (state, action) => {
    return updateObject(state, {
        items: {
            coffee: action.items.coffee,
            tea: action.items.tea,
            sugar: action.items.sugar,
            croissant: action.items.croissant,
            yogurt: action.items.yogurt,
            salad: action.items.salad
        },
        totalPrice: 0,
        error: false,
        building: false
    });
};

const fetchItemsFailed = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const breakfastBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ITEM: return addItem(state, action);
        case actionTypes.REMOVE_ITEM: return removeItem(state, action);
        case actionTypes.SET_ITEMS: return setItems(state, action);
        case actionTypes.FETCH_ITEMS_FAILED: return fetchItemsFailed(state, action);
        default: return state;
    }
};

export default breakfastBuilder;