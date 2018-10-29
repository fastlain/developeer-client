import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css_modules/CreateForm.module.css';

import PageTitle from './PageTitle';
import Button from './Button';
import Question from './Question';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formName: '',
            projectUrl: '',
            questions: ['', '', '']
        };
    }

    setInput = (e) => {
        const val = e.target.value;
        const inputId = e.target.id;
        this.setState({ [inputId]: val })
    }

    deleteQuestion = (order) => {
        const newQuestions = [...this.state.questions];
        newQuestions.splice(order, 1);
        this.setState({ questions: newQuestions });
    }

    addQuestion = () => {
        if (this.state.questions.length < 5) {
            const newQuestions = [...this.state.questions];
            newQuestions.push('');
            this.setState({ questions: newQuestions });
        }
    }

    setText = (text, order) => {
        const newQuestions = [...this.state.questions];
        newQuestions[order] = text;
        this.setState({ questions: newQuestions });
    }

    render() {

        const questionList = this.state.questions.map((question, index) => (
            <Question order={index} key={index} value={question} setText={this.setText} deleteQuestion={this.deleteQuestion} />
        ));

        const maxedQuestions = this.state.questions.length < 5;
        const addQuestionBtnStyle = maxedQuestions ? '' : 'disabled';
        const warnClass = maxedQuestions ? styles.hideWarning : styles.warning;

        return (
            <div>
                <Link to="/main/dashboard" className="Link btnStyle roomy">
                    &larr; DASHBOARD
                </Link>
                <PageTitle>Create a New Form</PageTitle>
                <section className={styles.instructionsWrapper}>
                    <h2>Instructions</h2>
                    <p className={styles.instructions}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </section>

                <form className={styles.createForm}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="formName">Form Name: </label>
                        <input id="formName" name="formName" type="text" value={this.state.formName} onChange={this.setInput} />
                    </div>

                    <div className={styles.inputWrapper}>
                        <label htmlFor="projectUrl">Project URL: </label>
                        <input id="projectUrl" name="projectUrl" type="text" value={this.state.projectUrl} onChange={this.setInput} />
                    </div>

                    {questionList}

                    <Button btnStyle={`block center ${addQuestionBtnStyle}`} type="button" onClick={this.addQuestion}>
                        + ADD QUESTION
                    </Button>

                    <div className={styles.warningWrapper}>
                        <p className={warnClass}>5 questions maximum</p>

                    </div>

                    <Button btnStyle="roomyTopBot block center" type="button">SAVE FORM</Button>

                </form>
            </div>
        );
    }
}

export default CreateForm;