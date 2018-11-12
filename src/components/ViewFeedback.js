import React from 'react';
import styles from '../css_modules/ViewFeedback.module.css';

const ViewFeedback = (props) => {

    const reviewId = props.match.params.reviewId;
    const review = props.reviews.find(review => review._id === reviewId);
    const version = props.versions.find(version => version._id === review.formVersion);
    const questionsWithResponses = version.questions.map((question, i) => (
        <div className={styles.questionResponseWrapper} key={i}>
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
                    {review.reviewerName}
                </span>
            </h3>
            <h4 className={styles.dateHeading}>
                Date:
                <span className={styles.innerHeading}>
                    {review.dateObj.toLocaleString()}
                </span>
            </h4>
            {questionsWithResponses}
        </div>
    );
}

export default ViewFeedback;