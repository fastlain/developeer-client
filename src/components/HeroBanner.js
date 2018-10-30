import React from 'react';
import styles from '../css_modules/HeroBanner.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HeroBanner = () => {
    return (
        <div className={styles.heroBanner}>
            <h1>Developeer</h1>
            <p>Give Feedback <FontAwesomeIcon icon="arrows-alt-h" size="lg" style={{ verticalAlign: "-0.4rem" }} /> Receive Feedback</p>
        </div>
    );
}

export default HeroBanner;