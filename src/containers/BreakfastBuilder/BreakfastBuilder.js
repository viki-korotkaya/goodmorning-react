import React, { Component } from 'react';
import {connect} from "react-redux";

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Breakfast from '../../components/Breakfast/Breakfast';
import BuildControls from '../../components/Breakfast/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Breakfast/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Checkout from '../Checkout/Checkout';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

class BreakfastBuilder extends Component {

    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onFetchItems();
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
        let breakfast = this.props.error ? <p>Items can't be loaded!</p> : <Spinner />;

        if (this.props.items){
            breakfast = (
                <Aux>
                    <BuildControls
                        itemAdded={this.props.onItemAdded}
                        itemRemoved={this.props.onItemRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.items)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.totalPrice} />
                    <Breakfast items={this.props.items} />
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
                {breakfast}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.breakfastBuilder.items,
        totalPrice: state.breakfastBuilder.totalPrice,
        error: state.breakfastBuilder.error,
        isAuthenticated: state.authReducer.token != null
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BreakfastBuilder, axios));
