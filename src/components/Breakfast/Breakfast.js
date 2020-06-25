import React from 'react';

import classes from './Breakfast.css';
import BreakfastItem from './BreakfastItem/BreakfastItem';

const breakfast = ( props ) => {
    let transformedItems = Object.keys( props.items )
        .filter(igKey => props.items[igKey] > 0)
        .map( igKey => {
            return <BreakfastItem key={igKey} type={igKey} qty={props.items[igKey]}/>;
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    let shopCartTitle = null;
    if (transformedItems.length === 0) {
        transformedItems = <p>Please start creating your order!</p>;
    } else {
        shopCartTitle = <p>In your Shopping Cart:</p>;
    }

    return (
        <div className={classes.Breakfast}>
            {shopCartTitle}
            {transformedItems}
        </div>
    );
};

export default breakfast;
