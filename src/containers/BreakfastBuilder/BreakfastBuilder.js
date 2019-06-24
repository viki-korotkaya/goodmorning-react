import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BreakfastBuilder from './containers/BreakfastBuilder/BreakfastBuilder';

class App extends Component {
    render () {
        return (
            <div>
                <Layout>
                    <BreakfastBuilder />
                </Layout>
            </div>
        );
    }
}

export default App;
