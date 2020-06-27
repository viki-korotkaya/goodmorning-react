import React from 'react';

import Shopping from '../../Shopping/Shopping';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <div style={{width: '100%', margin: 'auto'}}>
                <Shopping items={props.items}/>
            </div>
         </div>
    );
}

export default checkoutSummary;
