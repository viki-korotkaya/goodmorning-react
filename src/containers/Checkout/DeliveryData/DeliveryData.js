import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './DeliveryData.css';
import Button from "../../../components/UI/Button/Button";
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

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
                    maxLength: 6
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
                    required: true
                },
                valid: false,
                touched: false
            }

        },
        formIsValid: false
    };

    checkValidity(val, rules){
        let isValid = false;

        let requiredRule = (() =>{
            if(rules.required){
                return  val.trim() !=='';
            } else {
                return true;
            }
        })();

        let minLengthRule = (() =>{
            if(rules.minLength){
                return val.length >= rules.minLength;
            } else {
                return true;
            }
        })();

        let maxLengthRule = (() =>{
            if(rules.maxLength){
                return val.length <= rules.maxLength;
            } else {
                return true;
            }
        })();

        isValid = requiredRule && minLengthRule && maxLengthRule;
        return isValid;
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
            orderDate: formData
        };

        this.props.onOrderBreakfast(order);

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
        updatedFormElement.touched = true;

        changedForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let identifier in changedForm) {
            formIsValid = changedForm[identifier].valid && formIsValid;
        }

        this.setState({orderForm: changedForm, formIsValid: formIsValid});
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
        items: state.breakfastBuilder.items,
        price: state.breakfastBuilder.totalPrice,
        loading: state.orderReducer.loading,
        purchased: state.orderReducer.purhased
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBreakfast: (orderData) => dispatch(actions.purchaseBreakfast(orderData))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(DeliveryData, axios));
