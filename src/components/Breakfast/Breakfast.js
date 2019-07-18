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
    if (transformedItems.length === 0) {
        transformedItems = <p>Please start creating your breakfast!</p>;
    }
    return (
        <div className={classes.Breakfast}>
            {transformedItems}
        </div>
    );
};

export default breakfast;