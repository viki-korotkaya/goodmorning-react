import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from "../../components/UI/Input/Input";
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {updateObject, checkValidity} from "../../shared/utility";
import * as errorMap from '../../shared/errorMap';

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
        isSignup: true,
        isValid: false
    };

    componentDidMount() {
        if (!this.props.buildingBreakfast && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (ev, controlItem) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlItem]: updateObject(this.state.controls[controlItem], {
                value: ev.target.value,
                valid: checkValidity(ev.target.value, this.state.controls[controlItem].validation),
                touched: true
            })
        });
        let formIsValid = true;
        for (let identifier in updatedControls) {
            formIsValid = updatedControls[identifier].valid && formIsValid;
        }

        this.setState({controls: updatedControls, formIsValid: formIsValid});
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
            let message = errorMap[this.props.error.message] ? errorMap[this.props.error.message] : this.props.error.message ;
            errorMessage = (
                <p className={classes.AuthError}>{message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Swith to {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
                <form onSubmit={this.submitHandler}>
                    {form}
                    {errorMessage}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>{this.state.isSignup ? 'SIGNUP' : 'SIGNIN' }</Button>
                </form>

            </div>
        );
    }
}

const mapStateToProps = state => {
   return {
       loading: state.authReducer.loading,
       error: state.authReducer.error,
       isAuthenticated: state.authReducer.token != null,
       buildingBreakfast: state.shopBuilder.building,
       authRedirectPath: state.authReducer.authRedirectPath
   };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
