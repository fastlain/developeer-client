import React from 'react';
import styles from '../css_modules/Question.module.css';

import Button from './Button';
import Error from './Error';

const Question = (props) => (
    <fieldset className={styles.question}>
        <legend>Question {props.order + 1}:</legend>
        <label className={styles.blockLabel} htmlFor={`question${props.order}`}>
            Write your question here:
        </label>
        <textarea id={`question${props.order}`} className={styles.textArea} name={`question${props.order}`} rows={4} value={props.value} onChange={(e) => props.setQuestionText(e.target.value, props.order)} />
        <Error message={props.error} />
        <Button btnStyle="right" type="button" onClick={() => props.deleteQuestion(props.order)}>
            DELETE QUESTION
        </Button>
    </fieldset>
);

export default Question;