import React from 'react';
import styles from '../css_modules/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.para}>
                Created by <a className={styles.link} href="http://www.michaelallain.com">Michael Allain</a>
            </p>
            <div className={styles.iconWrapper}>
                <a href="`mailto:michaeldallain@gmail.com?subject=DeveloPeer`" className={styles.iconLink} aria-label="Email Michael">
                    <FontAwesomeIcon icon="envelope" />
                </a>
                <a href="https://www.linkedin.com/in/allainm/" className={styles.iconLink} aria-label="Michael's LinkedIn">
                    <FontAwesomeIcon icon={["fab", "linkedin"]} />
                </a>
                <a href="https://github.com/fastlain" className={styles.iconLink} aria-label="Michael's GitHub">
                    <FontAwesomeIcon icon={["fab", "github"]} />
                </a>
            </div>
        </footer>
    );
}

export default Footer;