import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { refreshAuthToken, clearAuth } from '../actions';
import { clearAuthToken } from '../local-storage';
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
import ExternalFeedback from './ExternalFeedback';
import Popup from './Popup';

class MainLayout extends Component {

    componentDidUpdate = (prevProps) => {
        // start/stop periodic authentication refresh if user logs in or logs out
        if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
            this.startPeriodicRefresh();
        } else if (prevProps.isLoggedIn && !this.props.isLoggedIn) {
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount = () => {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh = () => {
        // refresh authentication token every hour (3600000ms)
        this.refreshInterval = setInterval(() => this.props.dispatch(refreshAuthToken()), 3600000);
    }

    stopPeriodicRefresh = () => {
        if (!this.refreshInterval) {
            return;
        }
        clearInterval(this.refreshInterval);
    }

    handleLogout = () => {
        // clear authentication token from redux store
        this.props.dispatch(clearAuth());
        // clear authentication token from local storage
        clearAuthToken();
    }

    render() {
        return (
            <div className={styles.layoutWrapper}>
                <Popup message="Hello World" />
                <Switch>
                    <Route path="/main" render={() => <Header isLoggedIn={this.props.isLoggedIn} username={this.props.username} logOut={this.handleLogout} />} />
                    <Route path="/" component={HeroBanner} />
                </Switch>
                <main role="main" className={styles.main} >
                    <Route exact path="/" render={() => <LandingPageContent isLoggedIn={this.props.isLoggedIn} />} />
                    <Route path="/userform/:type" render={props => <UserForm {...props} />} />
                    <Route exact path="/main/dashboard" component={Dashboard} />
                    <Route exact path="/main/givefeedback" component={GiveFeedback} />
                    <Route path="/main/reviewfeedback/:id" component={ReviewFeedback} />
                    <Route exact path="/main/createform" component={CreateForm} />
                    <Route path="/main/feedback/:id" component={ExternalFeedback} />
                </main>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    if (state.user) {
        return ({
            isLoggedIn: true,
            username: state.user.username
        });
    } else {
        return ({
            isLoggedIn: false
        });
    }
};

export default connect(mapStateToProps)(MainLayout);