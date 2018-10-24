import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css_modules/ReviewFeedback.module.css';

import PageTitle from './PageTitle';
import Button from './Button';
import TableRow from './TableRow';

class ReviewFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        const dummyData = {
            formName: "My Demo Form",
            reviews: [
                {
                    reviewer: "anonymous",
                    date: "01/01/2018 10:10"
                },
                {
                    reviewer: "user123",
                    date: "02/03/2018 11:11"
                },
                {
                    reviewer: "reviewer789",
                    date: "03/04/2018 12:12"
                }
            ]
        }

        const tableContents = dummyData.reviews.map((review, index) => {
            const cells = [
                <Button type="Button">VIEW</Button>,
                review.reviewer,
                review.date,
            ];
            const rowStyle = (index % 2 === 0) ? "even" : "odd";
            return (
                <TableRow cells={cells} key={index} rowStyle={rowStyle} />
            );
        });

        const tableHeadings = ["", "Reviewer", "Date"];

        return (
            <div>
                <Link to="/main/dashboard">
                    <Button type="Button" btnStyle="roomyTopBot">&larr; Dashboard</Button>
                </Link>
                <PageTitle>Review Feedback</PageTitle>
                <h2 className={styles.heading}>Form name: <span className={styles.innerHeading}>{dummyData.formName}</span></h2>
                <h3 className={styles.heading}>Reviews Received: <span className={styles.innerHeading}>{dummyData.reviews.length}</span></h3>
                <div className={styles.table}>
                    <TableRow cells={tableHeadings} rowStyle="heading"></TableRow>
                    {tableContents}
                </div>
            </div >
        );
    }
}

export default ReviewFeedback;