import React, { Component } from 'react';

import PageTitle from './PageTitle';
import Instructions from './Instructions';
import instructionList from './shared_data/feedbackInstructions';
import FeedbackForm from './FeedbackForm';
import ExternalSuccess from './ExternalSuccess';

class ExternalFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false
        };
    }

    extReviewSuccess = () => {
        this.setState({ success: true });
    }

    render() {

        let content;
        if (this.state.success) {
            content = (
                <ExternalSuccess />
            );
        } else {
            content = (
                <div>
                    <Instructions list={instructionList} />
                    <FeedbackForm {...this.props} isInternalReview={false} extReviewSuccess={this.extReviewSuccess} />
                </div>
            );
        }

        return (
            <div>
                <PageTitle> Give Feedback</PageTitle>
                {content}
            </div>
        );
    }
}

export default ExternalFeedback;