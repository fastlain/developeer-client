import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../css_modules/Button.module.css';
const cx = classNames.bind(styles);


const StyledLink = ({ className = '', ...props }) => {

    const classes = cx("link", className.split(' '));
    return (
        <Link className={classes} {...props} />
    );
}

export default StyledLink;
