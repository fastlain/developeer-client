import React from 'react';
import styles from '../css_modules/Notifications.module.css';

import Button from './Button';

const Notifications = ({ notifications, closeNotification }) => {

    const notifList = notifications.map(n => (
        <li className={styles.notification} key={n.id} id={n.id}>
            {n.text}
            <Button type="button" btnStyle="tight" onClick={() => closeNotification(n.id)}>X</Button>
        </li >
    ));

    return (
        <section>
            <ul className={styles.notificationList}>
                {notifList}
            </ul>
        </section>
    );
}

export default Notifications;