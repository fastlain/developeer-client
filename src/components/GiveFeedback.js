import React, { Component } from 'react';
import styles from '../css_modules/GiveFeedback.module.css';

import Button from './Button';

class GiveFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className={styles.giveFeedbackWrapper}>
                <h2>Credits</h2>
                <p>You currently have <span className={styles.credits}>#</span> credits.</p>
                <p>Earn more by providing peer feedback:</p>
                <Button type="button" btnStyle="roomyTopBot">Give Feedback</Button>
            </div>
        );
    }
}

export default GiveFeedback;