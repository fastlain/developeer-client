import React, { Component } from 'react';
import styles from '../css_modules/UserForm.module.css';

import Button from './Button';

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newAccountForm: false
        };
    }

    toggleFormType = () => {
        this.setState(prevState => ({
            newAccountForm: !prevState.newAccountForm
        }));
    }

    render() {

        const submitButtonText = this.state.newAccountForm ? "CREATE ACCOUNT" : "LOG IN";
        const toggleButtonText = this.state.newAccountForm ? "LOG IN" : "CREATE ACCOUNT";
        const toggleDescription = this.state.newAccountForm ? "Already have an account?" : "New to Developeer?";
        const hideReEnterPass = this.state.newAccountForm ? styles.block : styles.hide;

        return (
            <form className={styles.userForm}>
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
                    <Button type="button" onClick={this.toggleFormType}>
                        {toggleButtonText}
                    </Button>
                </div>
            </form>
        );
    }
}

export default UserForm;