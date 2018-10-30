import React, { Component } from 'react';
import styles from '../css_modules/UserForm.module.css';
import { Link } from 'react-router-dom';

import Button from './Button';

class UserForm extends Component {

    handleFormSubmit = (e) => {
        e.preventDefault();
        // TODO: form validation
        // navigate to dashboard
        this.props.history.push('/main/dashboard');
    }

    render() {

        // get form type from route params
        const formType = this.props.match.params.type;
        const isCreate = (formType === 'create');

        // create variables for account creation or log in form
        const submitButtonText = isCreate ? "CREATE ACCOUNT" : "LOG IN";
        const toggleButtonText = isCreate ? "LOG IN" : "CREATE ACCOUNT";
        const toggleRouteParam = isCreate ? "login" : "create";
        const toggleDescription = isCreate ? "Already have an account?" : "New to Developeer?";
        const hideReEnterPass = isCreate ? styles.block : styles.hide;

        return (
            <form className={styles.userForm} onSubmit={this.handleFormSubmit}>
                <fieldset>
                    <legend>Log In</legend>
                    <div className={styles.inputWrapper}>
                        <label className={styles.block} htmlFor="username">username: </label>
                        <input id="username" name="username" type="text" />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.block} htmlFor="password">password: </label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <div className={`${styles.inputWrapper} ${hideReEnterPass}`} >
                        <label className={styles.block} htmlFor="rePassword">re-enter password: </label>
                        <input id="rePassword" name="rePassword" type="password" />
                    </div>
                    <Button type="submit" btnStyle="center roomyTopBot">
                        {submitButtonText}
                    </Button>
                </fieldset>

                <div className={styles.toggleWrapper}>
                    <p>
                        {toggleDescription}
                    </p>
                    <Link to={`/userform/${toggleRouteParam}`} className="Link btnStyle roomy">
                        {toggleButtonText}
                    </Link>
                </div>
            </form>
        );
    }
}

export default UserForm;