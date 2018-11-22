import React from 'react';
import styles from '../css_modules/DashboardBtn.module.css';

import StyledLink from './StyledLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardBtn = (props) => {
    return (
        <StyledLink to="/main/dashboard" className="roomyTopBot dashboard" {...props}>
            <FontAwesomeIcon title="To Dashboard" icon="arrow-left" size="lg" />
            <span className={styles.btnText}>DASHBOARD</span>
        </StyledLink>
    );
}

export default DashboardBtn;