import React from 'react';
import styles from '../css_modules/HeroBanner.module.css';

const HeroBanner = () => {
    return (
        <header className={styles.heroBanner} role="banner">
            <h1>Developeer</h1>
            <p>This is the application's tagline</p>
        </header>
    );
}

export default HeroBanner;