import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Espresso', type: 'espresso', cost: '2.5$' },
    { label: 'Americano', type: 'americano', cost: '2.0$' },
    { label: 'Cappuccino', type: 'cappuccino', cost: '3.5$' },
    { label: 'Latte', type: 'latte', cost: '3.2$' },
    { label: 'Big Joe', type: 'bigjoe', cost: '5.0$' },
    { label: 'Hot chocolate', type: 'hotchoc', cost: '4.5$' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <div className={classes.BuildControlsButtons}>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    cost={ctrl.cost}
                    added={() => props.itemAdded(ctrl.type)}
                    removed={() => props.itemRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            ))}
        </div>

        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        <p style={{fontSize: "1.5rem"}}>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    </div>
);

export default buildControls;
