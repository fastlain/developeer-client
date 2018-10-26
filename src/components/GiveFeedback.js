import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css_modules/GiveFeedback.module.css';

import PageTitle from './PageTitle';
import Button from './Button';
import FeedbackForm from './FeedbackForm';

class GiveFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false
        };
    }

    startFeedback = () => {
        this.setState({ started: true });
    }

    render() {
        let toRender;
        if (!this.state.started) {
            toRender = (
                <section className={styles.instructionsWrapper}>
                    <h2>Instructions</h2>
                    <p className={styles.instructions}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <Button type="button" btnStyle="center roomyTopBot" onClick={this.startFeedback}>START</Button>
                </section>
            );
        } else {
            toRender = (<FeedbackForm {...this.props} />);
        }

        return (
            <div>
                <Link to="/main/dashboard" className="Link btnStyle roomy">
                    &larr; DASHBOARD
                </Link>
                <PageTitle>Feedback</PageTitle>
                {toRender}
            </div>
        );
    }
}

export default GiveFeedback;