import React, { Component } from 'react';
import styles from '../css_modules/Notifications.module.css';

import Button from './Button';

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <section>
                <ul className={styles.notificationList}>
                    <li className={styles.notification}>
                        Nofication 1 goes here
                        <Button type="button" btnStyle="tight">X</Button>
                    </li>
                    <li className={styles.notification}>
                        Nofication 2 goes here
                        <Button type="button"
                            btnStyle="tight">X</Button>

                    </li>
                </ul>
            </section>
        );
    }
}

export default Notifications;