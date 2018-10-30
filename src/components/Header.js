import React from 'react';
import styles from '../css_modules/Header.module.css';

import Button from './Button';

const Header = (props) => {
    return (
        <header role="banner" className={styles.topBar}>
            <div className={styles.appTitle}>Developeer</div>
            <div>
                <span className={styles.username}>{props.username}</span>
                <Button type="button" onClick={props.logOut}>
                    LOG OUT
                </ Button>
            </div>
        </header>
    );
}

export default Header;