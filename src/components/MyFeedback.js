import React, { Component } from 'react';
import styles from '../css_modules/MyFeedback.module.css';

import FormSummary from './FormSummary';
import Button from './Button';

class MyFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <section className={styles.center}>
                <h2>My Feedback</h2>
                <p>
                    Here are some instructions...
                </p>
                <FormSummary />
                <FormSummary />
                <Button type="button" btnStyle="roomyTopBot">Create New Feedback Form</Button>
            </section>
        );
    }
}

export default MyFeedback;