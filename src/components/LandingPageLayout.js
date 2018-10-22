import React from 'react';
import HeroBanner from './HeroBanner';
import Features from './Features';
import Footer from './Footer';

const LandingPageLayout = () => {
    return (
        <div>
            <header role="banner">
                <HeroBanner />
            </header>
            <main role="main">
                <Features />
            </main>
            <footer role="contentinfo">
                <Footer />
            </footer>
        </div>
    );
}

export default LandingPageLayout;