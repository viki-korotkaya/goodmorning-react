import React from 'react';

import breakfastLogo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={breakfastLogo} alt="GoodMorning" />
    </div>
);

export default logo;