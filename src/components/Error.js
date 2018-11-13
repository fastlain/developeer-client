import React from 'react';
import classNames from 'classnames/bind';

import styles from '../css_modules/Error.module.css';
const cx = classNames.bind(styles);

const Error = ({ message, errStyle }) => {

    // only render if a non-null message is provided
    if (message) {
        return (<p className={cx("error", errStyle)}>{message}</p>);
    } else {
        return null;
    }
}

export default Error;