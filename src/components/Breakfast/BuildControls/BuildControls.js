import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Coffee', type: 'coffee' },
    { label: 'Tea', type: 'tea' },
    { label: 'Sugar', type: 'sugar' },
    { label: 'Croissant', type: 'croissant' },
    { label: 'Yogurt', type: 'yogurt' },
    { label: 'Salad', type: 'salad' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <div className={classes.BuildControlsButtons}>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.itemAdded(ctrl.type)}
                    removed={() => props.itemRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            ))}
        </div>

        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    </div>
);

export default buildControls;