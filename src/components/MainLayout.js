import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import Dashboard from './Dashboard';
import GiveFeedback from './GiveFeedback';
import ReviewFeedback from './ReviewFeedback';
import CreateForm from './CreateForm';

class MainLayout extends Component {

    handleLogout = () => {
        // TODO: dispatch a logout action
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <header role="banner">
                    <Header username={this.props.username} logOut={this.handleLogout} />
                </header>
                <main role="main">
                    <Route exact path="/main/dashboard" component={Dashboard} />
                    <Route exact path="/main/givefeedback" component={GiveFeedback} />
                    <Route path="/main/reviewfeedback/:id" component={ReviewFeedback} />
                    <Route path="/main/createform" component={CreateForm} />
                </main>
                <footer role="contentinfo">
                    <Footer />
                </footer>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    username: state.username
});

export default connect(mapStateToProps)(MainLayout);