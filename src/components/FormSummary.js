import React, { Component } from 'react';
import styles from '../css_modules/FormSummary.module.css';
import { Link } from 'react-router-dom';

import Button from './Button';

class FormSummary extends Component {

    decRequest = () => {
        if (this.props.requests > 0) {
            this.props.decRequest(this.props.id);
        }
    }

    incRequest = () => {
        if (this.props.credit > 0) {
            this.props.incRequest(this.props.id);
        }
    }

    render() {

        const removeBtnActive = this.props.requests > 0;
        const removeBtnClass = removeBtnActive ? "default" : "disabled";

        return (
            <div className={styles.formContainer}>

                <div className={styles.formNameWrapper}>
                    <h3 className={styles.formName}>{this.props.name}</h3>
                    <Button type="button" btnStyle="edit">Edit</Button>
                </div>

                <div className={styles.requestWrapper}>
                    <p className={styles.requestInfo}>Spend Credits to get more feedback from other Developeer users.</p>
                    <div className={styles.pendingRequests}>
                        <span>Pending Requests:</span>
                        <div className={styles.requestButtonWrapper}>
                            <Button type="button" btnStyle={removeBtnClass} onClick={this.decRequest}>-</Button>
                            <span className={styles.credits}>{this.props.requests}</span>
                            <Button type="button" onClick={this.incRequest}> +</Button>
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

                <Link to="/main/reviewfeedback"><Button type="button" btnStyle="roomyTopBot">REVIEW FEEDBACK</Button></Link>
            </div>
        );
    }
}

export default FormSummary;