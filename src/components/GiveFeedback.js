import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import requiresLogin from './HOC/requiresLogin';

import PageTitle from './PageTitle';
import Button from './Button';
import FeedbackForm from './FeedbackForm';
import Instructions from './Instructions';
import instructionList from './shared_data/feedbackInstructions';

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
            feedbackForm = (<FeedbackForm {...this.props} isInternalReview={true} />);
        }

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

export default requiresLogin()(GiveFeedback);