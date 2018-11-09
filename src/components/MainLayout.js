import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styles from '../css_modules/MainLayout.module.css';

import HeroBanner from './HeroBanner';
import Header from './Header';
import LandingPageContent from './LandingPageContent';
import UserForm from './UserForm';
import Dashboard from './Dashboard';
import GiveFeedback from './GiveFeedback';
import ReviewFeedback from './ReviewFeedback';
import CreateForm from './CreateForm';
import Footer from './Footer';


class MainLayout extends Component {

    handleLogout = () => {
        // TODO: dispatch a logout action
        this.props.history.push('/');
    }

    render() {
        return (
            <div className={styles.layoutWrapper}>
                <Switch>
                    <Route path="/main" render={() => <Header username={this.props.username} logOut={this.handleLogout} />} />
                    <Route path="/" component={HeroBanner} />
                </Switch>
                <main role="main" className={styles.main} >
                    <Route exact path="/" component={LandingPageContent} />
                    <Route path="/userform/:type" render={props => <UserForm {...props} />} />
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
    username: state.user ? state.user.username : null
});

export default connect(mapStateToProps)(MainLayout);