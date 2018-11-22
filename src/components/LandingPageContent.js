import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../css_modules/LandingPageContent.module.css';

import Features from './Features';
import StyledLink from './StyledLink';

const LandingPageContent = (props) => {
    if (props.isLoggedIn) {
        return <Redirect to="/main/dashboard" />;
    }

    return (
        <div>
            <div className={styles.linkWrapper}>
                <StyledLink to="/userform/login">LOG IN</StyledLink>
                <StyledLink to="/userform/create" className="accent">CREATE ACCOUNT</StyledLink>
            </div>
            <Features />
        </div>
    );
}

export default LandingPageContent;