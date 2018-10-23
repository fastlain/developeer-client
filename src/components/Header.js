import React from 'react';
import styles from '../css_modules/Header.module.css';

import Button from './Button';

const Header = () => {
    return (
        <div className={styles.topBar}>
            <div className={styles.appTitle}>Developeer</div>
            <div>
                <span className={styles.username}>username</span>
                <Button type="button">
                    LOG OUT
                </ Button>
            </div>
        </div>
    );
}

export default Header;