import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../css_modules/LandingPageContent.module.css';

import Features from './Features';
import StyledLink from './StyledLink';

class LandingPageContent extends Component {

    componentDidMount = () => {
        window.scrollTo(0, 0);
    }

    render() {
        if (this.props.isLoggedIn) {
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
}

export default LandingPageContent;