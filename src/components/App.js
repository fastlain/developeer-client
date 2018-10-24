import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPageLayout from './LandingPageLayout';
import MainLayout from './MainLayout';

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={LandingPageLayout} />
            <Route path="/main" component={MainLayout} />
        </div>
    </Router>
);

export default App;
