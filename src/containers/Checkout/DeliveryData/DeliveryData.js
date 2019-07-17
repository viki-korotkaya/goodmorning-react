import React, {Component} from 'react';

import classes from './DeliveryData.css';
import Button from "../../../components/UI/Button/Button";


class DeliveryData extends Component {
    render (){
        return (
            <div className={classes.DeliveryData}>
                <p>Enter your Delivery Data</p>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Enter your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Enter your Email" />
                    <input className={classes.Input} type="text" name="address" placeholder="Enter your Address"  />
                    <input className={classes.Input} type="text" name="postalcode" placeholder="Enter your Postal Code" />
                    <Button
                        btnType="Success"
                        clicked={this.props.placedorder}>PLACE ORDER</Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={this.props.canceled}>CANCEL</Button>


            </div>
        );
    }
};

export default DeliveryData;
