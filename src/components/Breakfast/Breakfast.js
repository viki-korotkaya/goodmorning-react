import React from 'react';

import classes from './Breakfast.css';
import BreakfastItem from './BreakfastItem/BreakfastItem';

const breakfast = ( props ) => {
    let transformedItems = Object.keys( props.items )
        .map( igKey => {
            return [...Array( props.items[igKey] )].map( ( _, i ) => {
                return <BreakfastItem key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedItems.length === 0) {
        transformedItems = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Breakfast}>
            {transformedItems}
        </div>
    );
};

export default breakfast;