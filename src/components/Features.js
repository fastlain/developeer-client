import React from 'react';
import styles from '../css_modules/Features.module.css';

const Features = () => {

    const featureData = [
        {
            name: 'Custom Feedback Forms',
            content: 'Easily create forms with instructions and questions for your reviewers to answer.',
            screenshot: 'https://placeimg.com/250/150/tech'
        },
        {
            name: 'Equitable Credit System',
            content: 'Earn credits by reviewing peer projects. Spend credits to receive reviews for your own projects.',
            screenshot: 'https://placeimg.com/250/150/tech'
        },
        {
            name: 'Share Anywhere',
            content: 'Use form links to share forms outside the Developeer community—no credits needed!',
            screenshot: 'https://placeimg.com/250/150/tech'
        }
    ]

    const features = featureData.map((feature, i) => (
        <div className={styles.feature} key={i}>
            <h2 className={styles.featureName}>{feature.name}</h2>
            <p>{feature.content}</p>
            <img src={feature.screenshot} alt="feature screenshot" />
        </div>
    ));

    return (
        <section className={styles.featureWrapper}>
            {features}
        </section>
    );
}

export default Features;