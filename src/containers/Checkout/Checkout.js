import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import DeliveryData from './DeliveryData/DeliveryData';
import axios from '../../axios-orders';
import Button from "../../components/UI/Button/Button";

class Checkout extends Component {
    state = {
        items: {
            coffee: 1,
            tea: 2,
            sugar: 1,
            croissant: 0,
            yogurt: 1,
            salad: 1
        },
        price: 0
    }

    // componentWillMount () {
    //     const query = new URLSearchParams( this.props.location.search );
    //     const items = {};
    //     let price = 0;
    //     for ( let param of query.entries() ) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             items[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState( { items: items, totalPrice: price } );
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        // this.setState( { loading: true } );
        const order = {
            items: this.state.items,
            price: this.state.price,
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
                this.setState( {
                    // loading: false,
                    purchasing: false } );
            } )
            .catch( error => {
                this.setState( {
                    // loading: false,
                    purchasing: false } );
            } );
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    items={this.state.items}
                    />
                <DeliveryData
                    canceled={this.checkoutCancelledHandler}
                    placedorder={this.checkoutContinuedHandler}/>

                {/*<Route*/}
                {/*    path={this.props.match.path + '/contact-data'}*/}
                {/*    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />*/}
            </div>
        );
    }
}

export default Checkout;