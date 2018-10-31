import React from 'react';
import styles from '../css_modules/ViewFeedback.module.css';

const ViewFeedback = (props) => {

    const reviewId = Number(props.match.params.reviewId);
    const review = props.reviews.find(review => review.id === reviewId);
    const questionsWithResponses = props.questions.map((question, i) => (
        <div className={styles.questionResponseWrapper}>
            <h5 className={styles.questionHeading}>Question {i + 1}:</h5>
            <p className={styles.question}>{question}</p>
            <p className={styles.response}>{review.responses[i]}</p>
        </div>
    ));

    return (
        <div className={styles.viewFeedbackWrapper}>
            <h3 className={styles.reviewerHeading}>
                Reviewer:
                <span className={styles.innerHeading}>
                    {review.reviewer}
                </span>
            </h3>
            <h4 className={styles.dateHeading}>
                Date:
                <span className={styles.innerHeading}>
                    {review.date.toLocaleString()}
                </span>
            </h4>
            {questionsWithResponses}
        </div>
    );
}

export default ViewFeedback;