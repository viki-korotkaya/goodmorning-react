import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBreakfastSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BREAKFAST_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBreakfastFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BREAKFAST_FAIL,
        error: error
    }
};

export const purchaseBreakfastStart = () => {
    return {
        type: actionTypes.PURCHASE_BREAKFAST_START
    }
};

export const purchaseBreakfast = (orderData) => {
    return dispatch => {
        dispatch(purchaseBreakfastStart());
        axios.post( '/orders.json', orderData )
            .then( response => {
                dispatch(purchaseBreakfastSuccess(response.data.name, orderData))
            } )
            .catch( error => {
                dispatch(purchaseBreakfastFail(error));
            } );
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

