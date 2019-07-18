import React from 'react';

import classes from './Order.css';

const order = (props) => {
    console.log(props.items);
    const itemsOfOrder = [];
    for (let item in props.items){
        let b = item;
        itemsOfOrder.push({
            name: item,
            quantity: props.items[item]
        });
    }
    let outputItems = itemsOfOrder
        .filter(item => item.quantity > 0)
        .map(item => {
            return <p key={item.name}>{item.name}: {item.quantity}</p>
        });

        return (
            <div className={classes.Order}>
                <h4>Your previous breakfast</h4>
                {outputItems}
                <p>Price: <strong>{props.price} USD </strong></p>
            </div>
        )
};

export default order;