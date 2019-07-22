import React from 'react';

import classes from './Input.css';

const Input = (props) => {

    return (
        <div className={classes.InputClass}>
            <label>{props.label}</label>
            <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
        </div>
    )
};

export default Input;