import React, { Component } from 'react';
import styles from '../css_modules/Notifications.module.css';

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <ul className={styles.notificationList}>
                <li className={styles.notification}>
                    Nofication 1 goes here
                    <button type="button" className={styles.closeBtn}>X</button>
                </li>
                <li className={styles.notification}>
                    Nofication 2 goes here
                    <button type="button" className={styles.closeBtn}>X</button>

                </li>
            </ul>
        );
    }
}

export default Notifications;