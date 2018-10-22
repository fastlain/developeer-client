import React, { Component } from 'react';
import LandingPageLayout from './LandingPageLayout';
import Dashboard from './Dashboard';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={LandingPageLayout} />
                    <Route path="/dashboard" component={Dashboard} />
                </div>
            </Router>
        );
    }
}

export default App;
