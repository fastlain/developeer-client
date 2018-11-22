import React from 'react';
import styles from '../css_modules/Credits.module.css';

import StyledLink from './StyledLink';

const Credits = ({ credits }) => (
    <section className={styles.creditsWrapper}>
        <h2 className={styles.heading}>Credits</h2>
        <p>You currently have <span className={styles.credits}>{credits}</span> credits.</p>
        <p className={styles.earnMore}>Earn more by providing peer feedback:</p>
        <StyledLink className="roomyTopBot" to="/main/givefeedback">GIVE FEEDBACK</StyledLink>
    </section >
);

export default Credits;