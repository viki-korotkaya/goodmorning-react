import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render(){

        let orders = <Spinner />;

        if (!this.props.loading && this.props.orders.length !== 0){
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    items={order.items}
                    price={Number.parseFloat(order.price).toFixed(2)} />
            ));
        } else if (!this.props.loading && this.props.orders.length === 0) {
            orders = <p style={{
                paddingLeft: '15px',
                fontWeight: 'bold',
                fontSize: '1.2rem'
            }}>Your history of orders is empty</p>;
        }
        return (
            <div style={{paddingTop: '15px' }}>
                {orders}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));