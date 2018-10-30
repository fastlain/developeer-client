import React from 'react';
import styles from '../css_modules/Button.module.css';

const Button = (props) => {

    const { btnStyle, ...other } = props;

    // extract classNames from corresponding btnStyle prop
    let classes = styles.default;
    if (btnStyle) {
        const styleList = props.btnStyle.split(' ');
        for (let style of styleList) {
            classes += ` ${styles[style]}`;
        }
    }

    return (
        <button className={classes} {...other}>
            {props.children}
        </button>
    );
}

export default Button;