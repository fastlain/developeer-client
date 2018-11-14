import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import requiresLogin from './HOC/requiresLogin';
import styles from '../css_modules/CreateForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_BASE_URL } from '../config';
import { setUser, showPopup } from '../actions';

import PageTitle from './PageTitle';
import Button from './Button';
import Question from './Question';
import Instructions from './Instructions';
import Error from './Error';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameErr: '',
            projectUrl: '',
            projectUrlErr: '',
            overview: '',
            overviewErr: '',
            questions: ['', '', ''],
            questionsErr: [],
            generalErr: '',

            isSubmitting: false,
            submitSuccess: false
        };
    }

    // set form input changes (except questions) to state
    handleChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        this.setState({ [field]: value })
    }

    setQuestionText = (text, order) => {
        const newQuestions = [...this.state.questions];
        newQuestions[order] = text;
        this.setState({ questions: newQuestions });
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

    handleFormSubmit = (e) => {
        e.preventDefault();
        // if already handling submit, do not process new submits
        if (this.state.isSubmitting) { return }

        this.setState({ isSubmitting: true });

        // clear existing errors
        this.setState({
            nameErr: '',
            projectUrlErr: '',
            overviewErr: '',
            questionsErr: ['', '', ''],
            generalErr: ''
        });

        // check for client-side form errors and set to state
        const clientErrors = this.validateClient();
        if (Object.keys(clientErrors).length > 0) {
            this.handleErrors(clientErrors);
        } else {
            this.submitToServer();
        }
    }

    handleErrors = errors => {
        for (let err in errors) {
            this.setState({ [`${err}Err`]: errors[err] })
        }
        this.setState({ isSubmitting: false });
    }

    validateClient = () => {
        const errors = {};

        // validate form name
        const name = this.state.name;
        if (name.length < 1) {
            errors.name = 'Form Name is required';
        }

        // validate projectUrl
        const projectUrl = this.state.projectUrl;
        // RegEx for URL validation from Diego Perini: https://gist.github.com/dperini/729294
        // modified to allow URLs with no preceeding `//`
        const regExUrl = /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i

        if (projectUrl.length < 1) {
            errors.projectUrl = 'Project URL is required';
        } else if (!projectUrl.match(regExUrl)) {
            errors.projectUrl = 'Invalid URL';
        }

        // validate overview (instructions)
        const overview = this.state.overview;
        if (overview.length < 1) {
            errors.overview = 'Reviewer Instructions are required';
        }

        // validate questions
        let foundQuestionError = false;
        const questionsErr = this.state.questions.map(question => {
            if (question.length < 1) {
                foundQuestionError = true;
                return 'Blank questions not allowed'
            }
            return '';
        })
        if (foundQuestionError) {
            errors.questions = questionsErr;
        }

        return errors;
    }

    submitToServer = () => {
        const form = {
            name: this.state.name,
            projectUrl: this.state.projectUrl,
            overview: this.state.overview,
            questions: this.state.questions
        };

        fetch(`${API_BASE_URL}/forms`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${this.props.authToken}`
            },
            body: JSON.stringify(form)
        })
            .then(res => {
                if (!res.ok) {
                    // check if error is custom JSON error
                    if (
                        res.headers.has('content-type') &&
                        res.headers.get('content-type').startsWith('application/json')
                    ) {
                        // display custom server-side errors
                        return res.json()
                            .then(err => {
                                this.handleErrors({ [err.location]: err.message });
                            });
                    } else {
                        // display Express-generated error
                        this.handleErrors({ general: res.statusText });
                    }
                } else {
                    res.json()
                        .then(user => {
                            this.props.dispatch(setUser(user));
                            this.setState({ submitSuccess: true })
                            this.props.dispatch(showPopup('Form created successfully'));
                        });
                }
            })
            .catch(() => {
                this.handleErrors({ general: 'Server Error. Sorry, try again later.' });
            })
    }

    render() {

        if (this.state.submitSuccess) {
            return <Redirect to="/main/dashboard" />
        }

        const questionList = this.state.questions.map((question, index) => (
            <Question order={index} key={index} value={question} setQuestionText={this.setQuestionText} deleteQuestion={this.deleteQuestion} error={this.state.questionsErr[index]} />
        ));

        const maxedQuestions = this.state.questions.length < 5;
        const addQuestionBtnStyle = maxedQuestions ? '' : 'disabled';
        const warnClass = maxedQuestions ? styles.hideWarning : styles.warning;

        const instructionList = [
            'Create a meaningful name for your form (e.g. "Blog App UI feedback")',
            'Provide a link to a LIVE version of your project (NOT a code repository)',
            'Write instructions and up to 5 questions requesting feedback on your project',
            'Keep in mind, their review should take no longer than 5 minutes'
        ];

        return (
            <div>
                <Link to="/main/dashboard" className="Link btnStyle roomy">
                    <FontAwesomeIcon icon="long-arrow-alt-left" size="lg" /> DASHBOARD
                </Link>
                <PageTitle>Create a New Form</PageTitle>
                <Instructions list={instructionList} />

                <form className={styles.createForm} onSubmit={this.handleFormSubmit}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="name">Form Name: </label>
                        <input id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <Error message={this.state.nameErr} errStyle="center" />

                    <div className={styles.inputWrapper}>
                        <label htmlFor="projectUrl">Project URL: </label>
                        <input id="projectUrl" name="projectUrl" type="text" value={this.state.projectUrl} onChange={this.handleChange} />
                    </div>
                    <Error message={this.state.projectUrlErr} />


                    <fieldset className={styles.overview}>
                        <legend>Reviewer Instructions</legend>
                        <label className={styles.blockLabel} htmlFor="overview">
                            Provide guidance or helpful information for your reviewers:
                        </label>
                        <textarea className={styles.textArea} id="overview" name="overview" rows={4} value={this.state.overview} onChange={this.handleChange} />
                        <Error message={this.state.overviewErr} />
                    </fieldset>

                    {questionList}

                    <Button btnStyle={`block center ${addQuestionBtnStyle}`} type="button" onClick={this.addQuestion}>
                        + ADD QUESTION
                    </Button>

                    <div className={styles.warningWrapper}>
                        <p className={warnClass}>5 questions maximum</p>
                    </div>

                    <Button btnStyle="roomyTopBot block center" type="submit">SUBMIT FORM</Button>
                    <Error message={this.state.generalErr} />

                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authToken: state.authToken
})

export default requiresLogin()(connect(mapStateToProps)(CreateForm));