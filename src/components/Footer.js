import React from 'react';
import styles from '../css_modules/Footer.module.css';

const Footer = () => {
    return (
        <footer role="contentinfo" className={styles.footer}>
            <p className={styles.para}>Created by Michael Allain</p>
        </footer>
    );
}

export default Footer;