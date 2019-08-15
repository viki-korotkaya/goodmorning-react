import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from "../../components/UI/Input/Input";
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {updateObject, checkValidity} from "../../shared/utility";

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

        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
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
       error: state.authReducer.error,
       isAuthenticated: state.authReducer.token != null,
       buildingBreakfast: state.breakfastBuilder.building,
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