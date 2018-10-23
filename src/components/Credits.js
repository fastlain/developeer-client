import React, { Component } from 'react';
import styles from '../css_modules/Credits.module.css';

import Button from './Button';

class Credits extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <section className={styles.creditsWrapper}>
                <h2>Credits</h2>
                <p>You currently have <span className={styles.credits}>#</span> credits.</p>
                <p>Earn more by providing peer feedback:</p>
                <Button type="button" btnStyle="roomyTopBot">Give Feedback</Button>
            </section>
        );
    }
}

export default Credits;