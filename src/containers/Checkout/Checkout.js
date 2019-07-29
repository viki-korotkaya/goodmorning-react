import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import DeliveryData from './DeliveryData/DeliveryData';
import axios from '../../axios-orders';
import Button from "../../components/UI/Button/Button";
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        // this.setState( { loading: true } );
        const order = {
            items: this.props.items,
            price: this.props.price,
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
        let summary = (
            <div>

                <CheckoutSummary items={this.props.items} />
                <DeliveryData
                    canceled={this.checkoutCancelledHandler}
                    placedorder={this.checkoutContinuedHandler} />
            </div>

        );

        if (!this.props.items || this.props.purchased){
            summary = <Redirect to="/" />
        }



        return (
            <div>
                {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.breakfastBuilder.items,
        purchased: state.orderReducer.purchased
    };
};


export default connect(mapStateToProps)(Checkout);