import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from "../../components/UI/Input/Input";
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
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
        },
        isSignup: true
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
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    };

    render() {
        const formElementsArr = [];
        for (let key in this.state.controls){
            formElementsArr.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArr.map(formElement => (
            <Input
                key={formElement.id}
                elementConfig={formElement.config.elementConfig}
                value ={formElement.config.value}
                changed={(ev) => this.inputChangedHandler(ev, formElement.id)}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
            />
        ));
        if (this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        return (
            <div className={classes.Auth}>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
                <form onSubmit={this.submitHandler}>
                    {form}
                    {errorMessage}
                    <Button btnType="Success">SUBMIT</Button>
                </form>

            </div>
        );
    }
}

const mapStateToProps = state => {
   return {
       loading: state.authReducer.loading,
       error: state.authReducer.error
   }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);