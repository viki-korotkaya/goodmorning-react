import React, {Component} from 'react';

import classes from './Slider.css';

class Slider extends Component {

    state = {
        index: 0,
        imgDuration: 5000
    };

    componentDidMount(){
        setTimeout(function () {
            this.slideShow();
        }.bind(this), this.state.imgDuration);

    }

    slideShow = () => {
        if (this.state.index === this.props.imgArr.length -1){
            this.setState({index: 0});
        } else {
            let currentIndex = this.state.index;

            this.setState({index: currentIndex + 1});
        }

        setTimeout(function () {
            this.slideShow();
        }.bind(this), this.state.imgDuration);
    };


    render(){

        return (

                <div id="slidersShow"  className={classes.picture}>
                    <img className={classes.image} src={this.props.imgArr[this.state.index]} />
                </div>

        )
    }
}

export default Slider;
