import React, { Component } from 'react';
import styles from '../css_modules/FeedbackForm.module.css';

import Button from './Button';

class FeedbackForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    submitForm = (e) => {
        e.preventDefault();
        // navigate to dashboard
        this.props.history.push('/main/dashboard');
    }

    render() {

        const dummyData = {
            project: 'Example Project',
            author: 'username123',
            link: 'https://www.michaelallain.com',
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
                <a className={styles.buttonLink} href={dummyData.link} target="_blank" rel="noopener noreferrer" >VISIT PAGE</a>
                {questions}
                <Button type="submit" btnStyle="roomyTopBot" onClick={this.submitForm}>SUBMIT FEEDBACK</Button>
            </form>
        );
    }
}

export default FeedbackForm;