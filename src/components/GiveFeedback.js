import React, { Component } from 'react';
import requiresLogin from './HOC/requiresLogin';

import DashboardBtn from './DashboardBtn';
import PageTitle from './PageTitle';
import Button from './Button';
import FeedbackForm from './FeedbackForm';
import Instructions from './Instructions';
import instructionList from './shared_data/feedbackInstructions';

export class GiveFeedback extends Component {
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
                <Button type="button" btnStyle="center roomyTopBot accent botMargin" onClick={this.startFeedback}>START</Button>
            );
        } else {
            feedbackForm = (<FeedbackForm {...this.props} isInternalReview={true} />);
        }

        return (
            <div>
                <DashboardBtn />
                <PageTitle> Give Feedback</PageTitle>
                <Instructions list={instructionList} />
                {startBtn}
                {feedbackForm}
            </div>
        );
    }
}

export default requiresLogin()(GiveFeedback);