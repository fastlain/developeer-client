import React from 'react';
import styles from '../css_modules/ExternalSuccess.module.css';

import StyledLink from './StyledLink';

const ExternalSuccess = () => {
    return (
        <section className={styles.success}>
            <h3 className={styles.heading}>Review Successfully Submitted!</h3>
            <p className={styles.para}>Thanks for using DeveloPeer</p>
            <StyledLink to="/" className="roomyTopBot">LEARN MORE</StyledLink>
        </section>
    );
}

export default ExternalSuccess;