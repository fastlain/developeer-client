import React from 'react';
import { Route } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import Dashboard from './Dashboard';

const MainLayout = () => {
    return (
        <div>
            <header role="banner">
                <Header />
            </header>
            <main role="main">
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
            </main>
            <footer role="contentinfo">
                <Footer />
            </footer>
        </div>
    );
}

export default MainLayout;