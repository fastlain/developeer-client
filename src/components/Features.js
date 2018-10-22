import React from 'react';
import styles from '../css_modules/Features.module.css';

const Features = () => {

    const dummyFeatureData = [
        {
            name: "Feature 1",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            screenshot: "https://placeimg.com/250/150/tech"
        },
        {
            name: "Feature 2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            screenshot: "https://placeimg.com/250/150/tech"
        },
        {
            name: "Feature 3",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            screenshot: "https://placeimg.com/250/150/tech"
        }
    ]

    const features = dummyFeatureData.map(feature => (
        <div className={styles.feature}>
            <h2>{feature.name}</h2>
            <p>{feature.content}</p>
            <img src={feature.screenshot} alt="feature screenshot" />
        </div>
    ));

    return (
        <section role="region">
            {features}
        </section>
    );
}

export default Features;