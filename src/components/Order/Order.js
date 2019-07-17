import React from 'react';

import classes from './Order.css';

const order = (props) => (
    <div className={classes.Order}>
        <p>Items of breakfast: Tea (1)</p>
        <p>Price: 10 USD </p>
    </div>
);

export default order;