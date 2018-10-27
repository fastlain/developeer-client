import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from '../css_modules/ReviewFeedback.module.css';

import PageTitle from './PageTitle';
import TableRow from './TableRow';
import ExternalLinkBtn from './ExternalLinkBtn';
import ViewFeedback from './ViewFeedback';

class ReviewFeedback extends Component {


    render() {

        // get formId from url parameter and corresponding form data and reviews
        const formId = Number(this.props.match.params.id);
        const formData = this.props.forms.find(form => form.id === formId);
        const reviews = this.props.reviews.filter(review => review.formId === formId);

        // generate table rows from 
        const tableContents = reviews.map((review, index) => {
            const cells = [
                <Link to={`${this.props.match.url}/view/${index}`} className="Link btnStyle">VIEW</Link>,
                review.reviewer,
                `${review.date.toLocaleString()}`,
            ];
            const rowStyle = (index % 2 === 0) ? 'even' : 'odd';
            return (
                <TableRow cells={cells} key={index} rowStyle={rowStyle} />
            );
        });

        const tableHeadings = ['', 'Reviewer', 'Date'];

        return (
            <div>
                <Link to="/main/dashboard" className="Link btnStyle roomy">
                    &larr; DASHBOARD
                </Link>
                <PageTitle>Review Feedback</PageTitle>
                <h2 className={styles.center}>Form name: <span className={styles.innerHeading}>{formData.name}</span></h2>
                <div className={styles.center}>
                    <ExternalLinkBtn href={formData.projectUrl}>
                        VISIT PAGE
                    </ExternalLinkBtn>
                </div>
                <h3 className={styles.center}>Reviews Received: <span className={styles.innerHeading}>{reviews.length}</span></h3>
                <div className={styles.table}>
                    <TableRow cells={tableHeadings} rowStyle="heading"></TableRow>
                    {tableContents}
                </div>

                <Route exact path={`${this.props.match.url}/view/:reviewId`} render={(props) => <ViewFeedback {...props} questions={formData.questions} reviews={reviews} />} />
            </div >
        );
    }
}

const mapStateToProps = state => ({
    forms: state.forms,
    reviews: state.reviews
});

export default connect(mapStateToProps)(ReviewFeedback);