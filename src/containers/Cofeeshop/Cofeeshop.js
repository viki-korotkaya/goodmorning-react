import React, {Component} from 'react';

import {connect} from 'react-redux';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import coffeeshop1 from '../../assets/images/coffeeshop1.jpeg';
import coffeeshop2 from '../../assets/images/coffeeshop2.jpg';
import coffeeshop3 from '../../assets/images/coffeeshop3.jpg';
import coffeeshop4 from '../../assets/images/coffeeshop4.jpg';
import Slider from '../../components/Slider/Slider';
import classes from './Cofeeshop.css';
import Menu from '../../components/Menu/Menu';

class Cofeeshop extends Component {

        render(){
             const imgArr = [
                 coffeeshop1,
                 coffeeshop2,
                 coffeeshop3,
                 coffeeshop4
             ];
             return (
                        <div className={classes.Cofeeshop}>
                                <div className={classes.header}>
                                    <h2>Coffee <span className={classes.GoodMorning}>Good morning</span> Shop</h2>
                                </div>
                                <Slider imgArr={imgArr}  />
                                <Menu  />

                        </div>
                )



        }
}

export default Cofeeshop;
