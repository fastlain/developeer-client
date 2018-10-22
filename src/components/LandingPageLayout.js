import React from 'react';
import HeroBanner from './HeroBanner';
import Features from './Features';
import Footer from './Footer';
import UserForm from './UserForm';

const LandingPageLayout = () => {
    return (
        <div>
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