import React, { Component } from 'react';
import {connect} from "react-redux";

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Shopping from '../../components/Shopping/Shopping';
import BuildControls from '../../components/Shopping/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Shopping/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export class ShopBuilder extends Component {

    state = {
        purchasing: false
    };

    componentDidMount() {
        if(!this.props.items || this.props.purchased){
            this.props.onFetchItems();
        }
    }

    updatePurchaseState (items) {
        const sum = Object.keys( items )
            .map( igKey => {
                return items[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    };

    purchaseHandler = () => {
        if (this.props.isAuthenticated){
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render () {
        const disabledInfo = {
            ...this.props.items
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let shopping = this.props.error ? <p>Items can't be loaded!</p> : <Spinner />;

        if (this.props.items){
            shopping = (
                <Aux>
                    <BuildControls
                        itemAdded={this.props.onItemAdded}
                        itemRemoved={this.props.onItemRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.items)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.totalPrice} />
                    <Shopping items={this.props.items} />
                </Aux>
            );
            orderSummary = <OrderSummary
                items={this.props.items}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {shopping}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.shopBuilder.items,
        totalPrice: state.shopBuilder.totalPrice,
        error: state.shopBuilder.error,
        isAuthenticated: state.authReducer.token != null,
        purchased: state.orderReducer.purchased
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onItemAdded: (itemName) => dispatch(actions.addItem(itemName)),
        onItemRemoved: (itemName) => dispatch(actions.removeItem(itemName)),
        onFetchItems: () => dispatch(actions.fetchItems()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ShopBuilder, axios));
