import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { incRequest, decRequest } from '../actions';
import styles from '../css_modules/MyFeedback.module.css';

import FormSummary from './FormSummary';

class MyFeedback extends Component {

    render() {

        const summaries = this.props.forms.map(form => (
            <FormSummary key={form.id} id={form.id} name={form.name} requests={form.pendingRequests} shareableUrl={form.shareableUrl} incRequest={this.props.incRequest} decRequest={this.props.decRequest} credit={this.props.credit} />
        ))

        return (
            <section className={styles.center}>
                <h2>My Feedback</h2>
                <p>
                    Here are some instructions...
                </p>
                {summaries}
                <Link to="/main/createform" className="Link btnStyle roomy">CREATE NEW FORM</Link>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    forms: state.forms,
    credit: state.credit
});

const mapDispatchToProps = dispatch => ({
    incRequest: formId => dispatch(incRequest(formId)),
    decRequest: formId => dispatch(decRequest(formId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFeedback);