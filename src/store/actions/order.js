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

export const purchaseBreakfast = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBreakfastStart());
        axios.post( '/orders.json?auth=' + token, orderData )
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

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersSFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        orders: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('orders.json' + queryParams)
            .then(res => {
                const orders = [];
                for (let key in res.data){
                    orders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(orders));
            })
            .catch(err => {
                dispatch(fetchOrdersSFail(err));
            });
    }
};


