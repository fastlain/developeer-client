import React from 'react';
import styles from '../css_modules/PageTitle.module.css';

const PageTitle = (props) => {
    return (
        <header>
            <h1 className={styles.pageTitle}>
                {props.children}
            </h1>
        </header>
    );
}

export default PageTitle;