import React from 'react';

import Breakfast from '../../Breakfast/Breakfast';
import classes from './CheckoutSummary.css';
import Button from "../../UI/Button/Button";

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <div style={{width: '100%', margin: 'auto'}}>
                <Breakfast items={props.items}/>
            </div>
         </div>
    );
}

export default checkoutSummary;
