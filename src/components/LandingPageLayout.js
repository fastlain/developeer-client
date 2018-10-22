import React from 'react';
import HeroBanner from './HeroBanner';
import Features from './Features';

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

            </footer>
        </div>
    );
}

export default LandingPageLayout;