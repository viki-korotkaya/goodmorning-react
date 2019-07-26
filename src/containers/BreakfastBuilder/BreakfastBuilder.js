import React, { Component } from 'react';
import {connect} from "react-redux";

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Breakfast from '../../components/Breakfast/Breakfast';
import BuildControls from '../../components/Breakfast/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Breakfast/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Checkout from '../Checkout/Checkout';
import * as breakfastBuilderActions from '../../store/actions/index';

class BreakfastBuilder extends Component {

    state = {

        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://goodmorning-react.firebaseio.com/items.json')
            .then(response => {
                this.setState({items: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            });
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
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
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
        let breakfast = this.state.error ? <p>Items can't be loaded!></p> : <Spinner />;

        if (this.props.items){
            breakfast = (
                <Aux>
                    <BuildControls
                        itemAdded={this.props.onItemAdded}
                        itemRemoved={this.props.onItemRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.items)}
                        ordered={this.purchaseHandler}
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
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
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
        items: state.items,
        totalPrice: state.totalPrice
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onItemAdded: (itemName) => dispatch(breakfastBuilderActions.addItem(itemName)),
        onItemRemoved: (itemName) => dispatch(breakfastBuilderActions.removeItem(itemName))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BreakfastBuilder, axios));
