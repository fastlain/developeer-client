import React from 'react';
import styles from '../css_modules/Header.module.css';
import { Link } from 'react-router-dom';

import Button from './Button';

const Header = (props) => {
    const logOutBtn = props.isLoggedIn ?
        (<Button type="button" btnStyle="secondary shrink" onClick={props.logOut}>LOG OUT</ Button>) :
        null;
    const username = props.username ?
        (<span className={styles.username}>{props.username}</span>) :
        null;

    return (
        <header className={styles.topBar}>
            <div className={styles.wrapper}>
                <h1 className={styles.appTitle}>
                    <Link to='/' className={styles.appTitle}>
                        <span className={styles.develo}>Develo</span>
                        <span className={styles.peer}>Peer</span>
                    </Link>
                </h1>
                <div className={styles.logName}>
                    {username}
                    {logOutBtn}
                </div>
            </div>
        </header>
    );
}

export default Header;