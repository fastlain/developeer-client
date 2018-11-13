import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PageTitle from './PageTitle';
import Button from './Button';
import FeedbackForm from './FeedbackForm';
import Instructions from './Instructions';

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
        let startBtn;
        let feedbackForm;
        if (!this.state.started) {
            startBtn = (
                <Button type="button" btnStyle="center roomyTopBot" onClick={this.startFeedback}>START</Button>
            );
        } else {
            feedbackForm = (<FeedbackForm {...this.props} />);
        }

        const instructionList = [
            'You will be given a random project to review from the request pool',
            'Read the author\'s instructions and check out their project page',
            'Try to be constructive and specific in answering their questions',
            'Expect to spend 2-5 minutes completing your review'
        ];

        return (
            <div>
                <Link to="/main/dashboard" className="Link btnStyle roomy">
                    <FontAwesomeIcon icon="long-arrow-alt-left" size="lg" /> DASHBOARD
                </Link>
                <PageTitle> Give Feedback</PageTitle>
                <Instructions list={instructionList} />
                {startBtn}
                {feedbackForm}
            </div>
        );
    }
}

export default GiveFeedback;