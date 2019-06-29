import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Breakfast from '../../components/Breakfast/Breakfast';
import BuildControls from '../../components/Breakfast/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Breakfast/OrderSummary/OrderSummary';

const ITEM_PRICES = {
    coffee: 4.5,
    tea: 2.0,
    sugar: 0.3,
    croissant: 3.5,
    yogurt: 3.0,
    salad: 4.5
};

class BreakfastBuilder extends Component {

    state = {
        items: {
            coffee: 0,
            tea: 0,
            sugar: 0,
            croissant: 0,
            yogurt: 0,
            salad: 0
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState (items) {
        const sum = Object.keys( items )
            .map( igKey => {
                return items[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    };

    addItemHandler = ( type ) => {
        const oldCount = this.state.items[type];
        const updatedCount = oldCount + 1;
        const updatedItems = {
            ...this.state.items
        };
        updatedItems[type] = updatedCount;
        const priceAddition = ITEM_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, items: updatedItems } );
        this.updatePurchaseState(updatedItems);
    };

    removeItemHandler = ( type ) => {
        const oldCount = this.state.items[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedItems = {
            ...this.state.items
        };
        updatedItems[type] = updatedCount;
        const priceDeduction = ITEM_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, items: updatedItems } );
        this.updatePurchaseState(updatedItems);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        alert('You continue!');
    };

    render () {
        const disabledInfo = {
            ...this.state.items
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {/*<OrderSummary*/}
                    {/*    items={this.state.items}*/}
                    {/*    price={this.state.totalPrice}*/}
                    {/*    purchaseCancelled={this.purchaseCancelHandler}*/}
                    {/*    purchaseContinued={this.purchaseContinueHandler} />*/}
                </Modal>

                <BuildControls
                    itemAdded={this.addItemHandler}
                    itemientRemoved={this.removeItemtHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
                <Breakfast items={this.state.items} />
            </Aux>
        );
    }
}

export default BreakfastBuilder;
