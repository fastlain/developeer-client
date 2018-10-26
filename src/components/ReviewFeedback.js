import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import styles from '../css_modules/ReviewFeedback.module.css';

import PageTitle from './PageTitle';
import TableRow from './TableRow';
import ExternalLinkBtn from './ExternalLinkBtn';
import FeedbackForm from './FeedbackForm';

class ReviewFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        const dummyData = {
            formName: 'My Demo Form',
            link: 'https://www.michaelallain.com',
            reviews: [
                {
                    reviewer: 'anonymous',
                    date: '01/01/2018 10:10'
                },
                {
                    reviewer: 'user123',
                    date: '02/03/2018 11:11'
                },
                {
                    reviewer: 'reviewer789',
                    date: '03/04/2018 12:12'
                }
            ],
        }

        const tableContents = dummyData.reviews.map((review, index) => {
            const cells = [
                <Link to={`/main/reviewfeedback/view/${index}`} className="Link btnStyle">VIEW</Link>,
                review.reviewer,
                review.date,
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
                <h2 className={styles.center}>Form name: <span className={styles.innerHeading}>{dummyData.formName}</span></h2>
                <div className={styles.center}>
                    <ExternalLinkBtn href={dummyData.link}>
                        VISIT PAGE
                    </ExternalLinkBtn>
                </div>
                <h3 className={styles.center}>Reviews Received: <span className={styles.innerHeading}>{dummyData.reviews.length}</span></h3>
                <div className={styles.table}>
                    <TableRow cells={tableHeadings} rowStyle="heading"></TableRow>
                    {tableContents}
                </div>

                <Route path={`/main/reviewfeedback/view`} component={FeedbackForm} />
            </div >
        );
    }
}

export default ReviewFeedback;