import React from 'react';
import styles from '../css_modules/ExternalSuccess.module.css';

import { Link } from 'react-router-dom';

const ExternalSuccess = () => {
    return (
        <section className={styles.success}>
            <h3 className={styles.heading}>Review Successfully Submitted!</h3>
            <p className={styles.para}>Thanks for using Developeer</p>
            <Link to="/" className="Link btnStyle roomy">LEARN MORE</Link>
        </section>
    );
}

export default ExternalSuccess;