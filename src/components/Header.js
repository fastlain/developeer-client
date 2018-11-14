import React from 'react';
import styles from '../css_modules/Header.module.css';

import Button from './Button';

const Header = (props) => {
    const logOutBtn = props.isLoggedIn ?
        (<Button type="button" onClick={props.logOut}>LOG OUT</ Button>) :
        null;
    const username = props.username ?
        (<span className={styles.username}>{props.username}</span>) :
        null;

    return (
        <header role="banner" className={styles.topBar}>
            <div className={styles.wrapper}>
                <div className={styles.appTitle}>Developeer</div>
                <div>
                    {username}
                    {logOutBtn}
                </div>
            </div>
        </header>
    );
}

export default Header;