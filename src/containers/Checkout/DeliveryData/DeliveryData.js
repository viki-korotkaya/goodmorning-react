import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './DeliveryData.css';
import Button from "../../../components/UI/Button/Button";
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from "../../../shared/utility";

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
                valid: false,
                touched: false
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
                valid: false,
                touched: false
            },
            zipCode: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6,
                    isNumeric: true
                },
                valid: false,
                touched: false
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
                valid: false,
                touched: false
            },
            email: {
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }

        },
        formIsValid: false
    };

    placeOrder = ( event ) => {
        event.preventDefault();

        const formData = {};
        for (let identifier in this.state.orderForm){
            formData[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            items: this.props.items,
            price: this.props.price,
            orderDate: formData,
            userId: this.props.userId
        };

        this.props.onOrderBreakfast(order, this.props.token);

    };

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid = true;
        for (let identifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[identifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                    />
                ))}

                <Button btnType="Success" disabled={!this.state.formIsValid}>PLACE ORDER</Button>
            </form>
        );
        if (this.props.loading){
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
}

const mapStateToProps = state => {
    return {
        items: state.shopBuilder.items,
        price: state.shopBuilder.totalPrice,
        loading: state.orderReducer.loading,
        purchased: state.orderReducer.purhased,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBreakfast: (orderData, token) => dispatch(actions.purchase(orderData, token))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(DeliveryData, axios));
