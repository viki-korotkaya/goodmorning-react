import React from 'react';

import Layout from './hoc/Layout/Layout';
import BreakfastBuilder from './containers/BreakfastBuilder/BreakfastBuilder';

function App() {
  return (
    <div>
      <Layout>
        <BreakfastBuilder />
      </Layout>
    </div>
  );
}

export default App;
