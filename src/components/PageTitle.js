import React from 'react';
import styles from '../css_modules/PageTitle.module.css';

const PageTitle = (props) => {
    return (
        <header>
            <h2 className={styles.pageTitle}>
                {props.children}
            </h2>
        </header>
    );
}

export default PageTitle;