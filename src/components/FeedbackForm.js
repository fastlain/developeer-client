import React, { Component } from 'react';
import styles from '../css_modules/FeedbackForm.module.css';
import { connect } from 'react-redux';
import { API_BASE_URL } from '../config';
import { Redirect } from 'react-router-dom';
import { setUser, showPopup } from '../actions';

import Button from './Button';
import ExternalLinkBtn from './ExternalLinkBtn';
import Error from './Error';

export class FeedbackForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: null,
            version: null,
            reviewerName: '',
            reviewerNameErr: null,
            responses: null,
            responseErr: null,
            generalErr: null,
            getFormErr: null,

            isSubmitting: false,
            submitSuccess: false
        };
        this.reviewerNameRef = React.createRef();
    }

    componentDidMount = () => {
        return this.getForm()
            .then(() => {
                // focus on first field of form
                if (!this.props.reviewerId) {
                    this.reviewerNameRef.current.focus();
                } else {
                    this.responseRefs[0].current.focus();
                }
            });
    }

    getForm = () => {
        // fetch the form specified by the route id or get a random form to review
        const fetchFormPromise = new Promise((resolve, reject) => {
            if (!this.props.isInternalReview) {
                // fetch form for an external review of a specified form
                fetch(`${API_BASE_URL}/forms/${this.props.match.params.id}`, {
                    method: 'GET'
                })
                    .then(res => resolve(res));
            } else {
                // fetch a random form with pending requests
                fetch(`${API_BASE_URL}/forms/toReview`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${this.props.authToken}`
                    }
                })
                    .then(res => resolve(res));
            }
        });

        return fetchFormPromise
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

                            // create refs for the response input for each question
                            this.responseRefs = mostRecentVersion.questions.map(() => {
                                return React.createRef();
                            });

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

    handleChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        this.setState({ [field]: value })
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

        // focus on erroneous input
        if (errors.response) {
            const errIndex = errors.response.findIndex(err => err !== '');
            this.responseRefs[errIndex].current.focus();
        }

        this.setState({ isSubmitting: false });
    }

    submitToServer = () => {
        let reviewer;
        if (!this.props.reviewerId) {
            // if external reviewer, get name from input or set as 'anonymous
            let reviewerName = this.state.reviewerName.length > 0 ? this.state.reviewerName : 'anonymous';
            reviewer = { reviewerName };
        } else {
            // for internal reviewer, get their user id
            reviewer = { reviewerId: this.props.reviewerId };
        }

        const review = {
            formId: this.state.form._id,
            formVersion: this.state.version._id,
            ...reviewer,
            responses: this.state.responses,
            isInternalReview: this.props.isInternalReview
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
                } else if (res.status === 204) {
                    // set success in parent <ExternalFeedback />
                    this.props.extReviewSuccess();
                } else {
                    res.json()
                        .then(user => {
                            // update user object in redux state
                            this.props.dispatch(setUser(user));
                            this.props.dispatch(showPopup('Review submitted'))
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
            return (<Error message={`${this.state.getFormErr}. Try again later.`} errStyle="center roomyTopBot" />);
        }

        let nameInput;
        if (!this.props.reviewerId) {
            nameInput = (
                <div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="reviewerName">{"Your Name (optional): "}</label>
                        <input id="reviewerName" name="reviewerName" type="text" value={this.state.reviewerName} onChange={this.handleChange} ref={this.reviewerNameRef} />
                    </div>
                    <Error message={this.state.reviewerNameErr} />
                </div>
            )
        }

        let questionList;
        if (this.state.version) {
            questionList = this.state.version.questions.map((question, index) => (
                <fieldset className={styles.questionWrapper} key={index}>
                    <legend>Question {index + 1}:</legend>
                    <label htmlFor={`question${index + 1}`}>
                        <p>{question}</p>
                    </label>
                    <textarea className={styles.textArea} id={index} name={`question${index + 1}`} rows={4} value={this.state.responses[index]} onChange={this.setResponseText} ref={this.responseRefs[index]}></textarea>
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
                    {nameInput}
                    {questionList}
                    <Button type="submit" btnStyle="roomyTopBot" onClick={this.handleFormSubmit} > SUBMIT FEEDBACK</Button>
                    <Error message={this.state.generalErr} errStyle="center roomyTopBot" />
                </form >
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    if (state.user) {
        return ({
            authToken: state.authToken,
            reviewerId: state.user.id
        });
    } else {
        return {};
    }
};

export default connect(mapStateToProps)(FeedbackForm);