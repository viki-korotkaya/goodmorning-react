import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from "../../components/UI/Input/Input";
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
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

        let emailRule = (() =>{
            if(rules.isEmail){
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                return pattern.test(val);
            } else {
                return true;
            }
        })();

        let numericRule = (() =>{
            if(rules.isNumeric){
                const pattern = /^\d+$/;
                return pattern.test(val);
            } else {
                return true;
            }
        })();

        isValid = requiredRule && minLengthRule && maxLengthRule && emailRule && numericRule;
        return isValid;
    };

    inputChangedHandler = (ev, controlItem) => {
        const updatedControls = {
            ...this.state.controls,
            [controlItem]: {
                ...this.state.controls[controlItem],
                value: ev.target.value,
                valid: this.checkValidity(ev.target.value, this.state.controls[controlItem].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    };

    render() {
        const formElementsArr = [];
        for (let key in this.state.controls){
            formElementsArr.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArr.map(formElement => (
            <Input
                key={formElement.id}
                elementConfig={formElement.config.elementConfig}
                value ={formElement.config.value}
                changed={(ev) => this.inputChangedHandler(ev, formElement.id)}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
            />
        ))
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    };
};

export default connect(null, mapDispatchToProps)(Auth);