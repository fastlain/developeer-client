import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css_modules/Credits.module.css';

import Button from './Button';

class Credits extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        console.log(this.props)
        return (
            <section className={styles.creditsWrapper}>
                <h2>Credits</h2>
                <p>You currently have <span className={styles.credits}>{this.props.credits}</span> credits.</p>
                <p>Earn more by providing peer feedback:</p>
                <Link to="/main/givefeedback">
                    <Button type="button" btnStyle="roomyTopBot">Give Feedback</Button>
                </Link>
            </section>
        );
    }
}

export default Credits;