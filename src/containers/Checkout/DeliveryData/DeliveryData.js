import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import classes from './DeliveryData.css';
import Button from "../../../components/UI/Button/Button";
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';


class DeliveryData extends Component {
    state = {
        loading: false
    };

    placeorder = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const order = {
            items: this.props.items,
            price: this.props.price,
            customer: {
                name: 'Vi Ka',
                address: {
                    street: 'Tratata',
                    zipCode: '01234',
                    country: 'US'
                },
                email: 'test@test.com'
            }
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    render (){
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Enter your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Enter your Email" />
                <input className={classes.Input} type="text" name="address" placeholder="Enter your Address"  />
                <input className={classes.Input} type="text" name="postalcode" placeholder="Enter your Postal Code" />
                <Button
                    btnType="Success"
                    clicked={this.placeorder}>
                    PLACE ORDER
                </Button>
                    </form>
        );
        if (this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.DeliveryData}>
                <p>Enter your Delivery Data</p>
                {form}
                <Button
                    btnType="Danger"
                    clicked={this.props.canceled}>CANCEL</Button>


            </div>
        );
    }
};

export default withRouter(DeliveryData);
