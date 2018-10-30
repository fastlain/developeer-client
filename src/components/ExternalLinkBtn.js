import React from 'react';
import styles from '../css_modules/ExternalLinkBtn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ExternalLinkBtn = (props) => {
    return (
        <a className={styles.buttonLink} href={props.href} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="external-link-alt" className="FA marginRt" />
            {props.children}
        </a>
    );
}

export default ExternalLinkBtn;