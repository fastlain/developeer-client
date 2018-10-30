import React from 'react';
import { Route } from 'react-router-dom';

import HeroBanner from './HeroBanner';
import LandingPageContent from './LandingPageContent';
import Footer from './Footer';
import UserForm from './UserForm';

const LandingPageLayout = () => {
    return (
        <div>
            <HeroBanner />
            <main role="main">
                <Route exact path="/" component={LandingPageContent} />
                <Route path="/userform/:type" render={props => <UserForm {...props} />} />
            </main>
            <Footer />
        </div>
    );
}

export default LandingPageLayout;