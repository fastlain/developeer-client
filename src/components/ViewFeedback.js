import React from 'react';
import styles from '../css_modules/ViewFeedback.module.css';

const ViewFeedback = (props) => {

    const reviewId = Number(props.match.params.reviewId);
    const review = props.reviews.find(review => review.id === reviewId);
    const questionsWithResponses = props.questions.map((question, i) => (
        <div className={styles.questionResponseWrapper}>
            <h4>Question {i + 1}:</h4>
            <p>{question}</p>
            <p>{review.responses[i]}</p>
        </div>
    ));

    return (
        <div className={styles.viewFeedbackWrapper}>
            <h3 className={styles.reviewerHeading}>Reviewer: {review.reviewer}</h3>
            <p className={styles.dateHeading}>Review Date: {review.date.toLocaleString()}</p>
            {questionsWithResponses}
        </div>
    );
}

export default ViewFeedback;