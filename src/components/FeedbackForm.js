import React, { Component } from 'react';
import styles from '../css_modules/FeedbackForm.module.css';
import { connect } from 'react-redux';
import { API_BASE_URL } from '../config';
import { Redirect } from 'react-router-dom';
import { setUser } from '../actions';

import Button from './Button';
import ExternalLinkBtn from './ExternalLinkBtn';
import Error from './Error';

class FeedbackForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: null,
            version: null,
            responses: null,
            responseErr: null,
            generalErr: null,
            getFormErr: null,

            isSubmitting: false,
            submitSuccess: false
        };
    }

    componentDidMount = () => {
        this.getForm();
    }

    // fetch a random form with pending requests
    getForm = () => {
        fetch(`${API_BASE_URL}/forms/toReview`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.props.authToken}`
            }
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
                                this.handleErrors({ getForm: err.message });
                            });
                    } else {
                        // display Express-generated error
                        this.handleErrors({ getForm: res.statusText });
                    }
                } else {
                    return res.json()
                        .then(({ form }) => {
                            // populate review author
                            if (form.author) {
                                return fetch(`${API_BASE_URL}/users/${form.author}`)
                                    .then(res => res.json())
                                    .then(author => {
                                        form.authorName = author.username;
                                        return form;
                                    })
                                    .catch(err => console.error(err));
                            } else {
                                return form;
                            }
                        })
                        .then(form => {
                            this.setState({ form });

                            const versions = this.state.form.versions;
                            // sort form versions by date
                            const versionsWithDateObj = versions.map(version => {
                                // convert date strings to Date objects
                                version.dateObj = new Date(version.date);
                                return version;
                            });
                            // get quetsions for most recent form version
                            const mostRecentVersion = versionsWithDateObj.sort((a, b) => {
                                return b.dateObj - a.dateObj;
                            })[0];
                            this.setState({
                                version: mostRecentVersion,
                                responses: new Array(mostRecentVersion.questions.length).fill(''),
                                responseErr: new Array(mostRecentVersion.questions.length).fill('')
                            });
                        })
                        .catch(err => console.error(err));
                }
            })
            .catch(err => console.error(err));
    }

    setResponseText = e => {
        const updatedResponses = [...this.state.responses];
        updatedResponses[e.target.id] = e.target.value;
        this.setState({ responses: updatedResponses });
    }

    handleFormSubmit = e => {
        e.preventDefault();
        // if already handling submit, do not process new submits
        if (this.state.isSubmitting) { return }

        this.setState({ isSubmitting: true });

        // clear existing errors
        this.setState({
            responseErr: new Array(this.state.responseErr.length).fill(''),
            generalErr: ''
        });

        // validate responses (length > 1)
        let foundResponseError = false;
        const responseErr = this.state.responses.map(response => {
            if (response.length < 1) {
                foundResponseError = true;
                return 'Blank responses not allowed';
            }
            return '';
        });

        // update errors or submit form to server
        if (foundResponseError) {
            this.handleErrors({ response: responseErr });
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

    submitToServer = () => {
        const review = {
            formId: this.state.form._id,
            formVersion: this.state.version._id,
            reviewerId: this.props.reviewerId,
            responses: this.state.responses
        };

        fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
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
                                this.handleErrors({ general: err.message });
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
                        });
                }
            })
            .catch(() => {
                this.handleErrors({ general: 'Server Error. Sorry, try again later.' });
            });
    }

    render() {

        if (this.state.submitSuccess) {
            return <Redirect to="/main/dashboard" />
        }

        if (this.state.getFormErr) {
            return (<Error message={`${this.state.getFormErr}. Try again later.`} errStyle="center" />);
        }

        let questionList;
        if (this.state.version) {
            questionList = this.state.version.questions.map((question, index) => (
                <fieldset className={styles.questionWrapper} key={index}>
                    <legend>Question {index + 1}:</legend>
                    <label htmlFor={`question${index + 1}`}>
                        <p>{question}</p>
                    </label>
                    <textarea className={styles.textArea} id={index} name={`question${index + 1}`} rows={4} value={this.state.responses[index]} onChange={this.setResponseText}></textarea>
                    <Error message={this.state.responseErr[index]} />
                </fieldset >
            ));
        }

        if (this.state.form) {
            return (
                <form className={styles.form} >
                    <h3>Project: <span className={styles.innerHeading}>{this.state.form.name}</span></h3>
                    <h3>Author: <span className={styles.innerHeading}>{this.state.form.authorName}</span></h3>
                    <div className={styles.overview}>
                        <h3>Reivewer Instructions:</h3>
                        <p className={styles.overviewContent}>{this.state.form.overview}</p>
                    </div>
                    <ExternalLinkBtn href={this.state.form.projectUrl}>
                        VISIT PAGE
                    </ExternalLinkBtn>
                    {questionList}
                    <Button type="submit" btnStyle="roomyTopBot" onClick={this.handleFormSubmit} > SUBMIT FEEDBACK</Button>
                    <Error message={this.state.generalErr} />
                </form >
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    authToken: state.authToken,
    reviewerId: state.user.id
});

export default connect(mapStateToProps)(FeedbackForm);