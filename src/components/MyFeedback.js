import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../css_modules/MyFeedback.module.css';

import FormSummary from './FormSummary';
import Instructions from './Instructions';
import StyledLink from './StyledLink';

export class MyFeedback extends Component {

    render() {

        const summaries = this.props.forms.map(form => (
            <FormSummary key={form._id} id={form._id} name={form.name} requests={form.pendingRequests} credit={this.props.credit} />
        ))

        const instructionList = [
            'Review or create feedback forms',
            'Spend Credits to request DeveloPeer user feedback',
            'Copy and share a review link—no credits needed!'
        ];

        return (
            <div className={styles.wrapper}>
                <h2 className={styles.heading}>Forms and Feedback</h2>
                <Instructions list={instructionList} />
                <StyledLink to="/main/createform" className="roomyTopBot accent">CREATE NEW FORM</StyledLink>
                {summaries}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    forms: state.user.forms,
    credit: state.user.credit
});

export default connect(mapStateToProps)(MyFeedback);