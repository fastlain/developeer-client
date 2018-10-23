import React, { Component } from 'react';

import PageTitle from './PageTitle';
import Notifications from './Notifications';
import Credits from './Credits';
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
                <PageTitle>Dashboard</PageTitle>
                <Notifications />
                <Credits />
                <MyFeedback />
            </div>
        );
    }
}

export default Dashboard;