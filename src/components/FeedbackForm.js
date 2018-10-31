import React, { Component } from 'react';
import styles from '../css_modules/FeedbackForm.module.css';

import Button from './Button';
import ExternalLinkBtn from './ExternalLinkBtn';

class FeedbackForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    submitForm = (e) => {
        e.preventDefault();
        // TODO: validate input data (maybe just required fields with minimum characters?)
        // TODO: Update credits, pending requests, reviews, and notifications for form author
        // TODO: Add credit or successful form submission
        // navigate to dashboard
        this.props.history.push('/main/dashboard');
    }

    render() {

        // TODO: Pull form data from server
        // TODO: Store textarea input in state
        const dummyData = {
            project: 'Example Project',
            author: 'username123',
            link: 'https://www.michaelallain.com',
            overview: 'Check out my project and answer these questions.',
            questions: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            ]
        };

        const questions = dummyData.questions.map((question, index) => (
            <fieldset className={styles.questionWrapper} key={index}>
                <legend>Question {index + 1}:</legend>
                <label htmlFor={`question${index + 1}`}>
                    <p>{question}</p>
                </label>
                <textarea className={styles.textArea} id={`question${index + 1}`} name={`question${index + 1}`} rows={4}></textarea>
            </fieldset >
        ));

        return (
            <form className={styles.form}>
                <h3>Project: <span className={styles.innerHeading}>{dummyData.project}</span></h3>
                <h3>Author: <span className={styles.innerHeading}>{dummyData.author}</span></h3>
                <div className={styles.overview}>
                    <h3>Reivewer Instructions:</h3>
                    <p className={styles.overviewContent}>{dummyData.overview}</p>
                </div>
                <ExternalLinkBtn href={dummyData.link}>
                    VISIT PAGE
                </ExternalLinkBtn>
                {questions}
                <Button type="submit" btnStyle="roomyTopBot" onClick={this.submitForm}>SUBMIT FEEDBACK</Button>
            </form>
        );
    }
}

export default FeedbackForm;