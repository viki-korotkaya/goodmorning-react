import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from './hoc/Layout/Layout';
import BreakfastBuilder from './containers/BreakfastBuilder/BreakfastBuilder';
import Logout from "./containers/Auth/Logout/Logout";
import Cofeeshop from "./containers/Cofeeshop/Cofeeshop";
import * as actions from './store/actions/index';

const asyncCheckout= asyncComponent(() => {
    return import('./containers/Checkout/Checkout')
});

const asyncOrders= asyncComponent(() => {
    return import('./containers/Orders/Orders')
});

const asyncAuth= asyncComponent(() => {
    return import('./containers/Auth/Auth')
});

class App extends Component{
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render () {
        let routes = (
            <Switch>
                <Route path="/about" component={Cofeeshop}/>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" exact component={BreakfastBuilder}/>
                <Redirect to="/" />
            </Switch>
        );
        if (this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path="/auth" exact component={asyncAuth}/>
                    <Route path="/orders" component={asyncOrders}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/checkout" component={asyncCheckout}/>
                    <Route path="/" exact component={BreakfastBuilder}/>
                    <Route path="/about" component={Cofeeshop}/>
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
