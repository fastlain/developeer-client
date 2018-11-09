import React from 'react';

import styles from '../css_modules/Error.module.css';

const Error = ({ message, errStyle }) => {
    const style = errStyle ? styles[errStyle] : styles.error;
    return (
        <p className={style}>{message}</p>
    );
}

export default Error;