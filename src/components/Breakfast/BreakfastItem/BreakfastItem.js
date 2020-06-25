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
            case ( 'espresso' ):
                item = <div className={classes.Item}><p>Espresso, 3 fl oz - <span className={classes.qty}>qty: {this.props.qty}</span></p></div>;
                break;
            case ( 'americano' ):
                item = <div className={classes.Item}><p>Americano, 8 fl oz - <span className={classes.qty}>qty: {this.props.qty}</span></p></div>;
                break;
            case ( 'cappuccino' ):
                item = <div className={classes.Item}><p>Cappuccino, 16 fl oz - <span className={classes.qty}>qty: {this.props.qty}</span></p></div>;
                break;
            case ( 'latte' ):
                item = <div className={classes.Item}><p>Latte, 16 fl oz - <span className={classes.qty}>qty: {this.props.qty}</span></p></div>;
                break;
            case ( 'bigjoe' ):
                item = <div className={classes.Item}><p>Big Joe, 20 fl oz - <span className={classes.qty}>qty: {this.props.qty}</span></p></div>;
                break;
            case ( 'hotchoc' ):
                item = <div className={classes.Item}><p>Hot chocolate, 8 fl oz - <span className={classes.qty}>qty: {this.props.qty}</span></p></div>;
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
