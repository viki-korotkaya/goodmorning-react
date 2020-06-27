import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    items: null,
    totalPrice: 0,
    error: false,
    building: false
};

const ITEM_PRICES = {
    espresso: 2.5,
    americano: 2.0,
    cappuccino: 3.5,
    latte: 3.2,
    bigjoe: 5.0,
    hotchoc: 4.5
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
            espresso: action.items.espresso,
            americano: action.items.americano,
            cappuccino: action.items.cappuccino,
            latte: action.items.latte,
            bigjoe: action.items.bigjoe,
            hotchoc: action.items.hotchoc
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

const shopBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ITEM: return addItem(state, action);
        case actionTypes.REMOVE_ITEM: return removeItem(state, action);
        case actionTypes.SET_ITEMS: return setItems(state, action);
        case actionTypes.FETCH_ITEMS_FAILED: return fetchItemsFailed(state, action);
        default: return state;
    }
};

export default shopBuilder;
