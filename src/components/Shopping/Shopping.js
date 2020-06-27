import React from 'react';

import classes from './Shopping.css';
import ShopItem from './ShopItem/ShopItem';

const shopping = ( props ) => {
    let transformedItems = Object.keys( props.items )
        .filter(igKey => props.items[igKey] > 0)
        .map( igKey => {
            return <ShopItem key={igKey} type={igKey} qty={props.items[igKey]}/>;
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
        <div className={classes.Shopping}>
            {shopCartTitle}
            {transformedItems}
        </div>
    );
};

export default shopping;
