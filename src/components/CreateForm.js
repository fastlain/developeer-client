import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createForm } from '../actions';
import styles from '../css_modules/CreateForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PageTitle from './PageTitle';
import Button from './Button';
import Question from './Question';
import Instructions from './Instructions';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formName: '',
            projectUrl: '',
            overview: '',
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

    setQuestionText = (text, order) => {
        const newQuestions = [...this.state.questions];
        newQuestions[order] = text;
        this.setState({ questions: newQuestions });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(createForm(this.state.formName, this.state.projectUrl, this.state.questions));
        // navigate back to dashboard
        this.props.history.push('/main/dashboard');
    }

    render() {

        const questionList = this.state.questions.map((question, index) => (
            <Question order={index} key={index} value={question} setQuestionText={this.setQuestionText} deleteQuestion={this.deleteQuestion} />
        ));

        const maxedQuestions = this.state.questions.length < 5;
        const addQuestionBtnStyle = maxedQuestions ? '' : 'disabled';
        const warnClass = maxedQuestions ? styles.hideWarning : styles.warning;

        const instructionList = [
            'Create a meaningful name for your form (e.g. "Blog App UI feedback")',
            'Provide a link to a LIVE version of your project (NOT a code repository)',
            'Write instructions and up to 5 questions requesting feedback on your project'
        ];

        return (
            <div>
                <Link to="/main/dashboard" className="Link btnStyle roomy">
                    <FontAwesomeIcon icon="long-arrow-alt-left" size="lg" /> DASHBOARD
                </Link>
                <PageTitle>Create a New Form</PageTitle>
                <Instructions list={instructionList} />

                <form className={styles.createForm} onSubmit={this.submitForm}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="formName">Form Name: </label>
                        <input id="formName" name="formName" type="text" value={this.state.formName} onChange={this.setInput} />
                    </div>

                    <div className={styles.inputWrapper}>
                        <label htmlFor="projectUrl">Project URL: </label>
                        <input id="projectUrl" name="projectUrl" type="text" value={this.state.projectUrl} onChange={this.setInput} />
                    </div>

                    <fieldset className={styles.overview}>
                        <legend>Reviewer Instructions</legend>
                        <label className={styles.blockLabel} htmlFor="overview">
                            Provide guidance or helpful information for your reviewers:
                        </label>
                        <textarea className={styles.textArea} id="overview" name="overview" rows={4} value={this.state.overview} onChange={this.setInput} />
                    </fieldset>

                    {questionList}

                    <Button btnStyle={`block center ${addQuestionBtnStyle}`} type="button" onClick={this.addQuestion}>
                        + ADD QUESTION
                    </Button>

                    <div className={styles.warningWrapper}>
                        <p className={warnClass}>5 questions maximum</p>

                    </div>

                    <Button btnStyle="roomyTopBot block center" type="submit">SUBMIT FORM</Button>

                </form>
            </div>
        );
    }
}

export default connect()(CreateForm);