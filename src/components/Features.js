import React from 'react';
import styles from '../css_modules/Features.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Features = () => {

    const featureData = [
        {
            name: 'Help Fellow Developers',
            content: 'Review exciting projects shared by your peers. Share your opinions and expertise',
            icon: 'hands-helping'
        },
        {
            name: 'Give and Receive Equitably',
            content: 'Earn credits by reviewing peer projects. Spend credits to receive reviews for your own projects.',
            icon: 'coins'
        },
        {
            name: 'Create Custom Forms',
            content: 'Easily create feedback forms with instructions and questions for your reviewers to answer.',
            icon: 'pen'
        },
        {
            name: 'Share Anywhere',
            content: 'Use form links to share forms outside the DeveloPeer community—no credits needed!',
            icon: 'share-alt'
        }
    ]

    const features = featureData.map((feature, i) => (
        <div className={styles.feature} key={i}>
            <h2 className={styles.featureTitle}>
                <FontAwesomeIcon icon={feature.icon} />
                <span className={styles.featureName}>{feature.name}</span>
            </h2>
            <p className={styles.content}>{feature.content}</p>
        </div>
    ));

    return (
        <section className={styles.featureWrapper}>
            {features}
        </section>
    );
}

export default Features;