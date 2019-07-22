import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import classes from './DeliveryData.css';
import Button from "../../../components/UI/Button/Button";
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';


class DeliveryData extends Component {
    state = {
        orderForm : {
            name: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zipCode: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            country: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }

        },
        loading: false
    };

    checkValidity(val, rules){
        let isValid = false;
        if(rules.required){
            console.log(isValid);
            isValid = val.trim !=='';
            console.log(isValid);
        }
        return isValid;
    };

    placeOrder = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let identifier in this.state.orderForm){
            formData[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            items: this.props.items,
            price: this.props.price,
            orderDate: formData
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const changedForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...changedForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        console.log(updatedFormElement);
        changedForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: changedForm});
    };

    render (){
        const formElementsArr = [];
        for (let key in this.state.orderForm){
            formElementsArr.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.placeOrder}>
                {formElementsArr.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementConfig={formElement.config.elementConfig}
                        value ={formElement.config.value}
                        changed={(ev) => this.inputChangedHandler(ev, formElement.id)}
                    />
                ))}

                <Button btnType="Success">PLACE ORDER</Button>
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
