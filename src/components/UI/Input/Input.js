import React from 'react';

import classes from './Input.css';

const Input = (props) => {
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    return (
        <div className={classes.InputClass}>
            <label>{props.label}</label>
            <input
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
            />
        </div>
    )
};

export default Input;