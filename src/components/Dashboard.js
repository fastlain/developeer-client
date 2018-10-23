import React, { Component } from 'react';
import Footer from './Footer';
import Header from './Header';
import Notifications from './Notifications';
import GiveFeedback from './GiveFeedback';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <header role="banner">
                    <Header />
                </header>
                <main role="main">
                    <section>
                        <Notifications />
                    </section>
                    <section>
                        <GiveFeedback />
                    </section>
                </main>
                <footer role="contentinfo">
                    <Footer />
                </footer>
            </div>
        );
    }
}

export default Dashboard;