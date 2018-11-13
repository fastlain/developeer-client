import React from 'react';
import classNames from 'classnames/bind';
import styles from '../css_modules/Button.module.css';
const cx = classNames.bind(styles);

const Button = ({ btnStyle = '', children, ...otherProps }) => {

    return (
        <button className={cx("default", btnStyle.split(' '))} {...otherProps}>
            {children}
        </button>
    );
}

export default Button;