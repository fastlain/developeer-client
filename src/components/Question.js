import React, { Component } from 'react';
import styles from '../css_modules/Question.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';
import Error from './Error';

class Question extends Component {
    render() {
        return (
            <fieldset className={styles.question}>
                <legend className={styles.legend}>Question {this.props.order + 1}:</legend>
                <label className={styles.blockLabel} htmlFor={`question${this.props.order}`}>
                    Write your question here:
                 </label>
                <textarea id={`question${this.props.order}`} className={styles.textArea} name={`question${this.props.order}`} rows={4} value={this.props.value} onChange={(e) => this.props.setQuestionText(e.target.value, this.props.order)} ref={this.props.qRef} />
                <Error message={this.props.error} errStyle="textArea" />
                <Button btnStyle="topRightDelete text" type="button" onClick={() => this.props.deleteQuestion(this.props.order)}>
                    <FontAwesomeIcon title="Delete Question" icon="times" />
                </Button>
            </fieldset>
        );
    }
}

export default Question;