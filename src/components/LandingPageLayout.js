import React from 'react';
import { Link } from 'react-router-dom';

import HeroBanner from './HeroBanner';
import Features from './Features';
import Footer from './Footer';
import UserForm from './UserForm';

const LandingPageLayout = () => {
    return (

        <div>
            <Link to="/main">Skip to MainLayout</Link>
            <header role="banner">
                <HeroBanner />
            </header>
            <main role="main">
                <UserForm />
                <Features />
            </main>
            <footer role="contentinfo">
                <Footer />
            </footer>
        </div>

    );
}

export default LandingPageLayout;