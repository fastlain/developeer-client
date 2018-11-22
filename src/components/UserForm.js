import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../css_modules/UserForm.module.css';
import { Redirect } from 'react-router-dom';
import { storeAuthInfo } from '../actions';

import Button from './Button';
import Error from './Error';
import StyledLink from './StyledLink';

const { API_BASE_URL } = require('../config');

export class UserForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            usernameErr: '',
            password: '',
            passwordErr: '',
            rePassword: '',
            rePasswordErr: '',
            generalErr: '',

            isSubmitting: false
        }
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.rePasswordRef = React.createRef();
    }

    componentDidMount() {
        if (this.usernameRef.current) {
            this.usernameRef.current.focus();
        }
    }

    componentDidUpdate(prevProps) {
        // focus on and select username input after toggling Log In and Create Account forms
        if (this.props.match.params.type !== prevProps.match.params.type) {
            this.usernameRef.current.focus();
            this.usernameRef.current.select();
        }
    }

    // set form input changes to state
    handleChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        this.setState({ [field]: value });
    }

    handleFormSubmit = e => {
        e.preventDefault();
        // if already handling submit, do not process new submits
        if (this.state.isSubmitting) { return }

        this.setState({ isSubmitting: true });

        // clear existing errors
        this.setState({
            usernameErr: '',
            passwordErr: '',
            rePasswordErr: '',
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

        // focus on and highlight erroneous input
        if (errors.username) {
            this.usernameRef.current.focus();
            this.usernameRef.current.select();
        } else if (errors.password) {
            this.passwordRef.current.focus();
            this.passwordRef.current.select();
        } else if (errors.rePassword) {
            this.rePasswordRef.current.focus();
            this.rePasswordRef.current.select();
        } else if (errors.general) {
            this.usernameRef.current.focus();
            this.usernameRef.current.select();
        }

        this.setState({ isSubmitting: false });
    }

    validateClient = () => {
        const errors = {};

        // validate username
        const username = this.state.username;
        if (username.length < 1) {
            errors.username = 'Must be at least 1 character';
        } else if (username.length > 20) {
            errors.username = 'Must be less than 20 characters';
        } else if (username.trim() !== username) {
            errors.username = 'Cannot start or end with whitespace';
        }

        // validate password
        const password = this.state.password;
        if (password.length < 10) {
            errors.password = 'Must be at least 10 characters';
        } else if (password.length > 72) {
            errors.password = 'Must be less than 72 characters';
        } else if (password.trim() !== password) {
            errors.password = 'Cannot start or end with whitespace';
        }

        // if creating new account, check re-entered password matches
        const formType = this.props.match.params.type;
        if (formType === 'create') {

            const rePassword = this.state.rePassword;
            if (password !== rePassword) {
                errors.rePassword = 'Passwords do not match';
            }
        }

        return errors;
    }

    loginDemo = () => {
        this.loginLocal({
            username: 'DemoAccount',
            password: 'DemoAccount'
        });
        if (this.state.isSubmitting) { return }
        this.setState({ isSubmitting: true });
    }

    submitToServer = () => {
        const formType = this.props.match.params.type;
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        if (formType === 'create') {
            // if creating new account, send POST /users
            fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
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
                    }

                    this.loginLocal(user);

                })
                .catch(() => {
                    this.handleErrors({ general: 'Server Error. Sorry, try again later.' });
                })

        } else {
            this.loginLocal(user)
        }
    }

    loginLocal = user => {
        return fetch(`${API_BASE_URL}/auth/loginlocal`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (!res.ok) {
                    // check if error is custom JSON error
                    if (res.status === 401) {
                        this.handleErrors({ general: 'Incorrect username or password' });
                    } else {
                        // display Express-generated error
                        this.handleErrors({ general: 'Server Error. Sorry, try again later.' });
                    }
                } else {
                    res.json()
                        .then(res => {
                            this.props.dispatch(storeAuthInfo(res.authToken));
                        });
                }
            })
            .catch(() => {
                this.handleErrors({ general: 'Server Error. Sorry, try again later.' });
            })
    }

    render() {
        // if logged in, redirect to dashboard
        if (this.props.isLoggedIn) {
            return <Redirect to="/main/dashboard" />
        }

        // get form type from route params
        const formType = this.props.match.params.type;
        const isCreate = (formType === 'create');

        // create variables for account creation or log in form
        const legendText = isCreate ? 'Create Account' : 'Log In';
        const submitButtonText = legendText.toUpperCase();
        const toggleButtonText = isCreate ? 'LOG IN' : 'CREATE ACCOUNT';
        const toggleRouteParam = isCreate ? 'login' : 'create';
        const toggleDescription = isCreate ? 'Already have an account?' : 'New to Developeer?';
        const hideReEnterPass = isCreate ? null : styles.hide;

        // style button based on isSubmitting state
        const isDisabled = this.state.isSubmitting ? 'disabled' : '';

        // demo account information
        const demoInformation = isCreate ? null :
            (
                <div className={styles.demoWrapper}>
                    <Button type="button" btnStyle={`center roomyTopBot ${isDisabled} text`} onClick={this.loginDemo} disabled={this.state.isSubmitting}>
                        DEMO ACCOUNT
                    </Button>
                </div>
            );

        return (
            <form className={styles.userForm} onSubmit={this.handleFormSubmit}>
                <fieldset className={styles.fieldset}>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="username">Username: </label>
                        <input id="username" className={styles.input} name="username" type="text" value={this.state.username} onChange={this.handleChange} ref={this.usernameRef} />
                        <Error message={this.state.usernameErr} />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="password">Password: </label>
                        <input id="password" className={styles.input} name="password" type="password" value={this.state.password} onChange={this.handleChange} ref={this.passwordRef} />
                        <Error message={this.state.passwordErr} />
                    </div>
                    <div className={`${styles.inputWrapper} ${hideReEnterPass}`} >
                        <label className={styles.label} htmlFor="rePassword">Confirm Password: </label>
                        <input id="rePassword" className={styles.input} name="rePassword" type="password" value={this.state.rePassword} onChange={this.handleChange} ref={this.rePasswordRef} />
                        <Error message={this.state.rePasswordErr} />
                    </div>
                    <Button type="submit" btnStyle={`center roomyTopBot ${isDisabled}`} disabled={this.state.isSubmitting}>
                        {submitButtonText}
                    </Button>
                    <Error message={this.state.generalErr} errStyle="center" />
                    {demoInformation}
                </fieldset>

                <div className={styles.toggleWrapper}>
                    <p>
                        {toggleDescription}
                    </p>
                    <StyledLink to={`/userform/${toggleRouteParam}`} className="outline">
                        {toggleButtonText}
                    </StyledLink>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user !== null
})

export default connect(mapStateToProps)(UserForm);
