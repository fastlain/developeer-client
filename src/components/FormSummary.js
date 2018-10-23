import React, { Component } from 'react';
import styles from '../css_modules/FormSummary.module.css';

import Button from './Button';

class FormSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className={styles.formContainer}>

                <div className={styles.formNameWrapper}>
                    <h3 className={styles.formName}>My first form</h3>
                    <Button type="button" btnStyle="edit">Edit</Button>
                </div>

                <div className={styles.requestWrapper}>
                    <p className={styles.requestInfo}>Spend Credits to get more feedback from other Developeer users.</p>
                    <div className={styles.pendingRequests}>
                        <span>Pending Requests:</span>
                        <div className={styles.requestButtonWrapper}>
                            <Button type="button">-</Button>
                            <span className={styles.credits}>3</span>
                            <Button type="button">+</Button>
                        </div>
                    </div>

                    <p>-- OR --</p>

                    <div>
                        <p className={styles.requestInfo}>Share this direct link elsewhere:</p>
                        <div className={styles.shareLinkWrapper}>
                            <input type="text" value="http://www.test.com/" readOnly />
                            <Button type="button" btnStyle="roomySides">Copy to Clipboard</Button>
                        </div>
                    </div>
                </div>

                <Button type="button" btnStyle="roomyTopBot">Review Feedback</Button>
            </div>
        );
    }
}

export default FormSummary;