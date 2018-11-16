import React from 'react';
import styles from '../css_modules/Instructions.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Instructions = ({ title, list }) => {

    const heading = title ? <h3 className={styles.heading}>{title}</h3> : null;
    let listItems;
    if (list) {
        listItems = list.map((item, index) => (
            <li className={styles.listItem} key={index}>
                <FontAwesomeIcon icon="star" className="FA bullet" />
                {item}
            </li>
        ));
    }

    return (
        <section className={styles.instructions}>
            {heading}
            <ul className={styles.list}>
                {listItems}
            </ul>
        </section>
    );
}

export default Instructions;