import React from 'react';
import styles from '../css_modules/ExternalLinkBtn.module.css';

const ExternalLinkBtn = (props) => {
    return (
        <a className={styles.buttonLink} href={props.href} target="_blank" rel="noopener noreferrer">
            {props.children}
        </a>
    );
}

export default ExternalLinkBtn;