import React from 'react';
import styles from '../css_modules/Button.module.css';

const Button = (props) => {

    // extract classNames from corresponding btnStyle prop
    let classes = styles.default;
    if (props.btnStyle) {
        const btnStyles = props.btnStyle.split(' ');
        for (let style of btnStyles) {
            classes += ` ${styles[style]}`;
        }
    }

    return (
        <button className={classes} type={props.type} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default Button;