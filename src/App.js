import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BreakfastBuilder from './containers/BreakfastBuilder/BreakfastBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index';

class App extends Component{

    render () {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/orders" component={Orders}/>
                        <Route path="/auth" component={Auth}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/" exact component={BreakfastBuilder}/>
                    </Switch>
                    {/*<BreakfastBuilder />*/}
                    {/*<Checkout />*/}
                </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default connect(null, mapDispatchToProps)(App);
