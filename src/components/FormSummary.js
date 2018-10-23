import React, { Component } from 'react';
import styles from '../css_modules/FormSummary.module.css';

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
                    <button className={styles.editButton}>Edit</button>
                </div>

                <div className={styles.requestWrapper}>
                    <p className={styles.requestInfo}>Spend Credits to get more feedback from other Developeer users.</p>
                    <div className={styles.pendingRequests}>
                        <span>Pending Requests:</span>
                        <div className={styles.requestButtonWrapper}>
                            <button type="button">-</button>
                            <span className={styles.credits}>3</span>
                            <button type="button">+</button>
                        </div>
                    </div>

                    <p>-- OR --</p>

                    <div>
                        <p className={styles.requestInfo}>Share this direct link elsewhere:</p>
                        <div className={styles.shareLinkWrapper}>
                            <input type="text" value="http://www.test.com/" readOnly />
                            <button type="button">Copy to Clipboard</button>
                        </div>
                    </div>
                </div>

                <button type="button">Review Feedback</button>
            </div>
        );
    }
}

export default FormSummary;