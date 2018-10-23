import React, { Component } from 'react';
import styles from '../css_modules/MyFeedback.module.css';

import FormSummary from './FormSummary';

class MyFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className={styles.center}>
                <h2>My Feedback</h2>
                <p>
                    Here are some instructions...
                </p>
                <FormSummary />
                <FormSummary />
                <FormSummary />
                <button class="centerButton newFormBtn" type="button">Create New Feedback Form</button>

            </div>
        );
    }
}

export default MyFeedback;