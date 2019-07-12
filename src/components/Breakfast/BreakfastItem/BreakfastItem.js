import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BreakfastItem.css';
import coffee from "../../../assets/images/coffee.png";
import tea from "../../../assets/images/tea.png";
import sugar from "../../../assets/images/sugar.jpg";
import croissant from "../../../assets/images/croissant.jpeg";
import yogurt from "../../../assets/images/yogurt.jpg";
import salad from "../../../assets/images/salad.png";




class BreakfastItem extends Component {
    render () {
        let item = null;

        switch ( this.props.type ) {
            case ( 'coffee' ):
                item = <div className={classes.Item}><img src={coffee} alt="Cup of coffee" /><p>Qty: {this.props.qty}</p></div>;
                break;
            case ( 'tea' ):
                item = <div className={classes.Item}><img src={tea} alt="Cup of tea" /><p>Qty: {this.props.qty}</p></div>;
                break;
            case ( 'sugar' ):
                item = <div className={classes.Item}><img src={sugar} alt="Sugar" /><p>Qty: {this.props.qty}</p></div>;
                break;
            case ( 'croissant' ):
                item = <div className={classes.Item}><img src={croissant} alt="Croissant" /><p>Qty: {this.props.qty}</p></div>;
                break;
            case ( 'yogurt' ):
                item = <div className={classes.Item}><img src={yogurt} alt="Yogurt" /><p>Qty: {this.props.qty}</p></div>;
                break;
            case ( 'salad' ):
                item = <div className={classes.Item}><img src={salad} alt="Salad" /><p>Qty: {this.props.qty}</p></div>;
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