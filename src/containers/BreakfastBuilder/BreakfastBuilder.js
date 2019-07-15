import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Breakfast from '../../components/Breakfast/Breakfast';
import BuildControls from '../../components/Breakfast/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Breakfast/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
            coffee: null,
            tea: null,
            sugar: null,
            croissant: null,
            yogurt: null,
            salad: null
        },
        totalPrice: 0,
        purchasable: false,
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

    removeItemtHandler = ( type ) => {
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
        console.log(this.state);
        this.setState( { loading: true } );
        const order = {
            items: this.state.items,
            price: this.state.totalPrice,
            customer: {
                name: 'Vi Ka',
                address: {
                    street: 'Blalala 12',
                    zipCode: '01234',
                    country: 'US'
                },
                email: 'test@test.com'
            }
        };
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false, purchasing: false } );
            } )
            .catch( error => {
                this.setState( { loading: false, purchasing: false } );
            } );
    };

    render () {
        const disabledInfo = {
            ...this.state.items
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let breakfast = this.state.error ? <p>Items can't be loaded!></p> : <Spinner />;

        if (this.state.items){
            breakfast = (
                <Aux>
                    <BuildControls
                        itemAdded={this.addItemHandler}
                        itemRemoved={this.removeItemtHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                    <Breakfast items={this.state.items} />
                </Aux>
            );
            orderSummary = <OrderSummary
                items={this.state.items}
                price={this.state.totalPrice}
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

export default withErrorHandler(BreakfastBuilder, axios);
