import React from 'react';
import styles from '../css_modules/HeroBanner.module.css';

const HeroBanner = () => {
    return (
        <div className={styles.heroBanner}>
            <h1>Developeer</h1>
            <p>This is the application's tagline</p>
        </div>
    );
}

export default HeroBanner;