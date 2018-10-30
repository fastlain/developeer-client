import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import Dashboard from './Dashboard';
import GiveFeedback from './GiveFeedback';
import ReviewFeedback from './ReviewFeedback';
import CreateForm from './CreateForm';
import styles from '../css_modules/MainLayout.module.css';

class MainLayout extends Component {

    handleLogout = () => {
        // TODO: dispatch a logout action
        this.props.history.push('/');
    }

    render() {
        return (
            <div className={styles.layoutWrapper}>
                <Header username={this.props.username} logOut={this.handleLogout} />
                <main role="main" className={styles.main} >
                    <Route exact path="/main/dashboard" component={Dashboard} />
                    <Route exact path="/main/givefeedback" component={GiveFeedback} />
                    <Route path="/main/reviewfeedback/:id" component={ReviewFeedback} />
                    <Route path="/main/createform" component={CreateForm} />
                </main>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    username: state.username
});

export default connect(mapStateToProps)(MainLayout);