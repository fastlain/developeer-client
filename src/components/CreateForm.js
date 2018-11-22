import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import requiresLogin from './HOC/requiresLogin';
import styles from '../css_modules/CreateForm.module.css';
import { API_BASE_URL } from '../config';
import { setUser, showPopup } from '../actions';

import DashboardBtn from './DashboardBtn';
import PageTitle from './PageTitle';
import Button from './Button';
import Question from './Question';
import Instructions from './Instructions';
import Error from './Error';

export class CreateForm extends Component {
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
            getFormErr: '',

            isSubmitting: false,
            submitSuccess: false
        };
        this.nameRef = React.createRef();
        this.projectUrlRef = React.createRef();
        this.overviewRef = React.createRef();
        this.questionRefs = this.state.questions.map(question => {
            return React.createRef();
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        // get form if in editting mode
        if (this.props.match.path.includes('editForm')) {
            this.getForm();
        }

        // focus on name input when component mounts
        if (this.nameRef.current) {
            this.nameRef.current.focus({ preventScroll: true });
        }
    }

    getForm = () => {
        const formId = this.props.match.params.id;
        return fetch(`${API_BASE_URL}/forms/${formId}`, {
            method: 'GET'
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
                                this.setState({ getForm: err.message });
                            });
                    } else {
                        // display Express-generated error
                        this.handleErrors({ getForm: res.statusText });
                    }
                } else {
                    return res.json()
                        .then(({ form }) => {

                            const versions = form.versions;
                            // sort form versions by date
                            const versionsWithDateObj = versions.map(version => {
                                // convert date strings to Date objects
                                version.dateObj = new Date(version.date);
                                return version;
                            });
                            // get most recent form version
                            const mostRecentVersion = versionsWithDateObj.sort((a, b) => {
                                return b.dateObj - a.dateObj;
                            })[0];
                            const questions = mostRecentVersion.questions;

                            this.setState({
                                name: form.name,
                                projectUrl: form.projectUrl,
                                overview: form.overview,
                                questions
                            });

                            // // create refs for the response input for each question
                            // this.responseRefs = mostRecentVersion.questions.map(() => {
                            //     return React.createRef();
                            // });
                        })
                        .catch(err => console.error(err));
                }
            })
            .catch(err => console.error(err));
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
        this.questionRefs.splice(order, 1);
        newQuestions.splice(order, 1);
        this.setState({ questions: newQuestions });
    }

    addQuestion = () => {
        if (this.state.questions.length < 5) {
            const newQuestions = [...this.state.questions];
            newQuestions.push('');
            this.questionRefs.push(React.createRef());
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
            this.setState({ [`${err}Err`]: errors[err] });
        }

        // focus on erroneous input
        if (errors.name) {
            this.nameRef.current.focus();
        } else if (errors.projectUrl) {
            this.projectUrlRef.current.focus();
            this.projectUrlRef.current.select();
        } else if (errors.overview) {
            this.overviewRef.current.focus();
        } else if (errors.questions) {
            const errIndex = errors.questions.findIndex(err => err !== '');
            this.questionRefs[errIndex].current.focus();
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

        // validate that there is at least one question
        if (this.state.questions.length < 1) {
            errors.general = 'A form must have at least one question';
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

        if (this.props.username === 'DemoAccount') {
            this.handleErrors({ general: 'Sorry, Demo Account cannot create or edit forms' });
            return;
        }

        const form = {
            name: this.state.name,
            projectUrl: this.state.projectUrl,
            overview: this.state.overview,
            questions: this.state.questions
        };

        const isNewForm = !this.props.match.path.includes('editForm');
        const method = isNewForm ? 'POST' : 'PATCH';
        const path = isNewForm ? `${API_BASE_URL}/forms` : `${API_BASE_URL}/forms/${this.props.match.params.id}`

        return fetch(path, {
            method,
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
                                if (err.location) {
                                    this.handleErrors({ [err.location]: err.message });
                                } else {
                                    this.handleErrors({ general: err.message });
                                }
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
                            const popupMessage = isNewForm ? 'Form created successfully' :
                                'Form updated successfully';
                            this.props.dispatch(showPopup(popupMessage));
                        });
                }
            })
            .catch(() => {
                this.handleErrors({ general: 'Server Error. Sorry, try again later.' });
            })
    }

    render() {
        if (this.state.getFormErr.length > 0) {
            return <Error message={this.state.getFormError} />
        }

        // redirect on successful submission
        if (this.state.submitSuccess) {
            return <Redirect to="/main/dashboard" />
        }

        // set page title based on whether createing or editing form
        const pageTitle = this.props.match.path.includes('editForm') ?
            'Edit Form' : 'Create a New Form';

        // set submit button text based on whether createing or editing form
        const submitText = this.props.match.path.includes('editForm') ?
            'SAVE CHANGES' : 'CREATE FORM';


        const questionList = this.state.questions.map((question, index) => (
            <Question order={index} key={index} value={question} setQuestionText={this.setQuestionText} deleteQuestion={this.deleteQuestion} error={this.state.questionsErr[index]} qRef={this.questionRefs[index]} />
        ));

        const maxedQuestions = this.state.questions.length >= 5;
        const addQuestionBtnStyle = maxedQuestions ? 'disabled' : '';
        const warning = maxedQuestions ? <Error message="5 questions maximum" errStyle="center" /> : null;

        const instructionList = [
            'Create a meaningful name for your form (e.g. "Blog App UI feedback")',
            'Provide a link to a LIVE version of your project (NOT a code repository)',
            'Write instructions and up to 5 questions requesting feedback on your project',
            'Keep in mind, their review should take no longer than 5 minutes'
        ];

        return (
            <div>
                <DashboardBtn />
                <PageTitle>{pageTitle}</PageTitle>
                <Instructions list={instructionList} />

                <form className={styles.createForm} onSubmit={this.handleFormSubmit}>
                    <div className={styles.inputWrapper}>
                        <label className={styles.formLabel} htmlFor="name">Form Name: </label>
                        <input id="name" className={styles.input} name="name" type="text" value={this.state.name} onChange={this.handleChange} ref={this.nameRef} />
                    </div>
                    <Error message={this.state.nameErr} errStyle="lt" />

                    <div className={styles.inputWrapper}>
                        <label className={styles.formLabel} htmlFor="projectUrl">Project URL: </label>
                        <input id="projectUrl" className={styles.input} name="projectUrl" type="text" value={this.state.projectUrl} onChange={this.handleChange} ref={this.projectUrlRef} />
                    </div>
                    <Error message={this.state.projectUrlErr} errStyle="lt" />


                    <fieldset className={styles.overview}>
                        <legend className={styles.legend}>Reviewer Instructions</legend>
                        <label className={styles.blockLabel} htmlFor="overview">
                            Provide guidance or helpful information for your reviewers:
                        </label>
                        <textarea className={styles.textArea} id="overview" name="overview" rows={4} value={this.state.overview} onChange={this.handleChange} ref={this.overviewRef} />
                        <Error message={this.state.overviewErr} errStyle="textArea lt" />
                    </fieldset>

                    {questionList}

                    <Button btnStyle={`block center ${addQuestionBtnStyle}`} type="button" onClick={this.addQuestion}>
                        + ADD QUESTION
                    </Button>

                    {warning}

                    <Button btnStyle="veryRoomyTopBot block center accent" type="submit">{submitText}</Button>
                    <Error message={this.state.generalErr} errStyle="center" />

                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authToken: state.authToken,
    username: state.user.username
})

export default requiresLogin()(connect(mapStateToProps)(CreateForm));