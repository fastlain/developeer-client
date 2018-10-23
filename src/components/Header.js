import React from 'react';
import styles from '../css_modules/Header.module.css';

const Header = () => {
    return (
        <div>
            <div className={styles.topBar}>
                <div className={styles.appTitle}>Developeer</div>
                <div>
                    <span className={styles.username}>username</span>
                    <button type="button">Log Out</button>
                </div>
            </div>
            <h1 className={styles.pageTitle}>Dashboard</h1>
        </div>
    );
}

export default Header;