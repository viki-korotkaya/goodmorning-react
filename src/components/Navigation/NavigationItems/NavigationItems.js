import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/about" exact>About</NavigationItem>
        <NavigationItem link="/" exact>Shop Builder</NavigationItem>
        { props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
        { props.isAuthenticated ? (<NavigationItem link="/logout">Logout</NavigationItem>) : (<NavigationItem link="/auth">Authenticate</NavigationItem>) }
    </ul>
);

export default navigationItems;
