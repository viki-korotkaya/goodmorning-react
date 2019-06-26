import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BreakfastItem.css';
import coffee from "../../../assets/images/coffee.png";


class BreakfastItem extends Component {
    render () {
        let item = null;

        switch ( this.props.type ) {
            case ( 'coffee' ):
                item = <div className={classes.Coffee}><img src={coffee} alt="Cup of coffee" /></div>;
                break;
            case ( 'tea' ):
                item = <div className={classes.Tea}></div>;
                break;
            case ( 'sugar' ):
                item = <div className={classes.Sugar}></div>;
                break;
            case ( 'croissant' ):
                item = <div className={classes.Croissant}></div>;
                break;
            case ( 'yogurt' ):
                item = <div className={classes.Yogurt}></div>;
                break;
            case ( 'salad' ):
                item = <div className={classes.Salad}></div>;
                break;
            default:
                item = null;
        }

        return item;
    }
}

BreakfastItem.propTypes = {
    type: PropTypes.string.isRequired
};

export default BreakfastItem;