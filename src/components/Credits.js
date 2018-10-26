import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css_modules/Credits.module.css';

import Button from './Button';

const Credits = ({ credits }) => (
    <section className={styles.creditsWrapper}>
        <h2>Credits</h2>
        <p>You currently have <span className={styles.credits}>{credits}</span> credits.</p>
        <p>Earn more by providing peer feedback:</p>
        <Link to="/main/givefeedback" className="Link btnStyle roomy">
            GIVE FEEDBACK
        </Link>
    </section>
);

export default Credits;