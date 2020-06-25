import React from 'react';

import classes from './Slide.css';

const slide = ( props ) => {
    const cssClasses  = props.show ? 'fadeIn' : 'fadeOut';

    return(
        <img className={cssClasses} src={props.src} alt="slider"/>
        )
}

export default slide;
