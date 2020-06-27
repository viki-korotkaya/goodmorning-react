import React from 'react';
import Fade from "react-reveal/Fade";
import classes from './Menu.css';
import espresso from "../../assets/images/espresso.jpg";
import americano from "../../assets/images/americano.jpg";
import cappuccino from "../../assets/images/cappuccino.jpg";
import latte from "../../assets/images/latte.jpg";
import bigjoe from "../../assets/images/bigjoe.jpg";
import hotchock from "../../assets/images/hotchock.jpg";

const menu = (props) => (
    <div className={classes.Menu}>
        <section className={classes.section}>
            <Fade left duration={3000}>
                <div className={classes.photoMenu}><img src={espresso} alt="coffee"/></div>
                <div className={classes.descriptionMenu}>
                    <h3>Espresso</h3>
                    Serving Size 3 fl oz<br/>
                    Roasted weekly, our espresso is a medium dark/dark roast with Dark Chocolate,
                    Mild Orange, and a hint of fruit in the finish leaving our guest with a sweet
                    and syrupy espresso.
                </div>
            </Fade>
        </section>
        <section className={classes.section}>
            <Fade right duration={3000}>
                <div className={classes.photoMenu}><img src={americano} alt="coffee"/></div>
                <div className={classes.descriptionMenu}>
                    <h3>Americano</h3>
                    Serving Size 8 fl oz<br/>
                    This drink consists of a double-shot of espresso combined with up to
                    five ounces of hot water in a two-demitasse cup. It is important to note,
                    that an Americano is created by adding the water to an already extracted espresso,
                    not by extracting extra water through a single espresso puck.
                </div>
            </Fade>
        </section>
        <section className={classes.section}>
            <Fade left duration={3000}>
                <div className={classes.photoMenu}><img src={cappuccino} alt="coffee"/></div>
                <div className={classes.descriptionMenu}>
                    <h3>Cappuccino</h3>
                    Serving Size 16 fl oz<br/>
                    This Italian coffee drink is traditionally prepared with double espresso, hot
                    milk, and steamed milk foam on top. Cream may be used instead of milk and is
                    topped with cinnamon.
                </div>
            </Fade>
        </section>
        <section className={classes.section}>
            <Fade right duration={3000}>
                <div className={classes.photoMenu}><img src={latte} alt="coffee"/></div>
                <div className={classes.descriptionMenu}>
                    <h3>Latte</h3>
                    Serving Size 16 fl oz<br/>
                    This drink made with six ounces of steamed milk and one shot of espresso.
                    The name “latte” is derived from the Italian words caffè latte, which means “milk
                    coffee.” In fact, if you walk into any restaurant or café in Italy and ask for
                    a latte, you'll be given a glass of milk.
                </div>
            </Fade>
        </section>
        <section className={classes.section}>
            <Fade left duration={3000}>
                <div className={classes.photoMenu}><img src={bigjoe} alt="coffee"/></div>
                <div className={classes.descriptionMenu}>
                    <h3>Big Joe</h3>
                    Serving Size 20 fl oz<br/>
                    This drink consists of a espresso doppio, milk, sugar syrup, peanut butter,
                    marshmallows, chocolate balls, topping, siphon cream, ice cream, waffle cone,
                    dark chocolate
                </div>
            </Fade>

        </section>
        <section className={classes.section}>
            <Fade right duration={3000}>
                <div className={classes.photoMenu}><img src={hotchock} alt="coffee"/></div>
                <div className={classes.descriptionMenu}>
                    <h3>Hot chocolate</h3>
                    Serving Size 8 fl oz<br/>
                    Hot chocolate, also known as drinking chocolate, cocoa, and as chocolate tea in
                    Nigeria, is a heated drink consisting of shaved chocolate, melted chocolate,
                    heated milk or water, and usually a sweetener.
                    Daniil likes it.
                </div>
            </Fade>
        </section>

    </div>
);

export default menu;
