import React, { Component } from 'react';

import Notifications from './Notifications';
import GiveFeedback from './GiveFeedback';
import MyFeedback from './MyFeedback';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <section>
                    <Notifications />
                </section>
                <section>
                    <GiveFeedback />
                </section>
                <section>
                    <MyFeedback />
                </section>
            </div>
        );
    }
}

export default Dashboard;