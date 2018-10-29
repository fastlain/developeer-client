import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css_modules/CreateForm.module.css';

import PageTitle from './PageTitle';
import Button from './Button';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        const questions = (
            <fieldset>
                <legend>Question 1:</legend>
                <label className={styles.blockLabel} htmlFor="question1">
                    Write your question here:
                                    </label>
                <textarea id="question1" className={styles.textArea} name="question1" rows={4}></textarea>
                <Button btnStyle="right" type="button">DELETE QUESTION</Button>
            </fieldset>
        );

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
                        <input id="formName" name="formName" type="text"></input>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label htmlFor="projectUrl">Project URL: </label>
                        <input id="projectUrl" name="projectUrl" type="text"></input>
                    </div>

                    {questions}

                    <Button btnStyle="roomyTopBot block center" type="button">+ ADD QUESTION</Button>
                    <Button btnStyle="roomyTopBot block center" type="button">SAVE FORM</Button>
                </form>
            </div>
        );
    }
}

export default CreateForm;