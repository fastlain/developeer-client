import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Features from './Features';

import styles from '../css_modules/LandingPageContent.module.css';

const LandingPageContent = (props) => {
    if (props.isLoggedIn) {
        return <Redirect to="/main/dashboard" />;
    }

    return (
        <div>
            <div className={styles.linkWrapper}>
                <Link to="/userform/login" className="Link btnStyle">LOG IN</Link>
                <Link to="/userform/create" className="Link btnStyle">CREATE ACCOUNT</Link>
            </div>
            <Features />
        </div>
    );
}

export default LandingPageContent;