import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../css_modules/MyFeedback.module.css';

import FormSummary from './FormSummary';
import Instructions from './Instructions';

export class MyFeedback extends Component {

    render() {

        const summaries = this.props.forms.map(form => (
            <FormSummary key={form._id} id={form._id} name={form.name} requests={form.pendingRequests} credit={this.props.credit} />
        ))

        const instructionList = [
            'Review feedback forms or create new ones',
            'Spend Credits to request feedback from other Developeer users',
            'Share a direct review link outside this site—no credits needed!'
        ];

        return (
            <div className={styles.wrapper}>
                <h2 className={styles.heading}>Forms and Feedback</h2>
                <Instructions list={instructionList} />
                {summaries}
                <Link to="/main/createform" className="Link btnStyle roomy">CREATE NEW FORM</Link>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    forms: state.user.forms,
    credit: state.user.credit
});

export default connect(mapStateToProps)(MyFeedback);